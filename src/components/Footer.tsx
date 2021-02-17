import React from "react";
import styled from "styled-components";

const InnerFooter = styled.div`
  margin: auto;
  padding: 4px 10px;
  display: inline-block;
  background-color: #fff;
  border-radius: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  position: absolute;
  bottom: 0;
`;

const LogoText = styled.div`
  display: inline-block;
  margin: 0;
  margin-right: 5px;
`;
const Footer: React.FC = () => {
  return (
    <InnerFooter>
      <LogoText>eth.af</LogoText>
    </InnerFooter>
  );
};

export default Footer;
