import React from "react";
import styled from "styled-components";

const Card = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  font-size: 0.9em;
  flex-wrap: wrap;
  cursor: pointer;
  overflow: hidden;
  justify-content: flex-start;
  align-items: flex-start;
  &:hover {
    opacity: 0.7;
  }
  transition: opacity 200ms ease;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 20px;
`;

const NFTCardBody = styled.div`
  width: 100%;
  padding: 10px 10px 20px 10px;
  max-width: 250px;
  text-align: left;
`;

const NFTImg = styled.div<{ imageUrl: string }>`
  background-image: ${(p) => `url(${p.imageUrl})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 250px;
  width: 250px;
  // border-radius: 5px;
  background-color: #f0f0f0;
`;

const NFTTitle = styled.p`
  max-width: 100%;
  font-weight: 500;
  margin: 0;
  font-size: 1em;
  color: #000;
`;

const NFTSubtitle = styled.p`
  max-width: 100%;
  font-weight: 500;
  margin: 0;
  margin-top: 5px;
  color: #a5afbe;
  font-size: 0.8rem;
`;

interface Props {
  nft: any;
  handleNFTClick: (nft: any) => void;
}

const NFTCard: React.FC<Props> = ({ nft, handleNFTClick }) => {
  const openDetails = () => {
    handleNFTClick(nft);
  };
  return (
    <Card>
      <NFTImg imageUrl={nft.image_preview_url} onClick={openDetails} />
      <NFTCardBody>
        <NFTTitle onClick={openDetails}>{nft.name}</NFTTitle>
        <NFTSubtitle>{nft.asset_contract.name}</NFTSubtitle>
      </NFTCardBody>
    </Card>
  );
};

export default NFTCard;
