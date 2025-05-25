interface SiteMetadata {
  title: string;
  author: string;
  headerTitle: string;
  description: string;
  keywords: string;
  language: string;
  theme: "system" | "dark" | "light";
  siteUrl: string;
  siteRepo: string;
  siteLogo: string;

  socialBanner: string;
  email: string;
  github: string;
  x: string;
  facebook: string;
  youtube: string;
  linkedin: string;
  threads: string;
  instagram: string;
  medium: string;
  bluesky: string;
  locale: string;
  stickyNav: boolean;
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: string;
    };
  };
  newsletter: {
    provider: string;
  };
  search: {
    provider: string;
    kbarConfig: {
      searchDocumentsPath: string;
    };
  };
}

const siteMetadata: SiteMetadata = {
  title: "Autosite - AI Landing Page Generator",
  author: "Autosite",
  headerTitle: "Autosite",
  description:
    "Create stunning landing pages in seconds with AI. Just describe your idea and let Autosite generate a complete, professional landing page instantly.",
  keywords:
    "AI landing page generator, landing page builder, AI website builder, instant website creation, automated web design, AI-powered websites, no-code landing pages",
  language: "en",
  theme: "system", // system, dark or light

  siteUrl:
    process.env.NODE_ENV === "production"
      ? "https://autosite-saas-beta.vercel.app"
      : "http://localhost:3000",
  siteRepo: "https://github.com/samihalawa/2025_FERNANDO_autosite",
  siteLogo: `${process.env.BASE_PATH || ""}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ""}/static/images/twitter-card.png`,
  email: "contact@autosite.ai",
  github: "https://github.com",
  x: "https://twitter.com/x",
  facebook: "",
  youtube: "",
  linkedin: "",
  threads: "",
  instagram: "",
  medium: "",
  bluesky: "",
  locale: "en-US",
  stickyNav: true,
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID,
    },
  },
  newsletter: {
    provider: "buttondown",
  },

  search: {
    provider: "kbar",
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ""}/search.json`,
    },
  },
};

export default siteMetadata;
