/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedForwardedHosts: ['localhost',"devtunnels.ms"],
            allowedOrigins: ['localhost:3000','devtunnels.ms','103.195.101.44:8090']
        }
    }
};

export default nextConfig;
