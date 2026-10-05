import type { Link, NavItem } from "@/types/content";

export const mainNavigation: NavItem[] = [
  {
    id: "products",
    label: "Products",
    columns: [
      {
        heading: "Products",
        links: [
          { label: "Greenhouse Recruiting", href: "/platform" },
          { label: "Voice AI", href: "/voice-ai-interviewing" },
        ],
      },
      {
        heading: "Capabilities",
        compact: true,
        links: [
          { label: "AI recruiting", href: "/ai-recruiting" },
          { label: "Talent sourcing", href: "/talent-sourcing" },
          { label: "Candidate experience", href: "/candidate-experience" },
          { label: "Scalable workflows", href: "/scalable-workflows" },
          { label: "Interviewing & decision-making", href: "/interviewing-decision-making" },
          { label: "Talent matching", href: "/real-talent-candidate-matching" },
          { label: "Onboarding", href: "/onboarding" },
          { label: "Reporting & insights", href: "/reporting-insights" },
        ],
      },
      {
        heading: "More",
        compact: true,
        links: [
          { label: "Pricing", href: "/pricing" },
          { label: "How we compare", href: "/compare" },
          { label: "Integrations", href: "https://integrations.greenhouse.com" },
        ],
        secondary: {
          heading: "What’s new",
          links: [
            { label: "Latest product features", href: "/greenhouse-latest-features" },
            { label: "All product features", href: "/product-features" },
          ],
        },
      },
    ],
  },
  {
    id: "solutions",
    label: "Solutions",
    columns: [
      {
        heading: "Greenhouse for companies",
        links: [
          { label: "Modern enterprise", href: "/enterprise" },
          { label: "Scaling company", href: "/scaling-company" },
          { label: "Early-stage business", href: "/early-stage" },
        ],
        secondary: {
          heading: "Greenhouse for candidates",
          links: [{ label: "MyGreenhouse", href: "https://my.greenhouse.com/" }],
        },
      },
    ],
    featured: {
      eyebrow: "Awards & accolades",
      title: "Greenhouse named the Best Software for Enterprise in 2026",
      description:
        "Learn why Greenhouse is an award-winning enterprise software for companies like DoorDash, Betterment and MLB.",
      image: "/images/nav/g2-award.jpg",
      alt: "Greenhouse G2 Top 50 HR Products collage over image of coworkers sitting at table",
      cta: { label: "Learn more", href: "/blog/g2-2026-awards-best-software-spring" },
    },
  },
  { label: "Latest", href: "/greenhouse-latest-features" },
  {
    id: "resources",
    label: "Resources",
    columns: [
      {
        heading: "Types",
        links: [
          { label: "Blog", href: "/blog" },
          { label: "Guidance", href: "/guidance" },
          { label: "Events & Webinars", href: "/events" },
          { label: "Customer stories", href: "/customer-stories" },
          { label: "Hiring glossary", href: "/resources/glossary" },
          { label: "Talent Makers book", href: "/talent-makers-book" },
        ],
      },
      {
        heading: "Support",
        compact: true,
        links: [
          { label: "Learn Greenhouse", href: "https://learn.greenhouse.io/" },
          { label: "Get support", href: "https://support.greenhouse.io/hc/en-us" },
          { label: "Developer resources", href: "https://developers.greenhouse.io/" },
        ],
      },
    ],
    topics: {
      heading: "Topics",
      items: [
        {
          label: "DE&I",
          href: "/content-topic/diversity-inclusion",
          image: "/images/nav/topic-dei.webp",
          alt: "Greenhouse DEI icon and office worker facing camera in collared shirt",
        },
        {
          label: "Structured hiring",
          href: "/content-topic/structured-hiring",
          image: "/images/nav/topic-structured-hiring.webp",
          alt: "Greenhouse scorecard icon thumbs up and office worker waving to person virtually",
        },
        {
          label: "AI and automation",
          href: "/content-topic/ai-automation",
          image: "/images/nav/topic-ai.webp",
          alt: "Greenhouse AI icon and office worker sitting at a table",
        },
        {
          label: "Hiring Maturity",
          href: "/content-topic/hiring-maturity",
          image: "/images/nav/topic-hiring-maturity.webp",
          alt: "Hiring maturity curve and woman in white suit in brightly lit office",
        },
      ],
    },
  },
  {
    id: "community",
    label: "Community",
    columns: [
      {
        heading: "Community",
        links: [
          { label: "Events & Webinars", href: "/events" },
          { label: "Open", href: "/greenhouse-open-thank-you" },
          { label: "Talent Makers", href: "/talent-makers" },
          { label: "Newsletter", href: "/newsletter" },
          { label: "Partnerships", href: "/greenhouse-partner-resource-center" },
        ],
      },
    ],
    featured: {
      eyebrow: "Event",
      title: "Greenhouse at HR Tech 2026",
      description:
        "Visit booth #6027 to demo our newest tools designed to help hiring teams get stronger signal, plus get a first look at exciting changes coming to Greenhouse.",
      image: "/images/nav/hr-tech-2026.png",
      alt: "Woman wearing patterned blouse in office setting with HR Technology logo",
      cta: { label: "Learn more", href: "/event/hr-tech-2026" },
    },
  },
];

