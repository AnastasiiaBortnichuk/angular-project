import { IProduct } from "./types";

export const isAdded = (list: IProduct[], id: number): boolean => {
  return list.some((purchase) => purchase.id === id);
};
