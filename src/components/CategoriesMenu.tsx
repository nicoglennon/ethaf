import React from "react";
import styled from "styled-components";
// import { Map, Package } from "react-feather";
import { Categories } from "../helpers/constants";

const CategoriesWrapper = styled.div`
  margin: 50px auto 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: #f0f0f0;
  border-radius: 15px;
  width: max-content;
  padding: 10px;
`;

const CategoryWrapper = styled.div<{ isSelected?: boolean }>`
  border-radius: 12px;
  align-items: center;
  padding: 8px 12px;
  width: max-content;
  display: flex;
  justify-content: center;
  gap: 5px;
  color: ${(p) => (p.isSelected ? "#fff" : "#777")};
  background-color: ${(p) => (p.isSelected ? "#333" : null)};
  cursor: pointer;
  box-shadow: ${(p) =>
    p.isSelected ? "rgba(0, 0, 0, 0.1) 0px 5px 10px" : null}

  &:hover {
    background-color: ${(p) => (p.isSelected ? null : "#e0e0e0")};
  }
  transition: all 400ms ease;
`;

const CategoryTitle = styled.p`
  margin: 0;
  font-weight: 500;
`;

interface Props {
  selectedCategory: string;
  handleSelectCategory: (newCategory: string) => void;
}
const CategoriesMenu: React.FC<Props> = ({
  selectedCategory,
  handleSelectCategory,
}) => {
  return (
    <CategoriesWrapper>
      <CategoryWrapper
        isSelected={selectedCategory === Categories.COLLECTIONS}
        onClick={() => {
          handleSelectCategory(Categories.COLLECTIONS);
        }}
      >
        {/* <Map strokeWidth={2} /> */}
        <CategoryTitle>Collections</CategoryTitle>
      </CategoryWrapper>
      <CategoryWrapper
        isSelected={selectedCategory === Categories.TOKENS}
        onClick={() => {
          handleSelectCategory(Categories.TOKENS);
        }}
      >
        {/* <Package strokeWidth={2} /> */}
        <CategoryTitle>Tokens</CategoryTitle>
      </CategoryWrapper>
    </CategoriesWrapper>
  );
};

export default CategoriesMenu;
