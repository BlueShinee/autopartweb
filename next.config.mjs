/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedForwardedHosts: ['localhost',"devtunnels.ms"],
            allowedOrigins: ['localhost:3000','devtunnels.ms']
        }
    }
};

export default nextConfig;
