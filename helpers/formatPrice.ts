export const formatPrice = (price: string): number => {
  const num = Math.floor(parseFloat(price.replace(",", ".")));
  return num;
};
