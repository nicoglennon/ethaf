import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ethers } from "ethers";
import styled from "styled-components";
import CategoriesMenu from "./CategoriesMenu";
import WalletHeader from "./WalletHeader";
import Collections from "./Collections";
import TokenList from "./TokenList";
import Trail from "./Trail";
import FadeIn from "./FadeIn";
import Spinner from "./Spinner/Spinner";
import NFTDetailsModal from "./NFTDetailsModal";
import { apiGetAccountUniqueTokens } from "../apis/opensea-api";
import { apiGetERC20Tokens } from "../apis/ethplorer-api";
import { Categories } from "../helpers/constants";
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
  initialContract: string;
  initialNft: string;
}

const WalletWrapper = styled.div``;

const Wallet: React.FC<Props> = () => {
  const { walletParam, initialContract } = useParams<Params>();
  const history = useHistory();

  const [walletId, setWalletId] = useState<string>("");
  const [ensAddress, setEnsAddress] = useState<string>();
  const [ethBalance, setEthBalance] = useState<string>("-");
  const [ethPrice, setEthPrice] = useState(0);
  const [NFTs, setNFTs] = useState<object>();
  const [tokens, setTokens] = useState<Array<object>>();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    Categories.COLLECTIONS
  );
  const [selectedContract, setSelectedContract] = useState<string>();
  const [loadingNFTs, setLoadingNFTs] = useState<boolean>(true);
  const [loadingTokens, setLoadingTokens] = useState<boolean>(true);
  const [loadingWalletHeader, setLoadingWalletHeader] = useState(true);
  const [selectedNFTDetail, setSelectedNFTDetail] = useState<any>();

  useEffect(() => {
    const getWeb3 = async () => {
      let addressParam;

      const provider = new ethers.providers.InfuraProvider(
        1,
        process.env.REACT_APP_INFURA_ID
      );

      if (walletParam.length === 42) {
        setWalletId(walletParam);
        addressParam = walletParam;
        const ensAddy = await provider.lookupAddress(addressParam);
        setEnsAddress(ensAddy);
      } else {
        addressParam = walletParam + ".eth";
        const walletAddress = await provider.resolveName(addressParam);
        setWalletId(walletAddress);
        setEnsAddress(addressParam);
      }

      setLoadingWalletHeader(false);
    };
    getWeb3();
  }, [walletParam]);

  useEffect(() => {
    const getNFTs = async (wId: string) => {
      const nfts = await apiGetAccountUniqueTokens(wId);
      setNFTs(nfts);
      setLoadingNFTs(false);
    };

    const getERC20s = async (wId: string) => {
      const [eth, tokens] = await apiGetERC20Tokens(wId);
      setEthPrice(eth.price.rate);
      setEthBalance(Number(eth.balance).toFixed(5).toString());
      setTokens(tokens);
      setLoadingTokens(false);
    };
    if (walletId) {
      getNFTs(walletId);
      getERC20s(walletId);
    }
  }, [walletId, initialContract, selectedContract]);

  useEffect(() => {
    if (selectedContract || !initialContract) { return }

    setSelectedCategory(Categories.COLLECTIONS);
    setSelectedContract(initialContract);
  }, [NFTs, initialContract, selectedContract]);

  const handleContractClick = (contractName: string): void => {
    setSelectedContract(contractName);
    history.push(`/${walletParam}/${contractName}`);
  };

  const handleSelectCategory = (newCategory: string): void => {
    setSelectedCategory(newCategory);
    setSelectedContract(undefined);
    history.push(`/${walletParam}`)
  };

  const handleNFTClick = (nftObj: any) => {
    setSelectedNFTDetail(nftObj);
  };

  if (!loadingWalletHeader && !walletId) {
    return (
      <Trail>
        <p>Nothing at this address.</p>
        <Link to="/">
          <p style={{ fontWeight: 700 }}>Try again?</p>
        </Link>
      </Trail>
    );
  }
  return (
    <WalletWrapper>
      <>
        <Helmet>
          {/* <title>{ensAddress || "eth.af"}</title>
          <meta name="twitter:title" content={ensAddress || "eth.af"} />
          <meta property="og:title" content={ensAddress || "eth.af"} /> */}
          <title>{ensAddress || "eth.af"}</title>
          <meta name="twitter:title" content={ensAddress || "eth.af"} />
          <meta property="og:title" content={ensAddress || "eth.af"} />
        </Helmet>
        {loadingWalletHeader || loadingTokens ? (
          <div>
            <br />
            <Trail>
              <Spinner />
            </Trail>
          </div>
        ) : (
          <>
            <WalletHeader
              walletId={walletId}
              ensAddress={ensAddress}
              ethBalance={ethBalance}
            />

            <CategoriesMenu
              selectedCategory={selectedCategory}
              handleSelectCategory={handleSelectCategory}
            />
            {selectedCategory === Categories.COLLECTIONS && (
              <>
                {loadingNFTs || !NFTs ? (
                  <Trail>
                    <Spinner />
                  </Trail>
                ) : (
                  <Collections
                    NFTs={NFTs}
                    selectedContract={selectedContract || initialContract}
                    handleContractClick={handleContractClick}
                    handleNFTClick={handleNFTClick}
                  />
                )}
                {selectedNFTDetail && (
                  <FadeIn>
                    <NFTDetailsModal
                      nft={selectedNFTDetail}
                      closeModal={() => {
                        setSelectedNFTDetail(null);
                      }}
                    />
                  </FadeIn>
                )}
              </>
            )}
            {selectedCategory === Categories.TOKENS && (
              <>
                {loadingTokens || !tokens ? (
                  <Trail>
                    <Spinner />
                  </Trail>
                ) : (
                  <TokenList
                    tokens={tokens}
                    ethBalance={ethBalance}
                    ethPrice={ethPrice}
                  />
                )}
              </>
            )}
          </>
        )}
      </>
    </WalletWrapper>
  );
};

export default Wallet;
