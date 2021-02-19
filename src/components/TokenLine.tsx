import React from "react";
import styled from "styled-components";
import { dollarFormatter, roundToDecimal } from "../helpers/utils";
interface Props {
  token: any;
}
const TokenSection = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
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
  gap: 8px;
`;

const TokenLogo = styled.img`
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

const TokenLine: React.FC<Props> = ({ token }) => {
  const {
    tokenInfo: {
      symbol: tokenSymbol,
      name: tokenName,
      decimals,
      price,
      address,
    },
    balance,
  } = token;
  const tokenAmount = roundToDecimal(balance / Math.pow(10, decimals), 3);
  console.log(token);
  const tokenPrice = price.rate;
  const tokenTotalValue = dollarFormatter.format(tokenAmount * tokenPrice);
  const openTokenLink = () => {
    window.open(`https://info.uniswap.org/token/${address}`, "_blank"); //to open ne
  };
  return (
    <TokenSection onClick={openTokenLink}>
      <TokenNameAndLogo>
        <TokenLogo
          src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`}
        />
        <TokenSymbolAndName>
          <TokenSymbol>{tokenSymbol}</TokenSymbol>
          <TokenName>{tokenName}</TokenName>
        </TokenSymbolAndName>
      </TokenNameAndLogo>
      <TokenAmountAndValue>
        <TokenAmount>{tokenAmount}</TokenAmount>
        <TokenValue>{tokenTotalValue}</TokenValue>
      </TokenAmountAndValue>
    </TokenSection>
  );
};

export default TokenLine;
