import axios from "axios";
import { get, orderBy } from "lodash";
import { ethers } from "ethers";


const api = axios.create({
  headers: {
    Accept: "application/json",
  },
  timeout: 20000, // 20 secs
});

const api_key = '96e0cc51-a62e-42ca-acee-910ea7d2a241';  // freely usable key
const network = 'polygon';

export const apiGetPolygonTokens = async (address: string) => {
  const url = `https://api.zapper.fi/v1/protocols/tokens/balances?addresses%5B%5D=${address}&network=${network}&api_key=${api_key}`
  const data = await api.get(url);
  const erc20s = get(data, `data.${address.toLowerCase()}.products[0].assets`, []);
  const filteredErc20s = erc20s.filter((token: any) => token.price);
  const orderedErc20s = orderBy(filteredErc20s, ["symbol"], ["asc"]);
  const checksumErc20s = orderedErc20s.map((token: any) => ({
    tokenInfo: {
      symbol: token.symbol,
      name: token.label,
      price: {
        rate: token.price,
      },
      decimals: token.decimals,
      address: ethers.utils.getAddress(token.address),
      imageUrl: `https://storage.googleapis.com/zapper-fi-assets/tokens/polygon/${ethers.utils.getAddress(token.address).toLowerCase()}.png`,
    },
    balance: token.balance * 10**token.decimals,
  }));
  return checksumErc20s;
};
