import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import Navbar from "./Navbar";
import { apiGetAccountUniqueTokens } from "../helpers/opensea-api";
declare global {
  interface Window {
    ethereum: any;
  }
}
interface Props {
  auth?: string;
}
interface Params {
  walletParam: string;
}

// const ContainerMain = styled.div`
//   background-color: rgb(249, 245, 241);
// `;
// const OuterMain = styled.div`
//   width: 100%;
//   position: absolute;
//   top: 50%;
//   -ms-transform: translateY(-50%);
//   transform: translateY(-50%);
// `;

// const InnerMain = styled.div`
//   margin: auto;
//   max-width: 300px;
//   min-height: 300px;
//   overflow-wrap: anywhere;
//   border-radius: 25px;
//   padding: 30px;
//   background-color: #fffefc;
//   box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.075);
// `;

const Wallet: React.FC<Props> = () => {
  const { walletParam } = useParams<Params>();
  const [walletId, setWalletId] = useState<string>("");
  const [ethBalance, setEthBalance] = useState<string>();
  const [NFTs, setNFTs] = useState([]);
  const [loadingNFTs, setLoadingNFTs] = useState(true);
  const [loadingEthBalance, setLoadingEthBalance] = useState(true);

  useEffect(() => {
    const getWeb3 = async () => {
      let addressParam;
      const provider = new ethers.providers.InfuraProvider(
        1,
        process.env.REACT_APP_INFURA_ID
      );
      console.log(walletParam);
      if (walletParam.length === 42) {
        setWalletId(walletParam);
        addressParam = walletParam;
      } else {
        addressParam = walletParam + ".eth";
        const walletAddress = await provider.resolveName(addressParam);
        setWalletId(walletAddress);
      }
      const bigNumberBalance = await provider.getBalance(addressParam);
      const balance = ethers.utils.formatEther(bigNumberBalance);
      setEthBalance(balance);
      setLoadingEthBalance(false);
    };
    getWeb3();
  }, [walletParam]);

  useEffect(() => {
    const getNFTs = async (wId: string) => {
      const tokens = await apiGetAccountUniqueTokens(wId);
      setNFTs(tokens);
      setLoadingNFTs(false);
    };
    if (walletId) {
      getNFTs(walletId);
    }
  }, [walletId]);

  return (
    <>
      <Navbar />
      <div>
        <p>url param: {walletParam}</p>
        {loadingEthBalance && loadingNFTs && NFTs ? (
          "loading..."
        ) : (
          <>
            <p>address: {walletId}</p>
            <p>balance: {ethBalance}</p>
            <p>NFTs:</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
              {NFTs.map((nft: any) => (
                <div
                  style={{
                    width: 250,
                    padding: 20,
                    backgroundColor: "#fff",
                    borderRadius: 20,
                  }}
                >
                  <p>{nft.asset_contract.name}</p>
                  <img src={nft.image_preview_url} alt={nft.name} />
                  <p>
                    <strong>{nft.name}</strong>
                  </p>
                  {/* <p>{nft.description}</p> */}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Wallet;
