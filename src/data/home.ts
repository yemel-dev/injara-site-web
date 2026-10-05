import type { CustomerLogo, GalleryItem } from "@/types/content";

export const hero = {
  title: "Better signal. Human judgment. One platform.",
  description:
    "AI has amplified the noise in hiring. Greenhouse cuts through it at every step with responsible innovation and governance, helping connect jobs to people – and people to jobs.",
  voiceAi: { label: "Voice AI", href: "/voice-ai-interviewing" },
  platform: { label: "Recruiting platform", href: "/platform" },
  illustration: "/images/hero/hero-splash.svg",
  mobileImage: "/images/hero/hero-mobile.png",
};

export const voiceAiHighlight = {
  title: "Every candidate gets a real shot. You get a real signal.",
  description:
    "Greenhouse Voice AI is a two-way first interview, on the candidate’s schedule. Structured, using your team’s questions and rubric. Easy for candidates, and built to save recruiters time, not add to their plate. 90% of candidates rate the experience as “excellent.”",
  primary: { label: "See it in action", href: "/voice-ai-interviewing" },
  secondary: { label: "Book a demo", href: "/demo" },
  image: "/images/hero/voice-ai-desktop.png",
  mobileImage: "/images/hero/voice-ai-mobile.png",
};

export const productGallery: GalleryItem[] = [
  {
    title: "Voice AI",
    description:
      "Greenhouse Voice AI is a two-way, voice-based AI interviewing platform that recruiters can use at the top of the funnel, replacing the resume lottery with a structured voice interview.",
    image: "/images/products/voice-ai.avif",
    alt: "Voice AI product candidate portrait and speaking bubble with waveform motif in green",
    cta: { label: "See Voice AI in action", href: "/voice-ai-interviewing" },
  },
  {
    title: "Real Talent",
    description:
      "Greenhouse Real Talent™ brings triple layers of trust to hiring with candidate fraud detection, identity verification and candidate matching software, so you can make more confident hiring decisions.",
    image: "/images/products/real-talent.avif",
    alt: "Greenhouse Real Talent features showing fraud detected on a candidate card",
    cta: { label: "See Real Talent", href: "/real-talent-candidate-matching" },
  },
  {
    title: "MyGreenhouse",
    description:
      "MyGreenhouse is a powerful new candidate portal that transforms hiring from robotic to remarkable. It keeps candidates informed with real-time updates, surfaces new opportunities and makes applying seamless – while giving recruiters the insights to quickly identify top talent.",
    image: "/images/products/my-greenhouse.avif",
    alt: "Woman in yellow blouse in brightly lit office with a UI bubble that says create a job alert",
    cta: { label: "Identify top talent", href: "https://my.greenhouse.com" },
  },
];

export const customers = {
  title: "Great companies hire with Greenhouse",
  cta: { label: "Read customer stories", href: "/customer-stories" },
  logos: [
    {
      name: "NFL",
      logo: "/images/logos/nfl.png",
      href: "/customer-stories/the-nfl-dominates-high-volume-hiring-cuts-time-to-fill-by-24-percent-with-greenhouse-ai-powered-features",
    },
    { name: "Coursera", logo: "/images/logos/coursera.avif", href: "/guidance/whatsyourwhy-podcast-parijat-tanna-talkad" },
    { name: "Anthropic", logo: "/images/logos/anthropic.png" },
    {
      name: "Datavant",
      logo: "/images/logos/datavant.png",
      href: "/customer-stories/datavant-significantly-reduces-costs-and-boosts-hiring-efficiency-with-greenhouse",
    },
    { name: "Revlon", logo: "/images/logos/revlon.png" },
    { name: "Seatgeek", logo: "/images/logos/seatgeek.avif", href: "/customer-stories/case-study-seatgeek" },
  ] satisfies CustomerLogo[],
};

export const featureGallery = {
  title: "The best teams start with hiring – and the best hiring starts with Greenhouse",
  items: [
    {
      title: "Everything you need to hire, in one platform",
      description:
        "Stop taking a risk with your recruiting budget and start saving money. Greenhouse offers an end-to-end solution with everything you need to make the best possible hires, consistently and quickly.",
      image: "/images/features/platform.webp",
      alt: "",
      cta: { label: "Explore platform", href: "/platform" },
    },
    {
      title: "Flex and scale with ease",
      description:
        "Greenhouse has everything you need for great hiring in one easy-to-use platform. Plus, you can connect with business tools you already use and customize a tech stack with our hundreds of pre-built integrations.",
      image: "/images/features/scale.webp",
      alt: "",
      cta: { label: "View scalable workflows", href: "/scalable-workflows" },
    },
    {
      title: "Future-proof your hiring",
      description:
        "Greenhouse has led the way in hiring innovation for over a decade – from pioneering structured hiring to our latest advances in AI and our candidate portal, we’re always pushing what’s possible.",
      image: "/images/features/future-proof.webp",
      alt: "",
      cta: { label: "Learn about AI recruiting", href: "/ai-recruiting" },
    },
  ] satisfies GalleryItem[],
};

export const testimonial = {
  quote:
    "Greenhouse has made a real difference to how we hire at Ocado Group. It’s helped us simplify our recruitment processes, cutting our time-to-hire by nearly 30%.",
  author: "Peter Tam",
  role: "Talent Acquisition Enablement Manager, Ocado Group",
  image: "/images/testimonial/interview-kit.avif",
  mobileImage: "/images/testimonial/interview-kit-mobile.avif",
  alt: "A Greenhouse interview scorecard displayed on a screen, with a small portrait of a man with glasses and a beard",
};

export const ctaBanner = {
  title: "Everything you need to get better at hiring",
  cta: { label: "Request a demo", href: "/demo" },
  image: "/images/cta/prefooter.avif",
};
