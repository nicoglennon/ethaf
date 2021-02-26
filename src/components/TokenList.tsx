import React from "react";
import TokenLine from "./TokenLine";
import styled from "styled-components";
import Trail from "./Trail";
import EthTokenLine from "./EthTokenLine";

const TokenLineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 10px;
  max-width: 600px;
  margin: auto;
`;

interface Props {
  tokens: Array<any>;
  ethBalance: string;
  ethPrice: number;
}

const TokenList: React.FC<Props> = ({ tokens, ethBalance, ethPrice }) => {
  return (
    <Trail>
      <TokenLineWrapper>
        <EthTokenLine amount={ethBalance} price={ethPrice} />
        {tokens.map((token) => (
          <TokenLine token={token} key={token.tokenInfo.address} />
        ))}
      </TokenLineWrapper>
    </Trail>
  );
};

export default TokenList;
