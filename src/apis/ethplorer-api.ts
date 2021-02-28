import axios from "axios";
import { get, orderBy } from "lodash";
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
  const eth = get(data, "data.ETH", null);
  const erc20s = get(data, "data.tokens", []);
  const filteredErc20s = erc20s.filter((token: any) => token.tokenInfo.price);
  const orderedErc20s = orderBy(filteredErc20s, ["tokenInfo.symbol"], ["asc"]);
  const checksumErc20s = orderedErc20s.map((token: any) => ({
    ...token,
    tokenInfo: {
      ...token.tokenInfo,
      address: ethers.utils.getAddress(token.tokenInfo.address),
    },
  }));
  return [eth, checksumErc20s];
};
