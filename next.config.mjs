/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedForwardedHosts: ['localhost',"gxnxl5cx-3000.asse.devtunnels.ms"],
            allowedOrigins: ['http://localhost:3000','https://gxnxl5cx-3000.asse.devtunnels.ms']
        }
    }
};

export default nextConfig;
