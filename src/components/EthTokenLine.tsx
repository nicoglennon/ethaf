import React from "react";
import styled from "styled-components";
import { dollarFormatter } from "../helpers/utils";

const TokenSection = styled.div`
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-radius: 10px;
  &:hover {
    background-color: #f0f0f0;
  }
  &:active {
    background-color: #e9e9e9;
  }
  transition: background-color 200ms ease;
  cursor: pointer;
  text-align: left;
`;

const TokenNameAndLogo = styled.div`
  display: flex;
  align-items: center;
`;

const TokenLogo = styled.img`
  margin-right: 8px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 10px;
`;

const TokenSymbolAndName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TokenName = styled.p`
  margin: 0;
  color: #999;
`;

const TokenSymbol = styled.p`
  font-weight: 500;
  margin: 0;
  font-size: 1.1rem;
`;

const TokenAmount = styled.p`
  font-weight: 500;
  font-size: 1.1rem;

  margin: 0;
`;

const TokenValue = styled.p`
  margin: 0;
  color: #999;
`;

const TokenAmountAndValue = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

interface Props {
  price: number;
  amount: string;
}

const EthTokenLine: React.FC<Props> = ({ price, amount }) => {
  const tokenTotalValue = dollarFormatter.format(price * Number(amount));
  const openTokenLink = () => {
    window.open(`https://coinmarketcap.com/currencies/ethereum/`, "_blank"); //to open ne
  };
  return (
    <TokenSection onClick={openTokenLink}>
      <TokenNameAndLogo>
        <TokenLogo
          src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png`}
        />
        <TokenSymbolAndName>
          <TokenSymbol>ETH</TokenSymbol>
          <TokenName>Ethereum</TokenName>
        </TokenSymbolAndName>
      </TokenNameAndLogo>
      <TokenAmountAndValue>
        <TokenAmount>{amount}</TokenAmount>
        <TokenValue>{tokenTotalValue}</TokenValue>
      </TokenAmountAndValue>
    </TokenSection>
  );
};

export default EthTokenLine;
