import React from "react";
import styled from "styled-components";
import NFTCard from "./NFTCard";
import ContractPill from "./ContractPill";
import Trail from "./Trail";

const ContractPillWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  justify-content: center;
`;

const NFTsWrapper = styled.div`
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  align-items: flex-start;
  justify-content: center;
`;

const NoCollectionsMessage = styled.div`
  opacity: 0.5;
  font-size: 1.1rem;
  margin-top: 10px;
`;

interface Props {
  NFTs?: any;
  selectedContract: string | undefined;
  handleContractClick: (nftKey: string) => void;
  handleNFTClick: (nft: any) => void;
}

const Collections: React.FC<Props> = ({
  NFTs,
  selectedContract,
  handleContractClick,
  handleNFTClick,
}) => {
  const nftKeys = Object.keys(NFTs);
  nftKeys.sort();
  return (
    <>
      <ContractPillWrapper>
        <Trail>
          {nftKeys.length > 0 ? (
            nftKeys.map((nftKey: string) => (
              <ContractPill
                key={nftKey}
                contractKey={nftKey}
                contractObj={NFTs[nftKey][0].asset_contract}
                isSelected={selectedContract === nftKey}
                handleContractClick={handleContractClick}
              />
            ))
          ) : (
            <NoCollectionsMessage>No collections yet.</NoCollectionsMessage>
          )}
        </Trail>
      </ContractPillWrapper>
      <div
        id="contractTitleScroll"
        style={{ margin: 10, height: 10, width: "100%" }}
      />
      {selectedContract && (
        <>
          <Trail key={selectedContract}>
            <NFTsWrapper>
              {NFTs[selectedContract].map((nft: any) => (
                <NFTCard
                  nft={nft}
                  key={nft.id}
                  handleNFTClick={handleNFTClick}
                />
              ))}
            </NFTsWrapper>
          </Trail>
        </>
      )}
    </>
  );
};

export default Collections;
