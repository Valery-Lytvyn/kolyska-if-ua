import { ROUTES } from "@/routes/routes";
import { MenuItem, NavItem } from "@/types/types";
import { BsInfoLg } from "react-icons/bs";
import { IoHomeOutline, IoCardOutline } from "react-icons/io5";
import { RiContactsBook3Line } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";

export const navItems: NavItem[] = [
  { item: "Головна", href: ROUTES.home, icon: IoHomeOutline },
  { item: "Про нас", href: ROUTES.about, icon: BsInfoLg },
  { item: "Доставка", href: ROUTES.delivery, icon: TbTruckDelivery },
  { item: "Оплата", href: ROUTES.payment, icon: IoCardOutline },
  { item: "Контакти", href: ROUTES.contact, icon: RiContactsBook3Line },
];
// const categories = [
//   {
//     categoryId: "11053",
//     categoryName: "АВТОКРІСЛА",
//   },
//   {
//     categoryId: "96754",
//     categoryName: "АКСЕСУАРИ",
//   },
//   {
//     categoryId: "67665",
//     categoryName: "БІГОВЕЛИ",
//   },
//   {
//     categoryId: "11037",
//     categoryName: "ДВОКОЛІСНІ",
//   },
//   {
//     categoryId: "50591",
//     categoryName: "ДИТЯЧІ ШЕЗЛОНГИ",
//   },
//   {
//     categoryId: "11082",
//     categoryName: "КОЛЯСКИ ПРОГУЛЯНКОВІ",
//   },
//   {
//     categoryId: "42772",
//     categoryName: "КОЛЯСКИ УНІВЕРСАЛЬНІ",
//   },
//   {
//     categoryId: "7550",
//     categoryName: "ЛІЖЕЧКА ТА МАТРАЦИ",
//   },
//   {
//     categoryId: "11050",
//     categoryName: "МАНЕЖІ",
//   },
//   {
//     categoryId: "11051",
//     categoryName: "СТІЛЬЧИКИ ДЛЯ ГОДУВАННЯ",
//   },
//   {
//     categoryId: "11038",
//     categoryName: "ТРИКОЛІСНІ",
//   },
//   {
//     categoryId: "11054",
//     categoryName: "ХОДУНКИ",
//   },
// ];

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

export const menuItems: MenuItem[] = [
  {
    title: "Каталог",
    href: "catalog",
  },
  {
    title: "Автокрісла",
    href: "car-seats",
    children: [{ title: "Автокрісла", href: "car-seats" }],
  },
  {
    title: "Візочки",
    href: "all-strollers",
    children: [
      {
        title: "Візочки універсальні",
        href: "universal-strollers",
      },
      {
        title: "Візочки прогулянкові",
        href: "strollers",
      },
    ],
  },
  {
    title: "Активний відпочинок",
    href: "active-recreation",
    children: [
      { title: "Велосипеди", href: "two-wheels" },
      {
        title: "Велосипеди триколісні",

        href: "three-wheels",
      },
      { title: "Ходунці", href: "walkers" },
      { title: "Біговели", href: "runners-bikes" },
    ],
  },
  {
    title: "Дитяча кімната",

    href: "nursery",
    children: [
      {
        title: "Дитячі ліжечка",

        href: "cribs-and-mattresses",
      },
      {
        title: "Крісла для годування",

        href: "feeding-chairs",
      },
      { title: "Манежі", href: "playpens" },
      {
        title: "Шезлонги",

        href: "children-chaise-lounges",
      },
      { title: "Аксесуари", href: "accessories" },
    ],
  },
];
