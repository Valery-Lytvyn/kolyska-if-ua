import SectionTitle from "@/components/typography/SectionTitle";
import { CONTACTS } from "@/lib/data/constants";
import { FaCreditCard, FaMoneyBillWave, FaStore } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

const paymentMethods = [
  {
    icon: FaCreditCard,
    title: "Оплата карткою через LiqPay",
    description: `Швидкий та зручний спосіб оплати ваші покупки онлайн. Ви можете
              використовувати будь-яку картку Visa або Mastercard. Наш партнер
              LiqPay забезпечує безпечні транзакції та миттєве підтвердження
              оплати.`,
  },
  {
    icon: MdLocalShipping,
    title: "Оплата при отриманні в Новій Пошті",
    description: `Ви можете оплатити товар при отриманні у відділенні Нової Пошти.
              Комісія за переказ грошей складає 2% від вартості товару + 20 грн.
              Цей спосіб ідеально підходить для тих, хто віддає перевагу оплаті
              після перевірки товару.`,
  },
  {
    icon: FaStore,
    title: "Готівковий розрахунок",
    description: `Оплатити товар готівкою можна в наших магазинах у
              Івано-Франківську. Ми раді вас бачити! Наші консультанти
              допоможуть вам з вибором товару та оформленням покупки.`,
  },
  {
    icon: FaMoneyBillWave,
    title: "Оплата на розрахунковий рахунок",
    description: `Для оплати на розрахунковий рахунок зв'яжіться з нашим
              менеджером. Ми надамо вам всі необхідні реквізити.`,
  },
];

const paysInfo = [
  ` Усі платежі обробляються через безпечні платіжні системи, що
гарантує захист ваших даних.`,
  `Після оплати ви отримаєте електронний
чек або інший документ, що підтверджує оплату.`,
  `Якщо у вас виникли
проблеми з оплатою, наші фахівці завжди готові допомогти.`,
];

const PaymentPage = () => {
  return (
    <main className="bg-white min-h-screen flex justify-center px-4 py-12">
      <section className="w-full max-w-7xl mx-auto">
        <SectionTitle title="Способи оплати" className="text-center mb-12" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {paymentMethods.map(({ icon: Icon, title, description }, index) => (
            <article
              className="bg-light-gray p-6 rounded-lg shadow-lg text-center hover:scale-105 transition-transform "
              key={index}
            >
              <Icon className="text-4xl text-accent mb-4 mx-auto" />
              <h2 className="text-xl font-semibold text-secondary ">{title}</h2>

              <p className="text-primary mt-6 flex-1">{description}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 bg-light-gray p-8 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-secondary mb-6 text-center">
            📋 Додаткова інформація про оплату
          </h3>
          <p className="text-primary text-center mb-4">
            Ми прагнемо зробити процес оплати максимально зручним для вас. Якщо
            у вас виникли питання або потрібна допомога, будь ласка,
            зв&apos;яжіться з нами.
          </p>
          <ul className="text-primary space-y-2 max-w-2xl mx-auto ">
            {paysInfo.map((item, index) => (
              <li key={index}>✅ {item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-12 bg-light-gray p-8 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold text-secondary mb-6">
            📞 Зв&apos;яжіться з нами для отримання додаткової інформації
          </h3>
          <a
            href={`mailto:${CONTACTS.email.value}`}
            aria-label={CONTACTS.email.label}
            className="flex gap-2 items-center justify-center hover:scale-105 transition-transform duration-500 p-2 mx-auto"
          >
            <CONTACTS.email.icon className="text-2xl text-accent hover:text-accent-hover transition-colors" />
            <span className="text-primary">{CONTACTS.email.value}</span>
          </a>

          <a
            href={`tel:${CONTACTS.phone.value}`}
            aria-label={CONTACTS.phone.label}
            className="flex gap-2 items-center justify-center hover:scale-105 transition-transform duration-500 w-fit p-2 mx-auto"
          >
            <CONTACTS.phone.icon className="text-2xl text-accent hover:text-accent-hover transition-colors" />
            <span className="text-primary">{CONTACTS.phone.value}</span>
          </a>
        </div>
      </section>
    </main>
  );
};

export default PaymentPage;
