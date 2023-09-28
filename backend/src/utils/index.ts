import { ReqUser } from "src/types";

export const getCallBackUrl = (user: ReqUser) => {
  return `${process.env.REDIRECT_URL_MOBILE}?firstName=${user.firstName}/lastName=${user.lastName}/email=${user.email}`;
};
