/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },

  serverExternalPackages: ["@node-rs/argon2"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/*`,
      },

      // ✅ Add Dicebear (avatars)
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
  },

  rewrites: () => {
    return [
      {
        source: "/hashtag/:tag",
        destination: "/search?q=%23:tag",
      },
    ];
  },
};

export default nextConfig;
