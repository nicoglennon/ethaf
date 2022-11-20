import axios from "axios";
import { get, isNil, pick, groupBy } from "lodash";

interface Asset {
  asset_contract: any;
  background_color: string;
  token_id: string;
}

const TOKENS_LIMIT_TOTAL = 50;

const api = axios.create({
  headers: {
    Accept: "application/json",
    "X-API-KEY": "",
  },
  timeout: 20000, // 20 secs
});

const fetchAllTokens = async (
  address: string,
  offset: number
): Promise<Array<any>> => {
  const url = `https://api.opensea.io/api/v1/assets?&owner=${address}&offset=${offset}&limit=${TOKENS_LIMIT_TOTAL}`;
  const data = await api.get(url);
  const erc721s = get(data, "data.assets", null);
  if (erc721s === null) {
    return [];
  }
  if (erc721s.length < 50) {
    return erc721s;
  }
  if (erc721s.length === 50) {
    const restOfErc721s = await fetchAllTokens(address, offset + 50);
    return [...erc721s, ...restOfErc721s];
  } else {
    throw Error("opensea call issue");
  }
};

export const apiGetAccountUniqueTokens = async (address: string) => {
  try {
    const tokens = await fetchAllTokens(address, 0);
    return parseAccountUniqueTokens(tokens);
  } catch (error) {
    console.log("Error getting unique tokens", error);
    throw error;
  }
};

export const parseAccountUniqueTokens = (erc721s: any) => {
  if (isNil(erc721s)) throw new Error("Invalid data from OpenSea");
  const mappedErc721s = erc721s.map(
    ({ asset_contract, background_color, token_id, ...asset }: Asset) => ({
      ...pick(asset, [
        "animation_url",
        "current_price",
        "description",
        "external_link",
        "image_original_url",
        "image_preview_url",
        "image_thumbnail_url",
        "image_url",
        "name",
        "permalink",
        "traits",
      ]),
      asset_contract: pick(asset_contract, [
        "address",
        "description",
        "external_link",
        "featured_image_url",
        "hidden",
        "image_url",
        "name",
        "nft_version",
        "schema_name",
        "short_description",
        "symbol",
        "total_supply",
        "wiki_link",
      ]),
      background: background_color ? `#${background_color}` : null,
      familyImage: asset_contract.image_url,
      id: token_id,
      // isSendable:
      //   asset_contract.nft_version === '1.0' ||
      //   asset_contract.nft_version === '3.0' ||
      //   asset_contract.schema_name === 'ERC1155',
      // lastPrice: asset.last_sale ? Number(asset.last_sale.total_price) : null,
      // type: AssetTypes.nft,
      uniqueId: `${get(asset_contract, "address")}_${token_id}`,
    })
  );
  return groupBy(mappedErc721s, "asset_contract.name");
};
