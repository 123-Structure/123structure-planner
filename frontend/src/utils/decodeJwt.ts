import { IJwtPayload } from "../data/interfaces/IJwtPayload";

export const decodeJwt = (token: string | undefined) => {
  if (token === undefined) {
    return;
  }
  const payloadBase64 = token.split(".")[1];
  const payload = JSON.parse(decodeURIComponent(escape(atob(payloadBase64))));
  return payload as IJwtPayload;
};
