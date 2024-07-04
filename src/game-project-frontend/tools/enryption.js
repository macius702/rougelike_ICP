import CryptoJS from "crypto-js";

export const encryptString = (text, secretKey) => {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};

export const decryptString = (ciphertext, secretKey) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
