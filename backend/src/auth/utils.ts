import { ReqUser } from "src/types";
import { signToken } from "./jwtUtils";
import { Profile } from "./types";

export const missingEnvVars = (origin: string) => {
  throw new Error(`missing env vars for ${origin} feature`);
};

export const getAccessToken = (profile: Profile) => {
  const accessToken = signToken(profile);
  return { accessToken };
};
