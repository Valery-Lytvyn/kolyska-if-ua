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
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy-Report-Only",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://www.google-analytics.com https://www.google.com https://www.gstatic.com http://www.w3.org/2000/;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.google.com https://www.gstatic.com http://www.w3.org/2000/;
              font-src 'self' https://fonts.gstatic.com;
              img-src 'self' data: https://babytilly.s3.amazonaws.com https://lh3.googleusercontent.com http://www.w3.org/2000/;
              connect-src 'self' https://carrellobaby.com https://maps.googleapis.com https://maps.gstatic.com https://www.google-analytics.com https://*.mongodb.net;
              frame-src 'self' https://www.google.com https://www.google.com/recaptcha/;
              object-src 'none';
              upgrade-insecure-requests;
            `
              .replace(/\s{2,}/g, " ")
              .trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
