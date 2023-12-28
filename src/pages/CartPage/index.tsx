import { ResObjectType } from "../../App";
import axios from "../../api/axios";
import React, { useEffect, useRef, useState } from "react";
import { cartState } from "../../atoms/cart";
import { useRecoilState } from "recoil";
import { productType } from "../../atoms/productList";
import useChangeCount from "../../hooks/useChangeCount";

export default function CartPage() {
  const [cart, setCart] = useRecoilState<productType[]>(cartState);
  const [total, setTotal] = useState(0);

  const ref: any = useRef({});

  const calculateTotal = () => {
    let sum = 0;
    cart.forEach((item) => {
      sum += item.price * item.count;
    });
    setTotal(sum);
  };

  const handleDelete = (product: productType) => {
    const updatedData = cart.filter((item) => item.id !== product.id);
    localStorage.setItem("cart", JSON.stringify(updatedData));
    setCart(updatedData);
  };

  const loadCurrentData = () => {
    const loadedData = localStorage.getItem("cart");
    if (loadedData) setCart(JSON.parse(loadedData));
    else setCart([]);
  };

  const handleAllDelete = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  const handlePayClick = () => {
    handleAllDelete();
  };

  const handleCountDown = (id: number) => {
    ref.current[id].value--;
  };

  const handleCountUp = (id: number) => {
    ref.current[id].value++;
  };

  useChangeCount(ref, () => {
    const currentData = loadCurrentData();
  });

  useEffect(() => {
    loadCurrentData();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  return (
    <div>
      <button className="border rounded px-5 py-3 ml-8" onClick={handleAllDelete}>
        전체 삭제
      </button>
      {cart.map((product) => {
        return (
          <div key={product.id} className="border p-7 mx-8 my-3 flex justify-evenly text-xl">
            <div>
              <img className="w-30 h-40" src={product.image} />
            </div>
            <div className="w-1/2">
              <div className="text-2xl mb-3">{product.title}</div>
              <div>
                {product.price} x {product.count} = ${product.price * product.count}
              </div>
              <div>
                <button
                  className="border w-7 h-7 rounded "
                  onClick={() => {
                    handleCountDown(product.id);
                  }}
                >
                  -
                </button>
                <input key={product.id} ref={(el) => (ref.current[product.id] = el)} type="text" value={product.count} className="w-12 text-center m-1" />
                <button
                  className="border w-7 h-7 rounded "
                  onClick={() => {
                    handleCountUp(product.id);
                  }}
                >
                  +
                </button>
              </div>
              <button
                className="border p-1"
                onClick={() => {
                  handleDelete(product);
                }}
              >
                삭제
              </button>
            </div>
          </div>
        );
      })}
      <div className="text-3xl right-9 text-right mr-8">Total : ${total}</div>
      <div className="text-right">
        <button className="text-4xl px-5 py-3 border rounded m-8" onClick={handlePayClick}>
          결제하기
        </button>
      </div>
    </div>
  );
}
