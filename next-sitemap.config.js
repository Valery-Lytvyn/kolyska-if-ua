
const config = {
   siteUrl: 'https://kolyska.if.ua',
   generateRobotsTxt: true,
   changefreq: 'daily',
   priority: 0.7,
   exclude: ['/admin-dashboard', '/login', '/register', '/profile'],
   getPriority: (path) => {
      if (path.includes('/catalog') || path.includes('/product')) {
         return 0.8;
      }
      return 0.6;
   },
   transform: async (config, path) => {
      return {
         loc: path,
         lastmod: new Date().toISOString(),
         changefreq: path.includes('/catalog') || path.includes('/product') ? 'daily' : 'weekly',
         priority: config.getPriority(path),
      };
   },
   robotsTxtOptions: {
      policies: [
         {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin-dashboard', '/login', '/register', '/profile'],
         },
         {
            userAgent: 'Googlebot',
            allow: '/',
            disallow: ['/admin-dashboard'],
         },
      ],
      additionalSitemaps: [
         'https://kolyska.if.ua/sitemap.xml',
      ],
   },
};

export default config;
