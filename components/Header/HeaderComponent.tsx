import "tailwindcss-elevation";

import React from "react";
//import Image from "next/image";
import Link from "next/link";
import Image from "next/image";
import goonsLogo from "../../public/GoonsLogo.jpg"
import { ConnectWallet } from "../Web3Modal/WalletConnect";
import { Dropdown } from "flowbite-react";
export default function HeaderComponent() {
  //    backgroundImage: `url(${backgroundimage})`,

  return (
    <div>
      <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-black dark:border-gray-600">
        <div className="container flex flex-nowrap justify-left items-center mx-auto">
          <div></div>
          <div className="md:order-2">
            <ConnectWallet></ConnectWallet>
          </div>
          <div className="sm:visible md:hidden">
            <Dropdown label="Navigation">
              <Dropdown.Header>
                <span  className="block text-md cursor-pointer block py-2 pr-4 pl-3 text-black rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    style={{ fontFamily: "PaintDrops" }}>Navigation</span>
              </Dropdown.Header>
              <Dropdown.Item>
               <Link href="/">
                  <p
                    className="cursor-pointer block py-2 pr-4 pl-3 text-black rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    style={{ fontFamily: "PaintDrops" }}
                  >
                    Dashboard{" "}
                  </p>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href="/Dapp/NFTMintPage">
                  <p
                    className="cursor-pointer block py-2 pr-4 pl-3 text-black rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    style={{ fontFamily: "PaintDrops" }}
                  >
                    NFT Mint{" "}
                  </p>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <a 
                  onClick={() =>
                    window.open("https://www.givewellinu.com/home")
                  }>
                  <p
                    className="cursor-pointer block py-2 pr-4 pl-3 text-black rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    style={{ fontFamily: "PaintDrops" }}
                  >
                    Website
                  </p>
                </a>
              </Dropdown.Item>
              <Dropdown.Divider />
            </Dropdown>
          </div>
          <div
            className="h-0 justify-left items-left text-left w-full md:flex md:h-fit md:w-auto order-1"
            id="navbar-sticky"
          >
            <ul className="invisible md:visible h-auto flex flex-row justify-left text-left items-left p-4 mt-4 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-md md:font-medium md:border-0 dark:border-gray-700">
            <li>
                <Image width={50} height={50} src={goonsLogo} alt="asa"></Image>
              </li> 
            <li>
                <button
                  type="button"
                  onClick={() =>
                    window.open("https://www.givewellinu.com/home")
                  }
                  className="text-white bg-red-600 hover:bg-red-400 focus:ring-4 focus:ring-blue-300 font-medium mt-2 rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  <p
                    className="cursor-pointer block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:text-white md:p-0 dark:text-white"
                    style={{ fontFamily: "PaintDrops" }}
                  >
                    Website{" "}
                  </p>
                </button>
              </li>
              <li>
              <Link href="/">
                <button
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-400 focus:ring-4 focus:ring-blue-300 font-medium mt-2 rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  <p
                    className="cursor-pointer block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:text-white md:p-0 dark:text-white"
                    style={{ fontFamily: "PaintDrops" }}
                  >
                    Dashboard{" "}
                  </p>
                </button>
                </Link>
              </li>
              <li>
              <Link href="/Dapp/NFTMintPage">
                <button
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-400 focus:ring-4 focus:ring-blue-300 font-medium mt-2 rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  <p
                    className="cursor-pointer block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:text-white md:p-0 dark:text-white"
                    style={{ fontFamily: "PaintDrops" }}
                  >
                    NFT Mint{" "}
                  </p>
                </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
