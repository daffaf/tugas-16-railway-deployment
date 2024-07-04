import { text } from 'body-parser';
import crypto from 'crypto';

export const encrypt = (key : string, plainText : string): string =>{
    const iv = crypto.randomBytes(16);
    const chiper = crypto.createCipheriv("aes-256-cbc",Buffer.from(key),iv);
    let encrypted = chiper.update(plainText)
    encrypted = Buffer.concat([encrypted,chiper.final()])
    return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
}
export const decrypt = (key : string, plainText : string):string =>{
    const textParts = plainText.split(":")
    const ivHex = textParts.shift()
    const iv = ivHex ? Buffer.from(ivHex, "hex") : Buffer.alloc(0);
    const encryptedText = Buffer.from(textParts.join(":"),"hex")
    const dechiper = crypto.createDecipheriv("aes-256-cbc",Buffer.from(key),iv)
    let decrypted = dechiper.update(encryptedText)
    decrypted = Buffer.concat([decrypted, dechiper.final()])
    return decrypted.toString()
}