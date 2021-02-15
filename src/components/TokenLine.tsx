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
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 15px;
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
`;

const TokenAmount = styled.p`
  font-weight: 500;
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
  const tokenSymbol = token.tokenInfo.symbol;
  const tokenName = token.tokenInfo.name;
  const tokenAmount = roundToDecimal(
    token.balance / Math.pow(10, token.tokenInfo.decimals),
    3
  );
  const tokenPrice = token.tokenInfo.price.rate;
  const tokenTotalValue = dollarFormatter.format(tokenAmount * tokenPrice);
  return (
    <TokenSection>
      <TokenNameAndLogo>
        <TokenLogo
          src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${token.tokenInfo.address}/logo.png`}
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
