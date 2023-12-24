import { atom } from "recoil";

export interface productType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
export const productState = atom<productType[]>({
  key: "",
  default: [],
});
