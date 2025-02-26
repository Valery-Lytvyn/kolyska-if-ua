export const transformStringToNumber = (string: string): number => {
  const num = Math.floor(parseFloat(string.replace(",", ".")));
  return num;
};

export const formatPrice = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
