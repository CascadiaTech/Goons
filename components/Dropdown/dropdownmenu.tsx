import "tailwindcss-elevation";
import React, { useState } from "react";

export default function DropdownComponent() {
  const [hidden, sethidden] = useState(true);

  if (typeof window !== "undefined") {
    window.onclick = function (event) {
      if (
        document
          .getElementsByClassName("dropdown-conten")[0]
          .contains(event?.target as Node | null)
      ) {
        sethidden(!hidden);
        // inside
      } else {
        // outside
        sethidden(true);
      }
    };
  }

  return (
    <div className="dropdown-conten">
      <div className="flex flex-col text-center items-center">
        <button className="text-gray-100 hover:animate-fadeinright js-show-on-scroll-right hover:text-black border transition-all duration-500 border-gray-200 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-2xl md:text-3xl text-center mb-5">
          {" "}
          Shoes
        </button>
        <div
          className="elevation-10inline-block border-2 border-teal-200"
          style={{ visibility: hidden ? "hidden" : "visible" }}
        >
          <ul>
            <li className="px-5 m-2 bg-transparent hover:bg-slate-600"> hi</li>
            <li className="px-5 m-2 bg-transparent hover:bg-slate-600">me</li>
            <li className="px-5 m-2 bg-transparent hover:bg-slate-600"> glah</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
