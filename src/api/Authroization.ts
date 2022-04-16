import {post} from "@/util/httpClient";

export type AccessTokenInfoType = {
  accessToken: string;
  expiration: number;
  tokenType: string;
  roles: RoleType[];
}

export const createToken = async (account: {username: string; password: string}): Promise<AccessTokenInfoType> => {
  return await post<AccessTokenInfoType>('/authorization', account)
}
