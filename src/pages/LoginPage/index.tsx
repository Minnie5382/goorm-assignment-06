import React from "react";

export default function LoginPage() {
  return (
    <div>
      <div className="flex flex-col items-center border m-20 p-16">
        <div className="text-3xl mb-8">LogIn</div>
        <div>
          <span>ID : </span>
          <input className="border m-3 p-1" type="text"></input>
        </div>
        <div>
          <span>Password : </span>
          <input className="border m-3 p-1" type="password"></input>
        </div>
        <button className=" mt-10 px-10 py-3 text-xl bg-gray-100">login</button>
      </div>
    </div>
  );
}
