import React from "react";
import styled from "styled-components";

const FloatingFooter = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  margin: 20px;
`;

const InnerFooter = styled.div`
  margin: 0;
  padding: 4px 10px;
  display: inline-block;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 20px;
  border-radius: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 1.1rem;
`;

const Emoji = styled.div`
  display: inline-block;
  margin: 0;
  font-size: 2.25rem;
  align-items: center;
`;

const LogoText = styled.div`
  display: inline-block;
  margin: 0;
  margin-right: 5px;
`;
const Footer: React.FC = () => {
  return (
    <FloatingFooter>
      <InnerFooter>
        <Emoji>🐇</Emoji>
        <LogoText>eth.af</LogoText>
      </InnerFooter>
    </FloatingFooter>
  );
};

export default Footer;
