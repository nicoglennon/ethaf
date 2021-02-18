import React from "react";
import styled from "styled-components";
import NFTCard from "./NFTCard";
import ContractPill from "./ContractPill";
import Trail from "./Trail";

const ContractPillWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
`;

const NFTsWrapper = styled.div`
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
  align-items: flex-start;
  justify-content: center;
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
  return (
    <>
      <ContractPillWrapper>
        <Trail>
          {Object.keys(NFTs).map((nftKey: string) => (
            <ContractPill
              key={nftKey}
              contractKey={nftKey}
              contractObj={NFTs[nftKey][0].asset_contract}
              isSelected={selectedContract === nftKey}
              handleContractClick={handleContractClick}
            />
          ))}
        </Trail>
      </ContractPillWrapper>
      <h3 id="contractTitleScroll">{selectedContract}</h3>
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
