import React, { useEffect } from "react";

export default function useChangeCount(ref: any, handler: () => void): void {
  //   useEffect(() => {
  //     const listener = (e: any) => {
  //       if (!ref.current.contains(e.target)) handler();
  //       else return;
  //     };
  //     document.addEventListener("mousedown", listener);
  //     return () => {
  //       document.removeEventListener("mousedown", listener);
  //     };
  //   }, []);
}
