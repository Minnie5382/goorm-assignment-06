import React from "react";
import styled from "styled-components";

export default function Header() {
  return (
    <div>
      <header className="p-3 flex justify-between border-b-4">
        <div onClick={() => (window.location.href = "/")}>Shop</div>
        <div>
          <button className="mx-1" onClick={() => (window.location.href = `/cart`)}>
            cart
          </button>
          <button className="mx-1">mypage</button>
          <button
            className="mx-1"
            onClick={() => {
              window.location.href = `/login`;
            }}
          >
            login
          </button>
        </div>
      </header>
    </div>
  );
}
