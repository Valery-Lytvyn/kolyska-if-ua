// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "babytilly.s3.amazonaws.com",
//       },
//       {
//         protocol: "https",
//         hostname: "lh3.googleusercontent.com",
//       },
//     ],
//   },

//   async headers() {
//     return [
//       {
//         source: "/(.*)",
//         headers: createSecureHeaders({
//           contentSecurityPolicy: {
//             directives: {
//               defaultSrc: ["'self'"],
//               scriptSrc: [
//                 "'self'",
//                 "'unsafe-inline'", // Додайте це, якщо ви використовуєте вбудовані скрипти
//                 "https://www.google.com", // Для Google Maps
//                 "https://www.gstatic.com", // Для Google reCAPTCHA
//               ],
//               styleSrc: [
//                 "'self'",
//                 "'unsafe-inline'", // Додайте це, якщо ви використовуєте вбудовані стилі
//                 "https://fonts.googleapis.com", // Для Google Fonts
//               ],
//               imgSrc: [
//                 "'self'",
//                 "data:",
//                 "https://babytilly.s3.amazonaws.com", // Для зображень з S3
//                 "https://www.google.com", // Для Google Maps
//               ],
//               fontSrc: [
//                 "'self'",
//                 "https://fonts.gstatic.com", // Для Google Fonts
//               ],
//               frameSrc: [
//                 "'self'",
//                 "https://www.google.com", // Для Google Maps
//               ],
//               connectSrc: [
//                 "'self'",
//                 "https://carrellobaby.com", // Для axios запитів
//                 "https://your-mongodb-uri.com", // Для підключення до MongoDB
//               ],
//             },
//           },
//         }),
//       },
//     ];
//   },
// };

// export default nextConfig;

import { createSecureHeaders } from "next-secure-headers";

module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)", // Застосовується до всіх шляхів
        headers: createSecureHeaders({
          contentSecurityPolicy: {
            directives: {
              defaultSrc: ["'self'"],
              scriptSrc: [
                "'self'",
                "'unsafe-inline'", // Для вбудованих скриптів
                "https://www.google.com", // Для Google Maps
                "https://www.gstatic.com", // Для Google reCAPTCHA
              ],
              styleSrc: [
                "'self'",
                "'unsafe-inline'", // Для вбудованих стилів
                "https://fonts.googleapis.com", // Для Google Fonts
              ],
              imgSrc: [
                "'self'",
                "data:",
                "https://babytilly.s3.amazonaws.com", // Для зображень з S3
                "https://www.google.com", // Для Google Maps
              ],
              fontSrc: [
                "'self'",
                "https://fonts.gstatic.com", // Для Google Fonts
              ],
              frameSrc: [
                "'self'",
                "https://www.google.com", // Для Google Maps
              ],
              connectSrc: [
                "'self'",
                "https://carrellobaby.com", // Для axios запитів
                "https://your-mongodb-uri.com", // Для підключення до MongoDB
              ],
            },
          },
        }),
      },
    ];
  },
};
