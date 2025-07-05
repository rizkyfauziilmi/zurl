const BASE64_URLSAFE_ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

/**
 * Encodes a non-negative integer (auto-increment ID) to a Base64 URL-safe string.
 * @param num The number to encode.
 * @returns The Base64 URL-safe encoded string.
 */
export function encodeBase64Id(num: number): string {
  if (!Number.isInteger(num) || num < 0) {
    throw new Error("Input must be a non-negative integer");
  }
  if (num === 0) return BASE64_URLSAFE_ALPHABET.charAt(0);
  let encoded = "";
  while (num > 0) {
    const remainder = num % 64;
    encoded = BASE64_URLSAFE_ALPHABET.charAt(remainder) + encoded;
    num = Math.floor(num / 64);
  }
  return encoded;
}

/**
 * Decodes a Base64 URL-safe string back to a non-negative integer (auto-increment ID).
 * @param str The Base64 URL-safe encoded string.
 * @returns The decoded number.
 */
export function decodeBase64(str: string): number {
  if (typeof str !== "string" || str.length === 0) {
    throw new Error("Input must be a non-empty string");
  }
  let decoded = 0;
  for (const char of str) {
    const index = BASE64_URLSAFE_ALPHABET.indexOf(char);
    if (index === -1) {
      throw new Error(`Invalid character '${char}' in Base64 URL-safe string`);
    }
    decoded = decoded * 64 + index;
  }
  return decoded;
}
