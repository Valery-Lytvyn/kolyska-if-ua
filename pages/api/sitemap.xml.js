import { createServerStore } from '../../store/serverStore'; // Імпортуємо серверний store
import { fetchCatalog } from '../../store/slices/catalogSlice'; // Імпортуємо дію для завантаження даних

export default async function handler(req, res) {
   // Отримуємо поточну дату для поля <lastmod>
   const currentDate = new Date().toISOString();

   // Створюємо серверний store
   const store = createServerStore();

   // Диспатчимо дію для завантаження даних каталогу
   await store.dispatch(fetchCatalog());

   // Отримуємо дані з Redux store
   const state = store.getState();
   const categories = state.catalog.categoryMap;
   const offers = state.catalog.offers;

   // Створюємо масив URL-адрес на основі даних з Redux
   const urls = [
      { loc: 'https://kolyska-if-ua.vercel.app/', lastmod: currentDate }, // Головна сторінка
      { loc: 'https://kolyska-if-ua.vercel.app/login', lastmod: currentDate },
      { loc: 'https://kolyska-if-ua.vercel.app/register', lastmod: currentDate },
      { loc: 'https://kolyska-if-ua.vercel.app/profile', lastmod: currentDate },
      { loc: 'https://kolyska-if-ua.vercel.app/about', lastmod: currentDate },
      { loc: 'https://kolyska-if-ua.vercel.app/delivery', lastmod: currentDate },
      { loc: 'https://kolyska-if-ua.vercel.app/payment', lastmod: currentDate },
      { loc: 'https://kolyska-if-ua.vercel.app/contact', lastmod: currentDate },
      { loc: 'https://kolyska-if-ua.vercel.app/best-offers', lastmod: currentDate },
      { loc: 'https://kolyska-if-ua.vercel.app/new-offers', lastmod: currentDate },
      { loc: 'https://kolyska-if-ua.vercel.app/admin-dashboard', lastmod: currentDate },
   ];

   // Додаємо URL-адреси для категорій
   categories.forEach((category) => {
      urls.push({
         loc: `https://kolyska-if-ua.vercel.app/catalog/${category.categoryId}/1`, // Пагінація для каталогу
         lastmod: currentDate,
      });
   });

   // Додаємо URL-адреси для продуктів
   offers.forEach((offer) => {
      urls.push({
         loc: `https://kolyska-if-ua.vercel.app/product/${offer.$.id}`,
         lastmod: currentDate,
      });
   });


   const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls
         .map(
            (url) => `
        <url>
          <loc>${url.loc}</loc>
          <lastmod>${url.lastmod}</lastmod>
        </url>
      `,
         )
         .join('')}
    </urlset>
  `;


   res.setHeader('Content-Type', 'text/xml');

   res.write(sitemap);
   res.end();
}