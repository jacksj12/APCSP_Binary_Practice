export const decimalToBinary = (dec: number, bits: number): string => {
  return dec.toString(2).padStart(bits, '0');
};

export const binaryToDecimal = (bin: string): number => {
  return parseInt(bin, 2);
};

export const generateRandomNumber = (bits: number): number => {
  const max = 2 ** bits - 1;
  return Math.floor(Math.random() * (max + 1));
};
