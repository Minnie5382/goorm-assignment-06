import { atom } from "recoil";
import { productType } from "./productList";
import { ResObjectType } from "../App";

export const productState = atom<productType>({
  key: "productStateAtom",
  default: {
    category: "",
    description: "",
    id: 0,
    image: "",
    price: 0,
    title: "",
    count: 0,
  },
});
