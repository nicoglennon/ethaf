import React from "react";
import styled from "styled-components";
import { X } from "react-feather";
import Modal from "./Modal";
import TraitPill from "./TraitPill";
import Trail from "./Trail";

const NFTImg = styled.img`
  width: 100%;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 10px;
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
  font-size: 1.5em;
  color: #000;
`;

const NFTSubtitle = styled.p`
  max-width: 100%;
  font-weight: 500;
  margin: 0;
  color: #a5afbe;
  font-size: 1rem;
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
  gap: 10px;
`;

const NFTDescription = styled.div`
  max-width: 100%;
  flex-wrap: wrap;
  color: #777;
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

interface Props {
  nft: any;
  closeModal: () => void;
}
const NFTDetailsModal: React.FC<Props> = ({ nft, closeModal }) => {
  const { asset_contract: contract, traits } = nft;
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
              <NFTSubtitle>{contract.name}</NFTSubtitle>
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
                <a href={contract.externalLink}>Link</a>
              </NFTContractDetailsInfo>
            </>
          )}
        </NFTDetailsContent>
      </Trail>
    </Modal>
  );
};

export default NFTDetailsModal;
