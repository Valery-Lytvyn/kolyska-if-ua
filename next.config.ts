import { createSecureHeaders } from "next-secure-headers";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "babytilly.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: createSecureHeaders({
          contentSecurityPolicy: {
            directives: {
              defaultSrc: ["'self'"],
              scriptSrc: [
                "'self'",
                "'unsafe-inline'", // Для вбудованих скриптів
                "https://www.google.com",
                "https://www.gstatic.com",
              ],
              styleSrc: [
                "'self'",
                "'unsafe-inline'", // Для вбудованих стилів
                "https://fonts.googleapis.com",
              ],
              imgSrc: [
                "'self'",
                "data:",
                "https://babytilly.s3.amazonaws.com",
                "https://www.google.com",
              ],
              fontSrc: [
                "'self'",
                "data:", // Дозволяє base64-шрифти
                "https://fonts.gstatic.com",
              ],
              frameSrc: ["'self'", "https://www.google.com"],
              connectSrc: [
                "'self'",
                "https://carrellobaby.com",
                "https://your-mongodb-uri.com",
              ],
            },
          },
        }),
      },
    ];
  },
};

export default nextConfig;
