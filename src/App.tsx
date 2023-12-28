import "./App.css";
import { useEffect, useState } from "react";
import "./App.css";
import { atom, useRecoilState } from "recoil";
import axios from "./api/axios";
import { productListState } from "./atoms/productList";
import { productType } from "./atoms/productList";
import List from "./components/List";
import requests from "./api/requests";
import styled from "styled-components";
import { Outlet, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Header from "./components/Header";
import DetailPage from "./pages/DetailPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const [productList, setProductList] = useRecoilState<productType[]>(productListState);

  const fetchInitialProducts = async () => {
    try {
      let res = await axios.get(requests.fetchAllProducts);
      setProductList(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchInitialProducts();
  }, [productList]); // 페이지가 맨 처음 렌더링될 때 실행됨

  const Layout = () => {
    return (
      <div>
        <Header />

        <Nav />

        <Outlet />
      </div>
    );
  };
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<List category="all" />} />
          <Route path="/products/all" element={<List category="all" />} />
          <Route path="/products/jewelery" element={<List category="jewelery" />} />
          <Route path="/products/electronics" element={<List category="electronics" />} />
          <Route path="/products/mensclothing" element={<List category="men's clothing" />} />
          <Route path="/products/womensclothing" element={<List category="women's clothing" />} />
          <Route path="products/:productId" element={<DetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

const Button = styled.button`
  margin: 1px 5px;
  height: 40px;
  width: 200px;
  padding: 10px 16px;
  border: 1px solid gray;
  border-radius: 4px;
`;

export class Product {
  category: string;
  id: number;
  title: string;
  description: string;
  price: number;
  rating: {};
  image: string;

  constructor(data: ResObjectType) {
    this.category = data.category;
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.price = data.price;
    this.rating = data.rating;
    this.image = data.image;
  }
}

export interface ResObjectType {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { count: number; rate: number };
  title: string;
}

export interface CategoryType {
  category: string;
}
