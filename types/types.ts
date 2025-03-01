import { IconType } from "react-icons";

export interface NavItem {
  item: string;
  href: string;
  icon: IconType;
}
export interface YmlCatalog {
  yml_catalog: {
    $: {
      date: string;
    };
    shop: Shop;
  };
}

export interface Shop {
  currencies: {
    currency: {
      $: {
        id: string;
        rate: string;
      };
    };
  };
  categories: {
    category: Category[];
  };
  offers: {
    offer: Offer[];
  };
}

export interface Category {
  _: string; // The text content of the category
  $: {
    id: string;
  };
}

export interface Offer {
  $: {
    id: string;
    available: string;
  };
  price: string;
  currencyId: string;
  categoryId: string;
  picture: string;
  name: string;
  vendor: string;
  vendorCode: string;
  description: string;
  barcode: string;
}

export interface ProductCardProps {
  index: number;
  productId: string;
  price: string;
  imageUrl: string;
  productName: string;
}

export interface ProductCategory {
  categoryId: string;
  name: string;
  cyrillicName: string;
}

export interface CatalogState {
  categoryMap: ProductCategory[];
  offers: Offer[];
  bestOffers: string[];
  newOffers: string[];
  selectedProduct: Offer | null;
  loaded: boolean;
  loading: boolean;
  error: string | null;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}
export interface CartState {
  items: CartItem[];
}
export interface ViewedProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}
export interface MenuItem {
  title: string;
  href: string;
  children?: { title: string; href: string }[];
}
export interface Category {
  id: string;
  name: string;
  slug: string;
}
export interface ViewedProductsState {
  viewedProductIds: string[];
}
export interface WishedProductsState {
  wishedProductIds: string[];
}

export type ToastType = "success" | "error" | "info";
export interface ToastState {
  message: string;
  isVisible: boolean;
  duration?: number;
  type?: ToastType;
}
export interface UserState {
  name: string;
  email: string;
  isAuthenticated: boolean;
}

export interface ContactLocation {
  name: string;
  address: string;
  mapLink: string;
  image: string;
}

export interface Social {
  href: string;
  icon: IconType;
  label: string;
}

export interface Contact {
  value: string;
  icon: React.ElementType;
  label: string;
}
