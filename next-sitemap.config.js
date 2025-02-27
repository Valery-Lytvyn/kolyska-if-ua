
const config = {
   siteUrl: 'https://kolyska-if-ua.vercel.app',
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
         changefreq: 'weekly',
         priority: config.getPriority(path),
      };
   },
};

export default config;