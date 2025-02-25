import { Contact, ContactLocation, Social } from "@/types/types";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { MdLocalPhone, MdMailOutline } from "react-icons/md";

export const ITEMS_PER_PAGE = 12;

export const SOCIALS: Social[] = [
  {
    href: "https://www.instagram.com/kolyska.if/",
    icon: FaInstagram,
    label: "instagram icon",
  },
  {
    href: "https://www.facebook.com/kolyska.if/",
    icon: FaFacebookF,
    label: "facebook icon",
  },
];

export const CONTACTS: Record<"phone" | "email", Contact> = {
  phone: {
    value: "+380-66-295-85-83",
    icon: MdLocalPhone,
    label: "Зателефонувати нам",
  },
  email: {
    value: "kolyskaifua@gmail.com",
    icon: MdMailOutline,
    label: "Написати нам на email",
  },
};

export const LOCATIONS: ContactLocation[] = [
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

export const WORKING_HOURS= {
  weekdays: "Пн-Пт: 10:00 - 18:00",
  weekend: "Сб-Нд: 11:00 - 16:00",
};
