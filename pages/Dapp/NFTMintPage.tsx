import "tailwindcss-elevation";
import { LoadingOutlined } from "@ant-design/icons";
import { useWeb3React } from "@web3-react/core";
import { Spin } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import HeaderComponent from "../../components/Header/HeaderComponent";
import FooterComponent from "../../components/Footer/FooterComponent";
import goonsPic from "../../public/GoonsLogo.jpg";
import goonsPicMobile from "../../assets/images/goonsPicMobile.jpg";
import { Accordion } from "flowbite-react";
//import Rex_logo from '../../assets/images/REX_logo.png'
import { SwapWidget, darkTheme, lightTheme, Theme } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import {
  ExternalProvider,
  getDefaultProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from "@ethersproject/providers";
import Link from "next/link";
import { NFTABIObject } from "../../contracts/NftAbi.mjs";
import MintCardComponent from "../../components/Cards/MintCard";
import ClaimComponent from "../../components/Claim/ClaimComponent";
import { Contract } from "@ethersproject/contracts";
//const mySafeHTML = DOMPurify.sanitize(myHTML)

const NFTMint = () => {
  //const scrollY = useScrollPosition()
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [loading, setLoading] = useState(false);
  //const { account } = useActiveWeb3React()
  const { account } = useWeb3React();
  const showConnectAWallet = Boolean(!account);
  const context = useWeb3React();
  const { library } = context;
  const [uniswaprovider, setuniswapprivder] = useState();
  const [claim, setcanclaim] = useState(Boolean);
  const [tokenid, settokenid] = useState(Number);

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
      const data = NFTABIObject;
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
        const abi = NFTABIObject;
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


  const jsonRpcUrlMap = {
    1: ["https://mainnet.infura.io/v3/7724cb4383a249dfb4a847c90954b901"],
    3: ["https://ropsten.infura.io/v3/<YOUR_INFURA_PROJECT_ID>"],
  };
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <main className={styles.main}>
        <div className="justify-center">
          <div className={'flex flex-col mx-auto px-12 mt-12 w-fit h-fit justify-center'}>
          <Image
            className="px-2 mt-32 justify-center"
            src={goonsPic}
          ></Image>
          </div>
          <div className="flex flex-col sm:content-start justify-self-end w-screen text-right">
            <MintCardComponent></MintCardComponent>
          </div>
        </div>
      </main>

      <FooterComponent></FooterComponent>
    </>
  );
};

export default NFTMint;
