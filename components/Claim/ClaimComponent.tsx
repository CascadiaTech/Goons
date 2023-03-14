import "tailwindcss-elevation";
import { useWeb3React } from "@web3-react/core";
import Swal from "sweetalert2";
import { Accordion } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { abiObject } from "../../contracts/abi/abi.mjs";
import { Web3ReactProvider } from "@web3-react/core";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ScrollpositionAnimation from "../../hooks/OnScroll";

export default function ClaimComponent() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const { account } = useWeb3React();
  const showConnectAWallet = Boolean(!account);
  const context = useWeb3React();
  const [loading, setLoading] = useState(false);
  const [claim, setcanclaim] = useState(Boolean);
  const { library } = context;
  const [uniswaprovider, setuniswapprivder] = useState();
  const [tokenid, settokenid] = useState(Number);
  const [pendingreflections, setpendingreflections] = useState(Number);
  const [totaldistributed, settotaldistributed] = useState(Number);
  const [balance, setbalance] = useState(Number);
  const [EthPrice, setEthPrice] = useState(Number);
  const [holdersCount, setholdersCount] = useState(Number);
  const [marketCap, setmarketCap] = useState(Number);
  //const MarketCap = [(JpegPrice / EthPrice) * 10000000] // essentially jpegusd price divided by total supply

  if (typeof window !== "undefined") {
    useEffect(() => {
      // Update the document title using the browser API
      ScrollpositionAnimation();
    }, [window.scrollY]);
  }

  useEffect(() => {
    async function Fetchbalance() {
      if (!account) {
        return;
      }

      try {
        setLoading(true);
        const abi = abiObject;
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const contractaddress = "0xFC2C1EdBc2715590667c7c4BE0563010aBC9E205"; // "clienttokenaddress"
        const contract = new Contract(contractaddress, abi, provider);
        const balance = await new contract.balanceOf(account); //.claim(account,amount)
        const Claimtxid = await balance;
        const finalbalance = Number(balance);
        const Fixeddecimals = finalbalance.toFixed(2);
        const Numberify = Number(Fixeddecimals);
        setbalance(Numberify);
        console.log(Numberify);

        return Claimtxid;
        /////
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    async function FetchTestyCurrentTokenPrice() {
      if (showConnectAWallet) {
        console.log({
          message: "Hold On there Partner, there seems to be an Account err!",
        });
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          "https://api.etherscan.io/api?module=contract&action=getabi&address=0x83e9f223e1edb3486f876ee888d76bfba26c475a&apikey=432BW4Y2JX817J6CJAWGHAFTXQNFVXRU2Q"
        ); // Api Key also the pair contract

        const data = await response.json();
        const abi = data.result;
        console.log(abi);
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const contractaddress = "0x83e9f223e1edb3486f876ee888d76bfba26c475a"; // need uniswapv2pair
        const contract = new Contract(contractaddress, abi, provider);
        const Reserves = await contract.getReserves();
        const JpegReserveA = await Reserves.reserve0;
        const DisplayJpegReserves = JpegReserveA;
        console.log(DisplayJpegReserves);
        return DisplayJpegReserves;
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
    async function FetchMrTestyEthprice() {
      if (showConnectAWallet) {
        console.log({
          message: "Hold On there Partner, there seems to be an Account err!",
        });
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          "https://api.ethplorer.io/getTokenInfo/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9?apiKey=EK-9PHXj-P2uJWQm-fmJ3A"
        );

        const data = await response.json();
        const ethPrice = data.price.rate;
        console.log(ethPrice);
        setEthPrice(ethPrice);
      } catch (error) {
        console.log(error);
      } finally {
      }
    }

    FetchMrTestyEthprice();

    async function FetchholdersCount() {
      if (showConnectAWallet) {
        console.log({
          message: "Hold On there Partner, there seems to be an Account err!",
        });
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          "https://api.ethplorer.io/getTokenInfo/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9?apiKey=EK-9PHXj-P2uJWQm-fmJ3A"
        );

        const data = await response.json();
        const holdersCount = data.holdersCount;
        console.log(holdersCount);
        setholdersCount(holdersCount);
      } catch (error) {
        console.log(error);
      } finally {
      }
    }

    FetchholdersCount();

    async function FetchMarketCap() {
      if (showConnectAWallet) {
        console.log({
          message: "Hold On there Partner, there seems to be an Account err!",
        });
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          "https://api.ethplorer.io/getTokenInfo/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9?apiKey=EK-9PHXj-P2uJWQm-fmJ3A"
        );

        const data = await response.json();
        const marketCap = data.price.marketCapUsd;
        console.log(marketCap);
        setmarketCap(marketCap);
      } catch (error) {
        console.log(error);
      } finally {
      }
    }

    FetchMarketCap();

    async function PendingReflections() {
      try {
        setLoading(true);
        const abi = abiObject;
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const contractaddress = "0x60331f639169dDB9E520b9dc24DE795C15973F38"; // "clienttokenaddress"
        const contract = new Contract(contractaddress, abi, provider);
        const rewardToken = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
        const Reflections = await contract.withdrawableDividendOf(account); //.claim()
        const finalnumber = Web3.utils.fromWei(Reflections.toString());
        setpendingreflections(finalnumber);
        console.log(Reflections);
        console.log(finalnumber);
        return finalnumber;
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    function formattedReflections() {
      const formattednumber = parseFloat(pendingreflections.toFixed(9));
      console.log(formattednumber);
      return formattednumber;
    }

    async function FetchDistributed() {
      try {
        setLoading(true);
        const abi = abiObject;
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const contractaddress = "0x60331f639169dDB9E520b9dc24DE795C15973F38"; // "clienttokenaddress"
        const contract = new Contract(contractaddress, abi, provider);
        const rewardToken = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
        const Reflections = await contract.getTotalDividendsDistributed();
        const formattedDistributed = Web3.utils.fromWei(Reflections.toString());
        settotaldistributed(formattedDistributed);
        console.log(formattedDistributed);

        return formattedDistributed;
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    // async function formattedDistributed() {
    //    const totaldistributed = await FetchDistributed();
    //    const formattedDistributed = parseFloat(totaldistributed.toFixed(18));
    //    console.log(formattedDistributed);
    // }
    // formattedDistributed()

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
    async function scrollpositionAnimationfadeOut() {
      const targets = document.querySelectorAll(".js-show-on-scroll-fadeOut");
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          // Is the element in the viewport?
          if (entry.isIntersecting) {
            // Add the fadeIn class:
            entry.target.classList.add("motion-safe:animate-fadeIn");
          } else {
            // Otherwise remove the fadein class
            entry.target.classList.add("motion-safe:animate-fadeOut");
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

    scrollpositionAnimationleft();
    scrollpositionAnimationright();
    scrollpositionAnimationfadeOut();

    PendingReflections();
    Fetchbalance();
    FetchDistributed();
  }, [account]);

  const Claimtoken = useCallback(async () => {
    if (!account) {
      Swal.fire({
        icon: "error",
        title: "Connect Your Wallet To Mint, and Enter A Mint Quantity",
        timer: 5000,
      });
    }

    try {
      setLoading(true);
      const data = abiObject;
      const abi = data;
      const contractaddress = "0x60331f639169dDB9E520b9dc24DE795C15973F38"; // "clienttokenaddress"
      const provider = new Web3Provider(
        library?.provider as ExternalProvider | JsonRpcFetchFunc
      );
      //const provider = getDefaultProvider()
      const signer = provider.getSigner();
      const contract = new Contract(contractaddress, abi, signer);
      console.log(contract);
      const ClaimTokens = await contract.claim(); //.claim()
      const signtransaction = await signer.signTransaction(ClaimTokens);
      const Claimtxid = await signtransaction;
      Swal.fire({
        icon: "success",
        title: "Congratulations you have Claimed all of your rewards",
        text: "Go see them in your wallet, and stick around for the next drop",
      });
      return Claimtxid;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [account, library?.provider, claim]);

  useEffect(() => {
    async function setProvider() {
      if (account) {
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        return provider;
      } else {
        return;
      }
    }

    async function CanClaim() {
      if (!account) {
        console.log({
          message: "Hold On there Partner, there seems to be an Account err!",
        });
        return;
      }
      try {
        //setLoading(true)
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const abi = abiObject;
        const contractaddress = "0xC1948D3FECaF1B33bB5b1bff22f944Cdc595C218";
        const contract = new Contract(contractaddress, abi, provider);
        //const FinalResult = await UserTokenBalance.toString()
        if (!account) {
          return Swal.fire({
            icon: "error",
            title: "Connect your wallet to claim",
            text: "you must connect your wallet to claim",
          });
        } else {
          const usersclaimperiod = await contract.NFTSPeriodId(account);
          const currentperiod = await contract.currentRewardPeriodId();
          (await usersclaimperiod) && (await currentperiod);
          console.log(usersclaimperiod);
          console.log(currentperiod);
          if (usersclaimperiod <= currentperiod) {
            setcanclaim(true);
          } else {
            setcanclaim(false);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        let claim = null;
        console.log(claim);
      }
    }
    CanClaim();
    setProvider().then((result) => setuniswapprivder(result as any));
  }, [account]);

  return (
    <>
      <div className="flex flex-col w-full content-center items-center px-6 sm:px-10 md:px-20 lg:px-48 xl:px-64 js-show-on-scroll-fadeOut">
        <div className="md:grid grid-cols-2 flex flex-col border-2 border-black rounded-xl">
          <div
            className={
              "rounded-xl text-black text-xl px-4 py-2 m-3"
            }
          >
            <p className={"text-xl font-bold text-gray-800"}>
              Pending ETH Rewards:
            </p>
          </div>
          <div
            className={
              "rounded-xl text-black text-xl px-4 py-2 m-3"
            }
          >
            <p className={"text-xl text-gray-800 "}>{pendingreflections}</p>
          </div>
          <div
            className={
              "rounded-xl text-black  text-xl px-4 py-2 m-3"
            }
          >
            <p className={"text-xl font-bold text-gray-800"}>
              Total ETH Distributed
            </p>
          </div>
          <div className={"rounded-xl text-black text-xl px-4 py-2 m-3"}>
            <p className={"text-xl text-gray-800"}>{totaldistributed}</p>
          </div>
          <div className={"rounded-xl text-black text-xl px-4 py-2 m-3"}>
            <p className={"text-xl font-bold text-gray-800"}>Market Cap</p>
          </div>
          <div className={"rounded-xl text-black text-xl px-4 py-2 m-3"}>
            <p className={"text-xl text-gray-800"}>{marketCap} USD</p>
          </div>
          <div className={"rounded-xl text-black text-xl px-4 py-2 m-3"}>
            <p className={"text-xl font-bold text-gray-800"}>Holders:</p>
          </div>
          <div className={"rounded-xl text-black text-xl px-4 py-2 m-3"}>
            <p className={"text-xl text-gray-800"}>{holdersCount}</p>
          </div>
        </div>
        

        <h5
          style={{ fontFamily: "PaintDrops" }}
          className="text-center mb-2 text-4xl font-bold tracking-tight self-center text-gray-800 dark:text-gray-800"
        >
          Claim ETH Rewards < br/> (GOONZ TOKEN HOLDERS)
        </h5>
        {loading ? (
          <Spin indicator={antIcon} className="add-spinner" />
        ) : (
          <>
            <div className="flex flex-row content-center items-center max-w-screen">
              <button
                style={{ fontFamily: "PaintDrops" }}
                type="button"
                onClick={() => Claimtoken()}
                className="w-fit mx-0 px-20 md:px-32 self-center content-center tn:mx-0 elevation-10 hover:elevation-50 md:mx-24 h-24
                 clip-path-mycorners justify-self-center mt-10 text-gray-800 bg-red-600 hover:bg-red-400 transition ease-in-out duration-700
                 text-3xl lg:text-4xl "
              >
                Claim
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
