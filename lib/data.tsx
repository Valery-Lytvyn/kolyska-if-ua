import { ROUTES } from "@/routes/routes";
import { ContactLocation, NavItem } from "@/types/types";
import { BsInfoLg } from "react-icons/bs";
import { IoHomeOutline, IoCardOutline } from "react-icons/io5";
import { RiContactsBook3Line } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";

export const navItems: NavItem[] = [
  { item: "Головна", href: ROUTES.home, icon: <IoHomeOutline /> },
  { item: "Про нас", href: ROUTES.about, icon: <BsInfoLg /> },
  { item: "Доставка", href: ROUTES.delivery, icon: <TbTruckDelivery /> },
  { item: "Оплата", href: ROUTES.payment, icon: <IoCardOutline /> },
  { item: "Контакти", href: ROUTES.contact, icon: <RiContactsBook3Line /> },
];
export const categories = [
  {
    categoryId: "11053",
    categoryName: "АВТОКРІСЛА",
  },
  {
    categoryId: "96754",
    categoryName: "АКСЕСУАРИ",
  },
  {
    categoryId: "67665",
    categoryName: "БІГОВЕЛИ",
  },
  {
    categoryId: "11037",
    categoryName: "ДВОКОЛІСНІ",
  },
  {
    categoryId: "50591",
    categoryName: "ДИТЯЧІ ШЕЗЛОНГИ",
  },
  {
    categoryId: "11082",
    categoryName: "КОЛЯСКИ ПРОГУЛЯНКОВІ",
  },
  {
    categoryId: "42772",
    categoryName: "КОЛЯСКИ УНІВЕРСАЛЬНІ",
  },
  {
    categoryId: "7550",
    categoryName: "ЛІЖЕЧКА ТА МАТРАЦИ",
  },
  {
    categoryId: "11050",
    categoryName: "МАНЕЖІ",
  },
  {
    categoryId: "11051",
    categoryName: "СТІЛЬЧИКИ ДЛЯ ГОДУВАННЯ",
  },
  {
    categoryId: "11038",
    categoryName: "ТРИКОЛІСНІ",
  },
  {
    categoryId: "11054",
    categoryName: "ХОДУНКИ",
  },
];

export const categoryMap: Record<string, string> = {
  "коляски універсальні": "universal-strollers",
  "коляски прогулянкові": "strollers",
  автокрісла: "car-seats",
  "ліжечка та матраци": "cribs-and-mattresses",
  "стільчики для годування": "feeding-chairs",
  манежі: "playpens",
  "дитячі шезлонги": "children-chaise-lounges",
  аксесуари: "accessories",
  двоколісні: "two-wheels",
  триколісні: "three-wheels",
  ходунки: "walkers",
  біговели: "runners-bikes",
};
export const categorySlugToIdMap = {
  "all-strollers": ["42772", "11082"], // Візочки універсальні та прогулянкові
  "universal-strollers": ["42772"], // Візочки універсальні
  strollers: ["11082"], // Візочки прогулянкові
  "car-seats": ["11053"], // Автокрісла
  nursery: ["7550", "11051", "11050", "50591", "96754"], // Дитяча кімната
  "cribs-and-mattresses": ["7550"], // Ліжечка та матраци
  "feeding-chairs": ["11051"], // Крісла для годування
  playpens: ["11050"], // Манежі
  "children-chaise-lounges": ["50591"], // Шезлонги
  accessories: ["96754"], // Аксесуари
  "active-recreation": ["11037", "11038", "11054", "67665"], // Активний відпочинок
  "two-wheels": ["11037"], // Велосипеди
  "three-wheels": ["11038"], // Велосипеди триколісні
  walkers: ["11054"], // Ходунці
  "runners-bikes": ["67665"], // Біговели
};
export interface MenuItem {
  title: string;
  href: string;
  children?: MenuItem[];
  label: string;
}
export interface Category {
  id: string;
  name: string;
  slug: string;
}

export const menuItems: MenuItem[] = [
  {
    title: "Каталог",
    href: ROUTES.catalog,
    label: "catalog",
  },
  {
    title: "Автокрісла",
    href: ROUTES.carSeats,
    label: "car-seats",
    children: [
      { title: "Автокрісла", href: ROUTES.carSeats, label: "car-seats" },
    ],
  },
  {
    title: "Візочки",
    href: ROUTES.allStrollers,
    label: "all-strollers",
    children: [
      {
        title: "Візочки універсальні",
        href: ROUTES.universalStrollers,
        label: "universal-strollers",
      },
      {
        title: "Візочки прогулянкові",
        href: ROUTES.strollers,
        label: "strollers",
      },
    ],
  },
  {
    title: "Активний відпочинок",
    href: ROUTES.activeRecreation,
    label: "active-recreation",
    children: [
      { title: "Велосипеди", href: ROUTES.twoWheels, label: "two-wheels" },
      {
        title: "Велосипеди триколісні",
        href: ROUTES.threeWheels,
        label: "three-wheels",
      },
      { title: "Ходунці", href: ROUTES.walkers, label: "walkers" },
      { title: "Біговели", href: ROUTES.runnersBikes, label: "runners-bikes" },
    ],
  },
  {
    title: "Дитяча кімната",
    href: ROUTES.nursery,
    label: "nursery",
    children: [
      {
        title: "Дитячі ліжечка",
        href: ROUTES.cribsAndMattresses,
        label: "cribs-and-mattresses",
      },
      {
        title: "Крісла для годування",
        href: ROUTES.feedingChairs,
        label: "feeding-chairs",
      },
      { title: "Манежі", href: ROUTES.playpens, label: "playpens" },
      {
        title: "Шезлонги",
        href: ROUTES.childrenChaiseLounges,
        label: "children-chaise-lounges",
      },
      { title: "Аксесуари", href: ROUTES.accessories, label: "accessories" },
    ],
  },
];
export const locations: ContactLocation[] = [
  {
    name: 'ТЦ "Альянс"',
    address: "м. Івано-Франківськ, вул. Любомира Гузара, 24",
    mapLink:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194.844980229117!2d24.70699577565619!3d48.92470576865736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4730c17019a9a84d%3A0x9c1b553566717d2a!2z0JzQsNCz0LDQt9C40L0g0LTQuNGC0Y_Rh9C40YUg0YLQvtCy0LDRgNGW0LIgItCa0L7Qu9C40YHQutCwIg!5e0!3m2!1suk!2sua!4v1689402768118!5m2!1suk!2sua",
    image: "/alians.webp",
  },
  {
    name: 'ТЦ "Бельведер"',
    address: "м. Івано-Франківськ, вул. Тичини, 7",
    mapLink:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d389.68415615156533!2d24.705336615861782!3d48.92544958687183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4730c113d2397d3b%3A0x8f073310b015d2bb!2z0JrQvtC70LjRgdC60LAgKNC00LjRgtGP0YfRliDQutC-0LvRj9GB0LrQuCAp!5e0!3m2!1suk!2sua!4v1689403324118!5m2!1suk!2sua",
    image: "/belveder.webp",
  },
];
