import SectionSlogan from "@/components/typography/SectionSlogan";
import SectionTitle from "@/components/typography/SectionTitle";
import Image from "next/image";
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
          <Image
            src="/about_1.webp"
            alt="Магазин Колиска"
            width={600}
            height={600}
            priority
            quality={75}
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-auto object-cover mx-auto rounded-lg shadow-md"
          />
        </div>

        <p className="mt-6 text-lg text-secondary leading-relaxed">
          Для дбайливих батьків «Колиска» — це не просто магазин, а справжній
          помічник. Ми ретельно підбираємо асортимент, щоб запропонувати лише
          якісні, безпечні та стильні товари для дітей.
        </p>

        <div className="mt-8 grid md:grid-cols-2 gap-6 items-center">
          <Image
            src="/about_2.webp"
            alt="Інтер'єр магазину"
            width={300}
            height={400}
            priority
            quality={75}
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-auto object-cover mx-auto rounded-lg shadow-md"
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
            </ul>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Image
            src="/about_3.webp"
            alt="Товари магазину"
            width={300}
            height={400}
            priority
            quality={75}
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-auto object-cover mx-auto rounded-lg shadow-md"
          />
        </div>
      </section>
    </main>
  );
};

export default About;
