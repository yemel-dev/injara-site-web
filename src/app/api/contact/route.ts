import nodemailer from "nodemailer";

import { company } from "@/content/site";

/**
 * Réception du formulaire de contact : envoie la demande par e-mail depuis la
 * boîte INJARA (SMTP Spacemail), côté serveur.
 * Variables d'environnement (Vercel → Settings → Environment Variables) :
 *   SMTP_USER  adresse de la boîte d'envoi (ex. team@injara.site)
 *   SMTP_PASS  mot de passe de cette boîte
 *   SMTP_HOST  facultatif, mail.spacemail.com par défaut
 *   SMTP_PORT  facultatif, 465 par défaut (SSL)
 *   CONTACT_TO facultatif, destinataire (company.email par défaut)
 */

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return Response.json({ success: false, message: "Requête invalide." }, { status: 400 });
  }
  const field = (name: string, max = 200) => String(data.get(name) ?? "").trim().slice(0, max);

  // Piège à robots : on fait comme si tout allait bien.
  if (field("_honey") || field("_gotcha")) return Response.json({ success: true });

  const demande = field("demande") || "Demande de contact";
  const name = field("name");
  const email = field("email");
  const companyName = field("company");
  const volume = field("volume");
  const message = field("message", 2000);

  if (name.length < 2 || !EMAIL_RE.test(email) || companyName.length < 2 || !volume) {
    return Response.json({ success: false, message: "Champs manquants ou invalides." }, { status: 400 });
  }

  const { SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    console.error("Formulaire de contact : SMTP_USER / SMTP_PASS non définis.");
    return Response.json({ success: false, message: "Messagerie non configurée." }, { status: 500 });
  }

  const port = Number(process.env.SMTP_PORT ?? 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "mail.spacemail.com",
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const rows: [string, string][] = [
    ["Demande", demande],
    ["Nom", name],
    ["E-mail", email],
    ["Entreprise", companyName],
    ["CV reçus par mois", volume],
    ["Message", message || "(aucun)"],
  ];
  const text = rows.map(([k, v]) => `${k} : ${v}`).join("\n");
  const html = `<table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${rows
    .map(
      ([k, v]) =>
        `<tr><th align="left" style="border:1px solid #ddd;background:#f5f7fa">${k}</th><td style="border:1px solid #ddd;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>`;

  try {
    await transporter.sendMail({
      from: `"Site INJARA" <${SMTP_USER}>`,
      to: process.env.CONTACT_TO ?? company.email,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `${demande} – ${companyName} (site INJARA)`,
      text,
      html,
    });
    return Response.json({ success: true });
  } catch (err) {
    console.error("Formulaire de contact : échec de l'envoi SMTP", err);
    return Response.json({ success: false, message: "Échec de l'envoi." }, { status: 502 });
  }
}
