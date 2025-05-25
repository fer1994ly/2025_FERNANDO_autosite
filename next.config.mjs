import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  images: {
    domains: ["picsum.photos"],
    dangerouslyAllowSVG: true,
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  eslint: {
    dirs: ["app", "components", "layouts", "scripts"],
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
  productionBrowserSourceMaps: false,
  experimental: {
    serverSourceMaps: false,
  },
  webpack: (config, { dev, isServer }) => {
    config.cache = false; 
    if (!dev) {
      config.cache = {
        type: "memory",
        maxGenerations: 1,
      };
    }

    config.ignoreWarnings = [
      { module: /node_modules\/punycode/ }
    ];

    return config;
  },
};

export default withNextIntl(nextConfig);
