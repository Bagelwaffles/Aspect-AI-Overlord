import path from "path";

const nextConfig = {
    typescript: { ignoreBuildErrors: true },
    eslint: { ignoreDuringBuilds: true },
    webpack: (config) => {
          config.resolve.alias["@"] = path.resolve("./");
          return config;
    },
};

export default nextConfig;
