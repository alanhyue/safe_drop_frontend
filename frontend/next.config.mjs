/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",  // Frontend calls /api/upload
                destination: "http://127.0.0.1:8000/:path*", // Inside container -> FastAPI
            },
        ];
    },
};

export default nextConfig;
