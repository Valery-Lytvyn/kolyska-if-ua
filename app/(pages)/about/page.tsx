import SectionSlogan from "@/components/typography/SectionSlogan";
import SectionTitle from "@/components/typography/SectionTitle";
import ShopImageWithGradient from "@/components/ui/ShopImageWithGradient";
import React from "react";

const About: React.FC = () => {
  return (
    <main className="bg-white min-h-screen flex items-center justify-center px-4">
      <section className="w-full max-w-7xl mx-auto py-12 text-center">
        <SectionTitle title="Ми раді вітати вас на сайті інтернет-магазину «Колиска»!" />
        <SectionSlogan
          slogan="Ми спеціалізуємося на всьому, що потрібно для щасливого та комфортного
          дитинства. У нас ви знайдете:"
        />
        <div className="mt-4 grid md:grid-cols-2 gap-6 items-center">
          <ul className="space-y-2 text-lg text-secondary text-left md:text-center">
            <li>✅ Дитячі візочки для прогулянок у будь-яку пору року</li>
            <li>✅ Колиски та люльки для спокійного сну вашого малюка</li>
            <li>✅ Постільну білизну з натуральних матеріалів</li>
            <li>
              ✅ Дитячі меблі для створення затишку в кімнаті вашої дитини
            </li>
            <li>✅ Автокрісла для безпечних подорожей</li>
            <li>✅ Крісла для годування та багато інших товарів</li>
          </ul>
          <ShopImageWithGradient
            src="/about_1.webp"
            alt="Зображення Магазину Колиска 1"
          />
        </div>

        <p className="mt-6 text-lg text-secondary leading-relaxed">
          Для дбайливих батьків «Колиска» — це не просто магазин, а справжній
          помічник. Ми ретельно підбираємо асортимент, щоб запропонувати лише
          якісні, безпечні та стильні товари для дітей. Наша мета — зробити ваше
          батьківство щасливим і безтурботним.
        </p>

        <div className="mt-8 grid md:grid-cols-2 gap-6 items-center">
          <ShopImageWithGradient
            src="/about_2.webp"
            alt="Зображення Магазину Колиска 2"
          />
          <div className="p-6 border border-light-gray rounded-2xl shadow-md bg-white">
            <h3 className="text-xl font-semibold text-primary">
              🎯 Чому обирають нас?
            </h3>
            <ul className="mt-3 space-y-2 text-left text-secondary">
              <li>🔹 Широкий асортимент для дітей від народження</li>
              <li>🔹 Якість та безпека від перевірених виробників</li>
              <li>🔹 Зручність замовлення та швидка доставка</li>
              <li>🔹 Професійна консультація від наших експертів</li>
              <li>🔹 Гарантія на всі товари та можливість повернення</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6 items-center">
          <div className="p-6 border border-light-gray rounded-2xl shadow-md bg-white">
            <h3 className="text-xl font-semibold text-primary">
              🌟 Наші переваги
            </h3>
            <ul className="mt-3 space-y-2 text-left text-secondary">
              <li>🔹 Індивідуальний підхід до кожного клієнта</li>
              <li>🔹 Регулярні акції та знижки для постійних клієнтів</li>
              <li>🔹 Екологічно чисті матеріали у всіх товарах</li>
              <li>🔹 Можливість оформлення розстрочки</li>
              <li>🔹 Онлайн-підтримка 24/7</li>
            </ul>
          </div>
          <ShopImageWithGradient
            src="/about_3.webp"
            alt="Зображення Магазину Колиска 3"
          />
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-primary">
            🛒 Як замовити товар?
          </h3>
          <p className="mt-4 text-lg text-secondary leading-relaxed">
            Замовити товар у нас дуже просто! Виберіть потрібний товар у
            каталозі, додайте його до кошика та оформіть замовлення. Наш
            менеджер зв&apos;яжеться з вами для підтвердження замовлення та
            уточнення деталей доставки.
          </p>
          <p className="mt-4 text-lg text-secondary leading-relaxed">
            Доставка здійснюється по всій Україні. Ми працюємо з надійними
            транспортними компаніями, щоб ваші покупки прибули вчасно та без
            пошкоджень.
          </p>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-primary">
            📞 Зв&apos;яжіться з нами
          </h3>
          <p className="mt-4 text-lg text-secondary leading-relaxed">
            Якщо у вас виникли питання або потрібна допомога у виборі товару,
            наші консультанти завжди готові допомогти. Зв&apos;яжіться з нами за
            телефоном або через форму зворотного зв&apos;язку на сайті.
          </p>
        </div>
      </section>
    </main>
  );
};

export default About;