export const headerActions = {
  signIn: { label: "Sign in", href: "https://app.greenhouse.io/users/sign_in" },
  demo: { label: "Request a demo", href: "/demo" },
} satisfies Record<string, Link>;

export const footerNavigation: { title: string; links: Link[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "Greenhouse Recruiting", href: "/platform" },
      { label: "Voice AI", href: "/voice-ai-interviewing" },
      { label: "Pricing", href: "/pricing" },
      { label: "Security", href: "/security" },
      { label: "Ethical principles", href: "/ethical-principles" },
      { label: "AI principles", href: "/ai-principles" },
      { label: "Bias audit statement", href: "/bias-audit-statement" },
      { label: "APIs", href: "/api" },
    ],
  },
  {
    title: "Capabilities",
    links: [
      { label: "AI recruiting", href: "/ai-recruiting" },
      { label: "Talent sourcing", href: "/talent-sourcing" },
      { label: "Candidate experience", href: "/candidate-experience" },
      { label: "Scalable workflows", href: "/scalable-workflows" },
      { label: "Interviewing & decision-making", href: "/interviewing-decision-making" },
      { label: "Talent matching", href: "/real-talent-candidate-matching" },
      { label: "Onboarding", href: "/onboarding" },
      { label: "Reporting & insights", href: "/reporting-insights" },
      { label: "Integrations", href: "https://integrations.greenhouse.com/" },
    ],
  },
  {
    title: "Why Greenhouse",
    links: [
      { label: "How we compare", href: "/compare" },
      { label: "Return on your hiring investment", href: "/roi-with-greenhouse" },
      { label: "Your partner in success", href: "/customer-success" },
    ],
  },
  {
    title: "Greenhouse for companies",
    links: [
      { label: "Modern enterprise", href: "/enterprise" },
      { label: "Scaling company", href: "/scaling-company" },
      { label: "Early-stage business", href: "/early-stage" },
    ],
  },
  {
    title: "Greenhouse for candidates",
    links: [{ label: "Find your dream job", href: "https://my.greenhouse.com/" }],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Guidance", href: "/guidance" },
      { label: "Customer stories", href: "/customer-stories" },
      { label: "Hiring glossary", href: "/resources/glossary" },
      { label: "AI Instructions", href: "/llms.txt" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Company", href: "/company" },
      { label: "Press & awards", href: "/press" },
      { label: "Newsroom", href: "/newsroom" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Events & webinars", href: "/events" },
      { label: "Open", href: "/greenhouse-open-thank-you" },
      { label: "Talent Makers", href: "/talent-makers" },
      { label: "Newsletter", href: "/newsletter" },
      { label: "Partnerships", href: "/greenhouse-partner-resource-center" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Learn Greenhouse", href: "https://learn.greenhouse.io/" },
      { label: "Customer support", href: "https://support.greenhouse.io/hc/en-us" },
      { label: "Developer resources", href: "https://developers.greenhouse.io/" },
    ],
  },
];

export const locales: (Link & { current?: boolean })[] = [
  { label: "English (US)", href: "/", current: true },
  { label: "English (UK)", href: "/uk" },
  { label: "Deutsch", href: "/de" },
];

export const socialLinks: (Link & { icon: string })[] = [
  { label: "Facebook", href: "https://www.facebook.com/greenhouse.io/", icon: "/images/social/facebook.svg" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/greenhouse-inc-/", icon: "/images/social/linkedin.svg" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCwLlhrx5lFssgTwKCHEuC8g", icon: "/images/social/youtube.svg" },
  { label: "Instagram", href: "https://www.instagram.com/greenhousesoftware/", icon: "/images/social/instagram.svg" },
  { label: "TikTok", href: "https://www.tiktok.com/@greenhouse_software", icon: "/images/social/tiktok.svg" },
];

export const legalLinks: Link[] = [
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms of service", href: "/legal" },
];
