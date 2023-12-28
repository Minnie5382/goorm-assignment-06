import { useRecoilState } from "recoil";
import axios from "../api/axios";
import React, { useEffect } from "react";
import { productListState, productType } from "../atoms/productList";
import { CategoryType, Product, ResObjectType } from "../App";
import requests from "../api/requests";
import styled from "styled-components";

export default function List({ category }: CategoryType) {
  // ts의 개빡치는 점 no.1
  const [productList, setProductList] = useRecoilState<productType[]>(productListState);

  const fetchCategoryProducts = async () => {
    try {
      let res;
      if (category === "all") res = await axios.get("");
      else res = await axios.get(`category/${category}`);
      const list = res.data.map((entry: ResObjectType) => {
        let productObj = new Product(entry);
        return productObj;
      });

      setProductList(list);
      console.log("List/productList : ", productList);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClick = (product: productType) => {
    window.location.href = `/products/${product.id}`; // 이렇게 해야함!!!
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, [productList]);

  return (
    <main className="p-4">
      <div className="mb-2">Showing 20 items</div>
      <div className="flex flex-wrap justify-evenly">
        {productList.map((product) => {
          return (
            <div
              className="mx-1 my-2 relative w-1/6 h-72 border flex items-center flex-col p-3"
              key={product.id}
              onClick={() => {
                handleClick(product);
              }}
            >
              <img className="h-44 w-40" src={product.image} />
              <Title>{product.title}</Title>
              <div className="flex justify-center">
                <div className="flex absolute bottom-2">
                  <div>${product.price}</div>
                  <button className="ml-3 border rounded">cart</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

const Title = styled.div`
  margin-top: 4px;
  height: 48px;
  width: auto;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 2; // 원하는 라인수
  -webkit-box-orient: vertical;
`;
