import jwt, { VerifyErrors } from "jsonwebtoken";
import { Profile } from "./types";

const secretKey = "your-secret-key"; //TODO: .env

// Encrypting jwt token
export const signToken = (payload: Profile): string => {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

// Decrypting jwt token
export const verifyToken = (
  token: string,
  callback: (err: VerifyErrors | null, decoded: any | undefined) => void,
): void => {
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      callback(err, undefined);
    } else {
      callback(null, decoded);
    }
  });
};
