import {post} from "@/util/httpClient";

type AccessTokenInfo = {
  accessToken: string;
  expiration: number;
  tokenType: string;
}

export const createToken = async (account: {username: string; password: string}): Promise<AccessTokenInfo> => {
  return await post<AccessTokenInfo>('/authorization', account)
}
