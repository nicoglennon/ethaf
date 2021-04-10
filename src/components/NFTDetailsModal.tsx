import React from "react";
import styled from "styled-components";
import ReactImageFallback from "react-image-fallback";
import { X } from "react-feather";
import Modal from "./Modal";
import TraitPill from "./TraitPill";
import Trail from "./Trail";
import { Link } from "react-feather";
import FallbackImage from "../assets/monocle.png";

const NFTImg = styled.img`
  width: 100%;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 10px;
  background-color: #ccd9db;
  margin-bottom: 20px;
`;

const NFTDetailsContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  overflow-wrap: break-word;
`;

const NFTTitle = styled.p`
  max-width: 100%;
  font-weight: 500;
  margin: 0;
  font-size: 1.8em;
  color: #000;
`;

const NFTSubtitle = styled.p`
  max-width: 100%;
  font-weight: 500;
  margin: 0;
  color: #3c42528c;
  font-size: 1.2rem;
  word-break: break-word;
`;

const NFTDetailsInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const NFTContractDetailsInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const NFTDescription = styled.div`
  max-width: 100%;
  flex-wrap: wrap;
  color: #3c42528c;
  font-size: 1.1rem;
  margin-bottom: 10px;
`;

const CloseButton = styled.div`
  width: max-content;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 10px;
  background-color: #eee;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
  transition: background-color 200ms ease;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ContractImgWrapper = styled.div`
  border-radius: 50%;
  width: max-content;
  overflow: hidden;
  height: 40px;
  width: 40px;
`;

const NFTContractDetailsTitle = styled.div`
  font-weight: 500;
  font-size: 1.2rem;
  color: #000;
  margin-bottom: 10px;
`;

const NFTTraitsWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const Separator = styled.hr`
  border: 1px solid #eee;
  width: 100%;
  margin-bottom: 20px;
`;
const LinksSection = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const CollectionExternalLink = styled.a`
  font-weight: 500;
  color: #000;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 0.7;
  }
`;

interface Props {
  nft: any;
  closeModal: () => void;
}
const NFTDetailsModal: React.FC<Props> = ({ nft, closeModal }) => {
  const { asset_contract: contract, traits, id: nftId } = nft;
  const shortenedId = nftId.length > 12 ? nftId.substr(0, 12) + "…" : nftId;
  return (
    <Modal closeModal={closeModal}>
      <Trail>
        <ModalHeader>
          <ContractImgWrapper>
            <ReactImageFallback
              src={contract.image_url}
              fallbackImage={FallbackImage}
              alt={contract.name}
              style={{ width: 40, height: 40 }}
            />
          </ContractImgWrapper>
          <CloseButton onClick={closeModal}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>
        <NFTDetailsContent>
          <NFTImg src={nft.image_url} />
          <NFTDetailsInfo>
            <div style={{ marginBottom: 10 }}>
              <NFTSubtitle>
                {contract.name} #{shortenedId}
              </NFTSubtitle>
              <NFTTitle>{nft.name}</NFTTitle>
            </div>
            {nft.description && (
              <NFTDescription>{nft.description}</NFTDescription>
            )}
            {traits.length > 0 && (
              <NFTTraitsWrapper>
                {traits.map((trait: any, index: number) => (
                  <TraitPill trait={trait} key={index} />
                ))}
              </NFTTraitsWrapper>
            )}
          </NFTDetailsInfo>
          {contract.description && (
            <>
              <Separator />
              <NFTContractDetailsInfo>
                <NFTContractDetailsTitle>
                  About {contract.name}
                </NFTContractDetailsTitle>
                <NFTDescription>{contract.description}</NFTDescription>
                <LinksSection>
                  <CollectionExternalLink
                    href={contract.external_link}
                    target="_blank"
                    referrerPolicy="no-referrer"
                  >
                    <span style={{ marginRight: 4 }}>Website</span>
                    <Link size={18} />
                  </CollectionExternalLink>
                </LinksSection>
              </NFTContractDetailsInfo>
            </>
          )}
        </NFTDetailsContent>
      </Trail>
    </Modal>
  );
};

export default NFTDetailsModal;
