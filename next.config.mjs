/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedForwardedHosts: ['localhost',"devtunnels.ms"],
            allowedOrigins: ['localhost','devtunnels.ms','103.195.101.44']
        }
    }
};

export default nextConfig;
