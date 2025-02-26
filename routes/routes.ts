const PAGE_NUMBER = 1;

export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  profile: "/profile",
  about: "/about",
  delivery: "/delivery",
  payment: "/payment",
  contact: "/contact",
  bestOffers: "/best-offers",
  newOffers: "/new-offers",
  adminDashboard: "/admin-dashboard",
  product: (productId: string) => `/product/${productId}`,
  catalog: `/catalog/${PAGE_NUMBER}`,
  catalogSection: (categorySlug: string) =>
    `/catalog/${categorySlug}/${PAGE_NUMBER}`,
};
