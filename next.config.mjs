// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // This wildcard allows all domains
      },
    ],
  },
};
  
export default nextConfig;
  