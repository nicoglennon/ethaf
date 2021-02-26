import axios from "axios";
import { get } from "lodash";
import { ethers } from "ethers";
// import { tokenToString } from "typescript";

// interface Asset {
//   asset_contract: any;
//   background_color: string;
//   token_id: string;
// }

const api = axios.create({
  headers: {
    Accept: "application/json",
  },
  timeout: 20000, // 20 secs
});

export const apiGetERC20Tokens = async (address: string) => {
  const url = `https://api.ethplorer.io/getAddressInfo/${address}?apiKey=${process.env.REACT_APP_ETHPLORER_KEY}`;
  const data = await api.get(url);
  console.log(data);
  const eth = get(data, "data.ETH", null);
  const erc721s = get(data, "data.tokens", null);
  const filteredErc721s = erc721s.filter((token: any) => token.tokenInfo.price);
  const checksumErc721s = filteredErc721s.map((token: any) => ({
    ...token,
    tokenInfo: {
      ...token.tokenInfo,
      address: ethers.utils.getAddress(token.tokenInfo.address),
    },
  }));
  return [eth, checksumErc721s];
};
