import React from "react";
import styled from "styled-components";
const PillWrapper = styled.div`
  padding: 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  background-color: #eee;
  border-radius: 12px;
  width: max-content;
  color: #333;
`;

const TraitType = styled.div`
  font-size: 0.6rem;
  text-transform: uppercase;
  //   font-weight: 700;
`;

const TraitValue = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
`;

interface Props {
  trait: any;
}
const TraitPill: React.FC<Props> = ({ trait }) => {
  const { trait_type: type, value } = trait;
  return (
    <PillWrapper>
      <TraitType>{type}</TraitType>
      <TraitValue>{value}</TraitValue>
    </PillWrapper>
  );
};

export default TraitPill;
