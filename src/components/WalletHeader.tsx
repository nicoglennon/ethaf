import React from "react";
import styled from "styled-components";
import { Copy } from "react-feather";
import { formatAddressShort, copyToClipBoard } from "../helpers/utils";
import Trail from "./Trail";

const WalletContainer = styled.div`
  max-width: 100%;
  margin: auto;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;

const WalletLine = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 10px;
  padding: 10px 20px 15px 20px;
  border-radius: 10px;
  z-index: auto;
`;
const WalletKey = styled.p`
  padding: 8px 10px;
  margin: 0;
  border-radius: 8px;
  background-color: #eee;
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: 700;
  color: #666;
`;
const WalletValue = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  &:active {
    opacity: 0.5;
  }
`;

interface Props {
  walletId: string;
  ensAddress: string | undefined;
  ethBalance: string;
}

const WalletHeader: React.FC<Props> = ({
  walletId,
  ensAddress,
  ethBalance,
}) => {
  return (
    <>
      <WalletContainer>
        <Trail>
          <WalletLine>
            <WalletKey>Address</WalletKey>
            <WalletValue>
              <span>{formatAddressShort(walletId)}</span>
              <IconWrapper>
                <Copy
                  size={16}
                  onClick={() => copyToClipBoard(walletId)}
                  strokeWidth={2.5}
                />
              </IconWrapper>
            </WalletValue>
          </WalletLine>
          <WalletLine>
            <WalletKey>ENS</WalletKey>
            <WalletValue>{ensAddress ? ensAddress : "—"}</WalletValue>
          </WalletLine>
          <WalletLine>
            <WalletKey>Balance</WalletKey>
            <WalletValue>{ethBalance} ETH</WalletValue>
          </WalletLine>
        </Trail>
      </WalletContainer>
    </>
  );
};

export default WalletHeader;
