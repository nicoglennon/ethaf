import axios from 'axios';
import { get, isNil, pick } from 'lodash';

interface Asset {
    asset_contract: any
    background_color: string
    token_id: string
}

const UNIQUE_TOKENS_LIMIT_TOTAL = 100;

const api = axios.create({
  headers: {
    Accept: 'application/json',
  },
  timeout: 20000, // 20 secs
});

export const apiGetAccountUniqueTokens = async (address: string) => {
  try {
    const url = `https://api.opensea.io/api/v1/assets?exclude_currencies=true&owner=${address}&limit=${UNIQUE_TOKENS_LIMIT_TOTAL}`;
    console.log("url: ", url);
    const data = await api.get(url);
    return parseAccountUniqueTokens(data);
  } catch (error) {
    console.log('Error getting unique tokens', error);
    throw error;
  }
};

export const parseAccountUniqueTokens = (data: any) => {
    const erc721s = get(data, 'data.assets', null);
    if (isNil(erc721s)) throw new Error('Invalid data from OpenSea');
    return erc721s.map(
      ({ asset_contract, background_color, token_id, ...asset }: Asset) => ({
        ...pick(asset, [
          'animation_url',
          'current_price',
          'description',
          'external_link',
          'image_original_url',
          'image_preview_url',
          'image_thumbnail_url',
          'image_url',
          'name',
          'permalink',
          'traits',
        ]),
        asset_contract: pick(asset_contract, [
          'address',
          'description',
          'external_link',
          'featured_image_url',
          'hidden',
          'image_url',
          'name',
          'nft_version',
          'schema_name',
          'short_description',
          'symbol',
          'total_supply',
          'wiki_link',
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
        uniqueId: `${get(asset_contract, 'address')}_${token_id}`,
      })
    );
  };