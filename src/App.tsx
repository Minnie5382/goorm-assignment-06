import React from "react";
import "./App.css";

import { useEffect, useState } from "react";
import "./App.css";
import { atom, useRecoilState } from "recoil";
import axios from "axios";
import { productState } from "./atoms/product";
import { productType } from "./atoms/product";

function App() {
  const [product, setProduct] = useRecoilState<productType[]>(productState);

  const getRandomProduct = async () => {
    try {
      let productList = await axios // axios: 비동기 // await : 동기(직렬)처럼 동작하게. 기다려준다.
        .get(`https://fakestoreapi.com/products`);

      const productObjList = productList.data.map((data: productType) => {
        return {
          id: data.id,
          title: data.title,
          price: data.price,
          description: data.description,
          category: data.category,
          image: data.image,
        };
      });

      setProduct(productObjList);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getRandomProduct();
  }, []); // 페이지가 맨 처음 렌더링될 때 실행됨

  console.log(product);

  return (
    <div className="">
      <header className="p-3 flex justify-between border-b-4">
        <div>Shop</div>

        <div>
          <button className="mx-1">cart</button>
          <button className="mx-1">mypage</button>
          <button className="mx-1">login</button>
        </div>
      </header>
      <section className="flex flex-col text-center">
        <h2 className="text-2xl m-3">Products</h2>
        <div className="">
          <button className="mx-2 border-2 rounded px-9 py-2">모두</button>
          <button className="mx-2 border-2 rounded px-9 py-2">전자기기</button>
        </div>
      </section>
      <main className="p-4">
        <div className="mb-2">Showing 20 items</div>
        <div className="flex flex-wrap justify-evenly">
          {product.map((entry) => {
            return (
              <div className="relative w-40 h-72 border flex items-center flex-col p-3">
                <img className="h-44 w-40" src={entry.image} />
                <div className="h-1/4 w-32 truncate">{entry.title}</div>
                <div className="flex justify-center">
                  <div className="flex absolute bottom-2">
                    <div>${entry.price}</div>
                    <div className="ml-3 border">cart</div>
                  </div>
                </div>
              </div>
            );
          })}
          {/* <div className="border flex flex-col p-3">
            <div>이미지</div>
            <div>상품명</div>
            <div className="flex justify-center">
              <div className="border">cart</div>
              <div>가격</div>
            </div>
          </div>
          <div className="border flex flex-col p-3">
            <div>이미지</div>
            <div>상품명</div>
            <div className="flex justify-center">
              <div className="border">cart</div>
              <div>가격</div>
            </div>
          </div>
          <div className="border flex flex-col p-3">
            <div>이미지</div>
            <div>상품명</div>
            <div className="flex justify-center">
              <div className="border">cart</div>
              <div>가격</div>
            </div>
          </div>
          <div className="border flex flex-col p-3">
            <div>이미지</div>
            <div>상품명</div>
            <div className="flex justify-center">
              <div className="border">cart</div>
              <div>가격</div>
            </div>
          </div>
          <div className="border flex flex-col p-3">
            <div>이미지</div>
            <div>상품명</div>
            <div className="flex justify-center">
              <div className="border">cart</div>
              <div>가격</div>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
}

export default App;
