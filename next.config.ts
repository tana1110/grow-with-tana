import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // مسارات النسخة القديمة (دورة واحدة) → البنية الجديدة متعددة الدورات
      {
        source: "/course",
        destination: "/my-courses",
        permanent: false,
      },
      {
        source: "/course/:path*",
        destination: "/my-courses",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
