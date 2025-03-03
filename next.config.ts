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
            key: "Content-Security-Policy",
            value: `
            default-src 'self';
            script-src 'self' 'strict-dynamic' 'nonce-{random-nonce}' https://maps.googleapis.com https://www.google.com https://www.gstatic.com;
            style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.google.com https://www.gstatic.com;
            font-src 'self' data: https://fonts.gstatic.com;
            img-src 'self' data: https://babytilly.s3.amazonaws.com https://lh3.googleusercontent.com;
            connect-src 'self' https://carrellobaby.com https://maps.googleapis.com https://maps.gstatic.com https://www.google-analytics.com https://*.mongodb.net;
            frame-src 'self' https://www.google.com https://www.google.com/recaptcha/;
            object-src 'none';
            require-trusted-types-for 'script';
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
