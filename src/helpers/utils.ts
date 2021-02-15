import { constants } from "os";

export const formatAddressShort = (address: string): string | null => {
  if (!address) {
    return null;
  }
  const startString = address.slice(0, 6);
  const endString = address.slice(address.length - 4, address.length);
  return `${startString}...${endString}`;
};

export const copyToClipBoard = async (textToCopy: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(textToCopy);
  } catch (err) {}
};

export const dollarFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const roundToDecimal = (num: number, decimalPlaces: number) =>
  Number(
    Math.round(Number(num + "e" + decimalPlaces)) + "e" + decimalPlaces * -1
  );
