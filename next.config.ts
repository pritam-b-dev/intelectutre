/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // ফ্রন্টএন্ডের যেকোনো /api/ রিকোয়েস্টকে নেক্সট-জেএস ব্যাকএন্ড পোর্টে ফরওয়ার্ড করবে
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
