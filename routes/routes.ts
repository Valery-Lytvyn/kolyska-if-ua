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
  carSeats: `/catalog/car-seats/${PAGE_NUMBER}`,
  allStrollers: `/catalog/all-strollers/${PAGE_NUMBER}`,
  universalStrollers: `/catalog/universal-strollers/${PAGE_NUMBER}`,
  strollers: `/catalog/strollers/${PAGE_NUMBER}`,
  activeRecreation: `/catalog/active-recreation/${PAGE_NUMBER}`,
  twoWheels: `/catalog/two-wheels/${PAGE_NUMBER}`,
  threeWheels: `/catalog/three-wheels/${PAGE_NUMBER}`,
  walkers: `/catalog/walkers/${PAGE_NUMBER}`,
  runnersBikes: `/catalog/runners-bikes/${PAGE_NUMBER}`,
  nursery: `/catalog/nursery/${PAGE_NUMBER}`,
  cribsAndMattresses: `/catalog/cribs-and-mattresses/${PAGE_NUMBER}`,
  feedingChairs: `/catalog/feeding-chairs/${PAGE_NUMBER}`,
  playpens: `/catalog/playpens/${PAGE_NUMBER}`,
  childrenChaiseLounges: `/catalog/children-chaise-lounges/${PAGE_NUMBER}`,
  accessories: `/catalog/accessories/${PAGE_NUMBER}`,
};
