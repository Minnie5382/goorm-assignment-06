import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Params, useParams } from "react-router-dom";
import axios from "../../api/axios";
// import { productState } from "../../atoms/product";
import { productListState, productType } from "../../atoms/productList";
import { ResObjectType } from "../../App";
import { cartState } from "../../atoms/cart";

export default function DetailPage() {
  // const [productList, setProductList] = useRecoilState<productType[]>(productListState);
  const [product, setProduct] = useState<productType>({
    description: "",
    id: 0,
    image: "",
    price: 0,
    title: "",
    category: "",
    count: 0,
  });
  const [cart, setCart] = useRecoilState<productType[]>(cartState);

  const productId = useParams(); // 이전 페이지의 key 값

  const fetchProductInfo = async (id: Readonly<Params<string>>) => {
    try {
      let res = await axios.get(`${id.productId}`);
      setProduct({
        description: res.data.description,
        id: res.data.id,
        image: res.data.image,
        price: res.data.price,
        title: res.data.title,
        category: res.data.category,
        count: 1,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // 초기 데이터 반환
  const loadCartData = () => {
    const storedData = localStorage.getItem("cart");
    return storedData ? JSON.parse(storedData) : []; // localStorage에 데이터가 있으면 파싱, 없으면 빈 배열 반환
  };

  // 장바구니에 상품 추가
  const handleIntoCart = (newProduct: productType) => {
    let currentData = loadCartData();
    const existingItem = currentData.find((product: productType) => product.id === newProduct.id);

    if (!existingItem) {
      const updatedData = [...currentData, newProduct];
      setCart(updatedData);
      localStorage.setItem("cart", JSON.stringify(updatedData));
    } else {
      const updatedData = currentData.map((data: productType) => {
        if (data.id === newProduct.id) {
          data.count++;
          return data;
        } else {
          return data;
        }
      });

      setCart(updatedData);
      localStorage.setItem("cart", JSON.stringify(updatedData));
    }
  };

  const handleGotoCart = () => {
    window.location.href = "/cart";
  };

  useEffect(() => {
    fetchProductInfo(productId);
  }, [cart]);

  return (
    <div className="flex justify-center px-20 py-10">
      <img className="w-2/5 p-9" src={product.image} />
      <div className="flex flex-col justify-center w-3/5 p-9">
        <div className="text-xl">{product.category}</div>
        <div className="text-4xl mt-1">{product.title}</div>
        <div className="text-3xl mt-6">${product.price}</div>
        <div className="mt-1">{product.description}</div>
        <div className="flex justify-center mt-9">
          <button
            className="border px-8 py-3 text-xl mx-8 bg-gray-200"
            onClick={() => {
              handleIntoCart(product);
            }}
          >
            into cart
          </button>
          <button
            className="border px-8 py-3 text-xl mx-8 bg-gray-200"
            onClick={() => {
              handleGotoCart();
            }}
          >
            go to cart
          </button>
        </div>
      </div>
    </div>
  );
}
