// import { encrypt, decrypt, compare } from "n-krypta";
import CryptoJS from "crypto-js";
export const encryptionOfData = (data, key) => {
  // Convert object to JSON string
  const jsonString = JSON.stringify(data);
  // Encrypt
  const encrypted = CryptoJS.AES.encrypt(jsonString, key).toString();

  return encrypted;
};

export const decryptionOfData = (data, key) => {
  const bytes = CryptoJS.AES.decrypt(data, key);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};
