import React from "react";
import styled from "styled-components";
import { X } from "react-feather";
import Modal from "./Modal";
import TraitPill from "./TraitPill";
import Trail from "./Trail";
import { ExternalLink } from "react-feather";

const NFTImg = styled.img`
  width: 100%;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 10px;
  background-color: #f0f0f0;
`;

const NFTDetailsContent = styled.div`
  display: flex;
  gap: 20px;
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
  color: #3c4252cc;
  font-size: 1.2rem;
  word-break: break-word;
`;

const NFTDetailsInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
`;

const NFTContractDetailsInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 15px;
`;

const NFTDescription = styled.div`
  max-width: 100%;
  flex-wrap: wrap;
  color: #3c4252cc;
  font-size: 1.1rem;
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
`;

const ContractImgWrapper = styled.div`
  border-radius: 50%;
  width: max-content;
  overflow: hidden;
  height: 40px;
  width: 40px;
`;

const ContractImg = styled.img`
  height: 40px;
  width: 40px;
`;

const NFTContractDetailsTitle = styled.div`
  font-weight: 500;
  font-size: 1.2rem;
  color: #000;
`;

const NFTTraitsWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;

const Separator = styled.hr`
  border: 1px solid #eee;
  width: 100%;
`;
const LinksSection = styled.div`
  display: flex;
  gap: 15px;
`;

const CollectionExternalLink = styled.a`
  font-weight: 500;
  color: #000;
  text-decoration: none;
  display: flex;
  gap: 3px;
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
  console.log(nft);
  return (
    <Modal closeModal={closeModal}>
      <Trail>
        <ModalHeader>
          <ContractImgWrapper>
            <ContractImg src={contract.image_url} alt={contract.name} />
          </ContractImgWrapper>
          <CloseButton onClick={closeModal}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>
        <NFTDetailsContent>
          <NFTImg src={nft.image_url} />
          <NFTDetailsInfo>
            <div>
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
                    <span>Website</span>
                    <ExternalLink size={18} />
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
