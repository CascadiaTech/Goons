import "tailwindcss-elevation";
import { useWeb3React } from "@web3-react/core";
import Swal from "sweetalert2";
import { Accordion } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { abiObject } from "../../contracts/abi/abi.mjs";
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

    async function PendingReflections() {
      try {
        setLoading(true);
        const abi = abiObject;
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const contractaddress = "0xFC2C1EdBc2715590667c7c4BE0563010aBC9E205"; // "clienttokenaddress"
        const contract = new Contract(contractaddress, abi, provider);
        const rewardToken = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
        const Reflections = await contract.withdrawableDividendOf(
          account,
          rewardToken
        ); //.claim()
        //const FinalReflections = BigNumber.from(Reflections)
        // const test = formatEther(String(Reflections))
        const finalnumber = Number(Reflections);
        setpendingreflections(finalnumber);
        console.log(Reflections);

        return finalnumber;
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    async function FetchDistributed() {
      try {
        setLoading(true);
        const abi = abiObject;
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const contractaddress = "0xFC2C1EdBc2715590667c7c4BE0563010aBC9E205"; // "clienttokenaddress"
        const contract = new Contract(contractaddress, abi, provider);
        const rewardToken = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
        const Reflections = await contract.getTotalDividendsDistributed(
          rewardToken
        );
        const finalnumber = Number(Reflections);
        settotaldistributed(finalnumber);

        return finalnumber;
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
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
    scrollpositionAnimationleft();
    scrollpositionAnimationright();

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
      const contractaddress = "0xC1948D3FECaF1B33bB5b1bff22f944Cdc595C218"; // "clienttokenaddress"
      const provider = new Web3Provider(
        library?.provider as ExternalProvider | JsonRpcFetchFunc
      );
      //const provider = getDefaultProvider()
      const signer = provider.getSigner();
      const contract = new Contract(contractaddress, abi, signer);
      console.log(contract);
      const ClaimTokens = await contract.ClaimTokens(tokenid); //.claim()
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
          return currentperiod;
        }
      } catch (error) {
        console.log(error);
      } finally {
        console.log(claim);
      }
    }
    CanClaim();
    setProvider().then((result) => setuniswapprivder(result as any));
  }, [account]);

  return (
    <>
      <div className="flex flex-col w-full content-center items-center px-6 sm:px-10 md:px-20 lg:px-48 xl:px-64 js-show-on-scroll">
    <table className={'table-auto'}>
      <div className={'flex flex-row w-full h-fit hover:animate-fadeinleft js-show-on-scroll-left py-4 px-2 my-4 border-2 border-white rounded-2xl'}>
        <p className={'text-xl text-white mx-10'}>Pending Reflections</p>
        <p className={'text-xl text-white mx-10'}>$0.002374</p>
      </div>

      <div className={'flex flex-row w-full h-fit hover:animate-fadeinright js-show-on-scroll-right py-4 px-2 my-4 border-2 border-white rounded-2xl'}>
        <p className={'text-xl text-white mx-10'}>Total Reflections Distributed</p>
        <p className={'text-xl text-white mx-10'}>$100,000.4</p>
      </div>

      <div className={'flex flex-row w-full h-fit hover:animate-fadeinleft js-show-on-scroll-left py-4 px-2 my-4 border-2 border-white rounded-2xl'}>
        <p className={'text-xl text-white mx-10'}>Market Cap</p>
        <p className={'text-xl text-white mx-10'}>$10,000</p>
      </div>

      <div className={'flex flex-row w-full h-fit hover:animate-fadeinright js-show-on-scroll-right py-4 px-2 my-4 border-2 border-white rounded-2xl'}>
        <p className={'text-xl text-white mx-10'}>HODLER's</p>
        <p className={'text-xl text-white mx-10'}>151</p>
      </div>
      </table>

        <h5
          style={{ fontFamily: "MondayFeelings" }}
          className="text-center mb-2 text-3xl font-bold tracking-tight self-center text-purple-100 dark:text-white"
        >
          Claim ETH Rewards
        </h5>
        {loading ? (
          <Spin indicator={antIcon} className="add-spinner" />
        ) : (
          <>
            <div className="flex flex-row content-center items-center max-w-screen">
              <button
                style={{ fontFamily: "BeatWord" }}
                type="button"
                onClick={() => Claimtoken()}
                className="w-fit mx-0 px-20 md:px-32 self-center content-center tn:mx-0 elevation-10 hover:elevation-50 md:mx-24 h-24
                 clip-path-mycorners justify-self-center mt-10 text-gray-100 bg-teal-500 hover:bg-blue-900 transition ease-in-out duration-700
                 text-3xl lg:text-4xl "
              >
                Claim
              </button>
            </div>

          </>
        )}
      </div>

      <div className="content-center max-w-screen"></div>

      <div></div>
    </>
  );
}
