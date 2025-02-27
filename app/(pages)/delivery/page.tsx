"use client";
import SectionSlogan from "@/components/typography/SectionSlogan";
import SectionTitle from "@/components/typography/SectionTitle";
import { LOCATIONS } from "@/lib/data/constants";
import Image from "next/image";
import React from "react";

const Delivery: React.FC = () => {
  const deliveryDetails = [
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
  ];

  const returnPolicy = {
    title: "Повернення та обмін товару",
    content: [
      "Відповідно до «Закону України про захист прав споживачів», ви маєте право відмовитися від товару, придбаного в інтернет-магазині kolyska.if, або обміняти його на аналогічний.",
      "Умови повернення або обміну товару належної якості:",
      "Термін: Повернення або обмін можливі протягом 14 днів з моменту отримання товару.",
      "Стан товару: Товар не повинен бути в експлуатації, має залишатися новим, зі збереженим товарним виглядом, споживчими властивостями, пломбами, ярликами та іншими елементами, що були на момент покупки.",
      "Документи: Наявність товарного чека або іншого документа, що підтверджує факт покупки.",
      "Умови обміну: Якщо аналогічний товар відсутній у продажу, ви маєте право обрати інший товар з наявного асортименту або отримати повну вартість товару назад.",
      "Повернення товару з доставкою: Якщо товар доставлявся з іншого міста, клієнт зобов'язаний оплатити вартість доставки в обидві сторони.",
      "У разі повернення товару через заводський брак, клієнт не оплачує доставку.",
      "Важливо: Повернення коштів здійснюється на банківську картку або інший спосіб оплати, який був використаний при покупці, протягом 7 робочих днів з моменту отримання товару назад.",
    ],
  };

  return (
    <main className="bg-white min-h-screen flex items-center justify-center px-4 py-12">
      <section className="w-full max-w-7xl mx-auto space-y-12">
        <div className="text-center">
          <SectionTitle title="Як здійснюється доставка замовлень?" />
          <SectionSlogan slogan="Ми робимо все можливе, щоб ваші замовлення були доставлені швидко та зручно. Ось основні деталі:" />
        </div>

        <div className="space-y-8">
          {deliveryDetails.map(({ title, content }) => (
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
            {LOCATIONS.slice(0, 2).map((location, index) => (
              <div key={index} className="w-full h-64 space-y-2">
                <div className="relative h-56 w-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={location.image}
                    alt={`Магазин ${location.name}`}
                    fill
                    priority
                    quality={75}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-2 text-secondary">{`${location.address} (${location.name})`}</p>
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

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-primary">
            {returnPolicy.title}
          </h3>
          {returnPolicy.content.map((text, index) => (
            <p key={index} className="text-secondary">
              {text}
            </p>
          ))}
        </div>

        <p className="mt-8 text-xl font-bold text-primary text-center">
          «Колиска» — це не лише якісні товари для дітей, але й комфортний
          сервіс для вас!
        </p>
      </section>
    </main>
  );
};

export default Delivery;
