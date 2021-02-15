import React from "react";
import styled from "styled-components";
import NFTCard from "./NFTCard";
import Trail from "./Trail";

const ContractImgWrapper = styled.div`
  border-radius: 50%;
  width: max-content;
  overflow: hidden;
  height: 30px;
  width: 30px;
`;

const ContractImg = styled.img`
  height: 30px;
  width: 30px;
`;

const ContractPill = styled.div<{ isSelected: boolean }>`
  border: ${(p) => (p.isSelected ? "3px solid #333" : "3px solid transparent")};
  display: flex;
  font-size: 0.9em;
  font-weight: 500;
  cursor: pointer;
  width: max-content;
  padding: 5px;
  border-radius: 12px;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  &:hover {
    background-color: #f0f0f0;
  }
  &:active {
    background-color: #e0e0e0;
  }
  transition: background-color 150ms ease, border 150ms ease;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 20px;
`;
const ContractPillWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
`;

const ContractTitle = styled.p`
  margin: 5px 5px 5px 0px;
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
}

const Collections: React.FC<Props> = ({
  NFTs,
  selectedContract,
  handleContractClick,
}) => {
  return (
    <>
      <ContractPillWrapper>
        <Trail>
          {Object.keys(NFTs).map((nftKey: string) => (
            <ContractPill
              onClick={() => {
                handleContractClick(nftKey);
              }}
              isSelected={selectedContract === nftKey}
              key={nftKey}
            >
              <ContractImgWrapper>
                <ContractImg
                  src={NFTs[nftKey][0].asset_contract.image_url}
                  alt={NFTs[nftKey][0].asset_contract.name}
                />
              </ContractImgWrapper>
              <ContractTitle>
                {NFTs[nftKey][0].asset_contract.name}
              </ContractTitle>
            </ContractPill>
          ))}
        </Trail>
      </ContractPillWrapper>
      {selectedContract && (
        <>
          <h3>{selectedContract}</h3>
          <NFTsWrapper key={selectedContract}>
            <Trail>
              {NFTs[selectedContract].map((nft: any) => (
                <NFTCard nft={nft} key={nft.id} />
              ))}
            </Trail>
          </NFTsWrapper>
        </>
      )}
    </>
  );
};

export default Collections;
