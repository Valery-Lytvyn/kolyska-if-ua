"use client";
import SectionSlogan from "@/components/typography/SectionSlogan";
import SectionTitle from "@/components/typography/SectionTitle";
import { LOCATIONS } from "@/lib/data/constants";
import Image from "next/image";
import React from "react";

const Delivery: React.FC = () => {
  return (
    <main className="bg-white min-h-screen flex items-center justify-center px-4">
      <section className="w-full max-w-7xl mx-auto py-12 text-center">
        <SectionTitle title="Як здійснюється доставка замовлень?" />
        <SectionSlogan slogan="Ми робимо все можливе, щоб ваші замовлення були доставлені швидко та зручно. Ось основні деталі:" />

        <div className="mt-8 space-y-8 text-left">
          {[
            {
              title: "Щоденна відправка:",
              content:
                "Відправлення замовлень здійснюється щодня, тому ви можете бути впевнені, що ваше замовлення буде оброблене якнайшвидше.",
            },
            {
              title: "Габаритні товари:",
              content:
                "Для замовлень з габаритними товарами передбачений мінімальний аванс у розмірі 500 грн. Це дозволяє нам швидше запустити процес доставки.",
            },
            {
              title: "Транспортна компанія:",
              content:
                "Доставка здійснюється через Нову Пошту — одну з найнадійніших транспортних компаній України.",
            },
            {
              title: "Вартість доставки:",
              content:
                "Вартість доставки залежить від габаритів, ваги товару, місця призначення та обраного способу доставки. Оплата послуг перевізника здійснюється при отриманні замовлення.",
            },
            {
              title: "Термін доставки:",
              content:
                "Термін доставки становить від 1 до 7 днів залежно від вашого місця проживання та наявності товару.",
            },
            {
              title: "Безкоштовна доставка:",
              content:
                "На окремі товари, позначені на сайті, діє безкоштовна доставка. Зверніть увагу: безкоштовна доставка не поширюється на замовлення, оформлені з послугою Оплати Частинами.",
            },
          ].map(({ title, content }) => (
            <div key={title} className="space-y-2">
              <h3 className="text-xl font-semibold text-primary">{title}</h3>
              <p className="text-secondary">{content}</p>
            </div>
          ))}

          <h3 className="text-xl font-semibold text-primary">Самовивіз:</h3>
          <p className="text-secondary">
            Ви можете забрати своє замовлення самостійно за адресами наших
            магазинів:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                address: `${LOCATIONS[0].address}(${LOCATIONS[0].name})`,
                image: LOCATIONS[0].image,
              },
              {
                address: `${LOCATIONS[1].address}(${LOCATIONS[1].name})`,
                image: LOCATIONS[1].image,
              },
            ].map((item, index) => (
              <div key={index} className="w-full h-64 space-y-2">
                <div className="relative h-56 w-full">
                  <Image
                    src={item.image}
                    alt="Магазин Колиска"
                    fill
                    priority
                    quality={75}
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-lg shadow-lg object-cover "
                  />
                </div>
                <p className="mt-2 text-secondary">{item.address}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold text-primary">
            Наявність товарів:
          </h3>
          <p className="text-secondary">
            Не усі товари, представлені на сайті, є в наявності у наших
            магазинах. Якщо товар знаходиться на складі, його доставка до
            магазину займе від 1 до 7 днів. Ви завжди можете уточнити наявність
            товару за телефоном.
          </p>

          <h3 className="text-xl font-semibold text-primary">
            Чому варто обрати нашу доставку?
          </h3>
          <ul className="list-disc list-inside space-y-2 text-secondary">
            {[
              "Швидкість: Ми працюємо оперативно, щоб ви отримали своє замовлення якнайшвидше.",
              "Зручність: Ви можете обрати доставку Новою Поштою або самовивіз з наших магазинів.",
              "Прозорість: Вартість доставки розраховується індивідуально, і ви завжди знаєте, за що платите.",
              "Надійність: Ми співпрацюємо з перевіреними транспортними компаніями, щоб ваші замовлення доставлялися без затримок.",
            ].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <p className="mt-8 text-xl font-bold text-primary">
          «Колиска» — це не лише якісні товари для дітей, але й комфортний
          сервіс для вас!
        </p>
      </section>
    </main>
  );
};

export default Delivery;
