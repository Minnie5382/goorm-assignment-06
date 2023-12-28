import React from "react";
import styled from "styled-components";
import { Route, Link } from "react-router-dom";

export default function Nav() {
  return (
    <div>
      <section className="flex flex-col text-center">
        <h2 className="text-2xl m-3">Products</h2>
        <div>
          <Link to="/products/all">
            <Button>ALL</Button>
          </Link>
          <Link to="/products/jewelery">
            <Button>JEWELERY</Button>
          </Link>
          <Link to="/products/electronics">
            <Button>ELECTRONICS</Button>
          </Link>
          <Link to="products/mensclothing">
            <Button>MEN'S CLOTHING</Button>
          </Link>
          <Link to="products/womensclothing">
            <Button>WOMEN'S CLOTHING</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

const Button = styled.button`
  margin: 1px 5px;
  height: 40px;
  width: 200px;
  padding: 10px 16px;
  border: 1px solid gray;
  border-radius: 4px;
`;
