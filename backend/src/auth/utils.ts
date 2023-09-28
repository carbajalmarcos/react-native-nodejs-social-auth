import { ReqUser } from "src/types";
import { signToken } from "./jwtUtils";
import { Profile } from "./types";

export const missingEnvVars = (origin: string) => {
  throw new Error(`missing env vars for ${origin} feature`);
};

export const formatEntityData = (profile: Profile) => {
  return {
    firstName: profile.given_name,
    lastName: profile.family_name,
    email: profile.email,
    picture: profile.picture,
  };
};


export const getAccessToken = (profile: Profile) =>{
  const accessToken =  signToken(profile)
  return { accessToken };
}
