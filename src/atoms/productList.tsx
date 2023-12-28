import { atom } from "recoil";

export interface productType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  count: number;
}
export const productListState = atom<productType[]>({
  key: "",
  default: [],
});
