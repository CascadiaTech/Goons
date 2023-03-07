import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import HeaderComponent from "../components/Header/HeaderComponent";
import "tailwindcss-elevation";
import FooterComponent from "../components/Footer/FooterComponent";
import DualCardComponent from "../components/DualCards/DualCardComponent";
import ScrollpositionAnimation from "../hooks/OnScroll";
import { useEffect, useRef, useState } from "react";
import "@uniswap/widgets/fonts.css";
import goonsHomepage from "../assets/images/GoonsHomepage.jpg"
import goonsLogoMobile from "../assets/images/goonsLogoMobile.jpg";
import { useWeb3React } from "@web3-react/core";
import ClaimComponent from "../components/Claim/ClaimComponent";
import MintCardComponent from "../components/Cards/MintCard";
const Home: NextPage = () => {
  const { account, chainId, active } = useWeb3React();
  const showConnectAWallet = Boolean(!account);
  const context = useWeb3React();
  const { library } = context;
  const [isended, setisended] = useState(false);
  const videoRef: any = useRef(null);
  const attemptPlay = () => {
    videoRef &&
      videoRef.current &&
      videoRef.current.load() &&
      videoRef.current.play().catch((error: any) => {
        console.log("error attempting to play", error);
      });
  };

  useEffect(() => {
    videoRef.current.defaultMuted = true;
    attemptPlay();
  });

  useEffect(() => {
    async function ScrollpositionAnimation() {
      const targets = document.querySelectorAll(".js-show-on-scroll");
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          // Is the element in the viewport?
          if (entry.isIntersecting) {
            // Add the fadeIn class:
            entry.target.classList.add("motion-safe:animate-fadeIn");
          } else {
            // Otherwise remove the fadein class
            entry.target.classList.remove("motion-safe:animate-fadeIn");
          }
        });
      });
      // Loop through each of the target
      targets.forEach(function (target) {
        // Hide the element
        target.classList.add("opacity-0");

        // Add the element to the watcher
        observer.observe(target);
      });
      //ScrollpositionAnimation();
    }
    async function scrollpositionAnimationdown() {
      const targets = document.querySelectorAll(".js-show-on-scroll-down");
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          // Is the element in the viewport?
          if (entry.isIntersecting) {
            // Add the fadeIn class:
            entry.target.classList.add("motion-safe:animate-fadeindown");
          } else {
            // Otherwise remove the fadein class
            entry.target.classList.remove("motion-safe:animate-fadeindown");
          }
        });
      });
      // Loop through each of the target
      targets.forEach(function (target) {
        // Hide the element
        target.classList.add("opacity-0");

        // Add the element to the watcher
        observer.observe(target);
      });
      //ScrollpositionAnimation();
    }
    async function scrollpositionAnimationleft() {
      const targets = document.querySelectorAll(".js-show-on-scroll-left");
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          // Is the element in the viewport?
          if (entry.isIntersecting) {
            // Add the fadeIn class:
            entry.target.classList.add("motion-safe:animate-fadeinleft");
          } else {
            // Otherwise remove the fadein class
            entry.target.classList.remove("motion-safe:animate-fadeinleft");
          }
        });
      });
      // Loop through each of the target
      targets.forEach(function (target) {
        // Hide the element
        target.classList.add("opacity-0");

        // Add the element to the watcher
        observer.observe(target);
      });
      //ScrollpositionAnimation();
    }
    async function scrollpositionAnimationright() {
      const targets = document.querySelectorAll(".js-show-on-scroll-right");
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          // Is the element in the viewport?
          if (entry.isIntersecting) {
            // Add the fadeIn class:
            entry.target.classList.add("motion-safe:animate-fadeinright");
          } else {
            // Otherwise remove the fadein class
            entry.target.classList.remove("motion-safe:animate-fadeinright");
          }
        });
      });
      // Loop through each of the target
      targets.forEach(function (target) {
        // Hide the element
        target.classList.add("opacity-0");

        // Add the element to the watcher
        observer.observe(target);
      });
      //ScrollpositionAnimation();
    }
    async function scrollpositionAnimationscaleintopleft() {
      const targets = document.querySelectorAll(".js-show-on-scroll-scaleintopleft");
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          // Is the element in the viewport?
          if (entry.isIntersecting) {
            // Add the fadeIn class:
            entry.target.classList.add("motion-safe:animate-scaleintopleft");
          } else {
            // Otherwise remove the fadein class
            entry.target.classList.remove("motion-safe:animate-scaleintopleft");
          }
        });
      });
      // Loop through each of the target
      targets.forEach(function (target) {
        // Hide the element
        target.classList.add("opacity-0");

        // Add the element to the watcher
        observer.observe(target);
      });
      //ScrollpositionAnimation();
    }
    scrollpositionAnimationscaleintopleft()
    scrollpositionAnimationleft();
    scrollpositionAnimationright();
    scrollpositionAnimationdown();

    ScrollpositionAnimation();
  });

  function RenderButtons() {
    setisended(true);
  }
  
 // <div className={"mb-10 sm:mb-10 md:mb-10 lg:mb-10 xl:mb-0 flex flex-col"}>
 // <Image
 //   className="min-w-0 min-h-0 visible sm:visible md:visible lg:visible xl:min-w-0 xl:min-h-0 xl:invisible"
 //   src={goonsLogoMobile}
 // ></Image>
 // </div>

  return (
    <div className="scroll-smooth">
      <main className={styles.main}>
        <header>
          {" "}
          <HeaderComponent></HeaderComponent>
        </header>
        <div className="flex flex-col px-32 mt-32 justify-center w-full h-full">
          <Image
            src={goonsHomepage}
            className="invisible sm:invisible md:invisible lg:invisible xl:visible"
          >
           </Image>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          className={
            "mx-auto self-center content-center items-center justify-center"
          }
        >
          <p className={"my-0 sm:my-0 md:my-0 lg:my-0 xl:my-10"}></p>
         
          <div
            className={"flex flex-row w-screen object-center justify-center"}
          >
            <button
              style={{ fontFamily: "BeatWord" }}
              onClick={() => window.open("https://google.com")}
              type="button"
              className="text-gray-100 hover:animate-fadeinleft js-show-on-scroll-left hover:text-black border transition-all duration-600 border-gray-200 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-2xl md:text-3xl px-8 py-4 text-center mr-2 mb-2"
            >
              {" "}
              OpenSea
            </button>
            <button
              style={{ fontFamily: "BeatWord" }}
              onClick={() => window.open("https://www.givewellinu.com/home")}
              type="button"
              className="text-gray-100 hover:animate-fadeindown js-show-on-scroll-down hover:text-black border transition-all duration-600 border-gray-200 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-2xl md:text-3xl px-8 py-4 text-center mr-2 mb-2"
            >
              Website
            </button>
            <button
              style={{ fontFamily: "BeatWord" }}
              onClick={() =>
                window.open(
                  "https://app.uniswap.org/#/swap?inputCurrency=0x74be64b45d394fa57816c1950e94dbb8d7a7b306&outputCurrency=ETH"
                )
              }
              type="button"
              className="text-gray-100 hover:animate-fadeinright js-show-on-scroll-right hover:text-black border transition-all duration-500 border-gray-200 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-2xl md:text-3xl px-8 py-4 text-center mr-2 mb-2"
            >
              Token
            </button>
          </div>
        </div>

        
        <p className={"my-10"}></p>

        <div className={"flex flex-col xl:flex-row mx-auto justify-center px-6 md:px-16 lg:px-24"}>
          <div className={"flex flex-col mx-6 hover:animate-scaleintopleft js-show-on-scroll-scaleintopleft transition-all duration-600"}>
          <div className="video-docker top-0 left-0 h-full justify-center w-full h-full">
          <video
            ref={videoRef}
            className=""
            playsInline
            autoPlay
            loop
            muted
          >
            
              <source src="/WalkinGoon.mp4" type="video/mp4"/> Your browser does
            not support the video tag, update your browser
          </video>
        </div>
          </div>
          <div
            className={
              "flex flex-col border-2 border-teal-200 my-10 lg:my-0 rounded-lg hover:animate-scaleintopleft js-show-on-scroll-scaleintopleft transition-all duration-600 h-fit py-10 w-fit"
            }
          >
            <p
              style={{ fontFamily: "BeatWord" }}
              className={
                "text-3xl lg:text-4xl text-teal-100 text-center self-center mx-auto border-b-4 border-white"
              }
            >
              Here's something interesting you should know!
            </p>
            <p
              style={{ fontFamily: "MondayFeelings" }}
              className={
                "text-xl lg:text-2xl text-teal-100 text-center pt-6 px-4 self-center mx-auto"
              }
            >
              Let's talk about how to get engaged in our community
              <br /> At the GoonSquad community we believe in fairness and
              equality for the individual <br /> Join the community by
              purhcasing yourself a unique NFT and you will be rewarded greatly{" "}
              <br /> We aim to be the most trustworthy, exciting meme token that
              allows for passive income yield in the form of token USDC
              reflections.
            </p>
          </div>
        </div>

        <hr className="my-4 mx-auto w-48 h-1 bg-gray-100 rounded border-0 md:my-10" />


      <div className={'justify-center flex flex-col'}>
        <ClaimComponent></ClaimComponent>
      </div>
      </main>
      <FooterComponent></FooterComponent>
    </div>
  );
};

export default Home;
