import React from "react";
import styled from "styled-components";
import { Link } from "react-scroll";

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

const Pill = styled.div<{ isSelected: boolean }>`
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
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 10px;
`;
const ContractTitle = styled.p`
  margin: 5px 5px 5px 0px;
`;

interface Props {
  contractKey: string;
  contractObj: any;
  isSelected: boolean;
  handleContractClick: (contractKey: string) => void;
}
const ContractPill: React.FC<Props> = ({
  contractKey,
  contractObj,
  isSelected,
  handleContractClick,
}) => {
  return (
    <Link
      to="contractTitleScroll"
      // spy={true}
      smooth={true}
      offset={-70}
      duration={500}
    >
      <Pill
        onClick={() => {
          handleContractClick(contractKey);
        }}
        isSelected={isSelected}
      >
        <ContractImgWrapper>
          <ContractImg src={contractObj.image_url} alt={contractObj.name} />
        </ContractImgWrapper>
        <ContractTitle>{contractObj.name}</ContractTitle>
      </Pill>
    </Link>
  );
};

export default ContractPill;
