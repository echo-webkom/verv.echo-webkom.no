/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  rewrites: async () => [
    {
      source: "/api/:path*",
      destination: `${process.env.BACKEND_URL}/:path*`,
    },
  ],
};

export default nextConfig;
