import { atom } from "recoil";
import { productType } from "./productList";

export const cartState = atom<productType[]>({
  key: "cartStateAtom",
  default: [],
});
