export const calculateTotal = <T extends { price: number }>(items: T[]): number =>
  items.reduce((total, item) => total + Number(item.price), 0);
