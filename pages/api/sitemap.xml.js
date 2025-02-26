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
      { loc: 'https://kolyska.if.ua/', lastmod: currentDate }, // Головна сторінка
      { loc: 'https://kolyska.if.ua/login', lastmod: currentDate },
      { loc: 'https://kolyska.if.ua/register', lastmod: currentDate },
      { loc: 'https://kolyska.if.ua/profile', lastmod: currentDate },
      { loc: 'https://kolyska.if.ua/about', lastmod: currentDate },
      { loc: 'https://kolyska.if.ua/delivery', lastmod: currentDate },
      { loc: 'https://kolyska.if.ua/payment', lastmod: currentDate },
      { loc: 'https://kolyska.if.ua/contact', lastmod: currentDate },
      { loc: 'https://kolyska.if.ua/best-offers', lastmod: currentDate },
      { loc: 'https://kolyska.if.ua/new-offers', lastmod: currentDate },
      { loc: 'https://kolyska.if.ua/admin-dashboard', lastmod: currentDate },
   ];

   // Додаємо URL-адреси для категорій
   categories.forEach((category) => {
      urls.push({
         loc: `https://kolyska.if.ua/catalog/${category.categoryId}/1`, // Пагінація для каталогу
         lastmod: currentDate,
      });
   });

   // Додаємо URL-адреси для продуктів
   offers.forEach((offer) => {
      urls.push({
         loc: `https://kolyska.if.ua/product/${offer.$.id}`,
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