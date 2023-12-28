import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com/products",
  params: {},
});

export default instance;
