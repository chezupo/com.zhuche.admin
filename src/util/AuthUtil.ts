import Cookies from "js-cookie";
import {AccessTokenInfoType} from "@/api/Authroization";

const accessTokenKey = 'accessToken';

type CookiesAccessTokenType = {username: string} & AccessTokenInfoType
export const setAccessToken = (accessTokenInfo: CookiesAccessTokenType): void => {
  const expiredAt = new Date(Date.now() + accessTokenInfo.expiration)
  const days: number = (expiredAt.getTime() - Date.now() ) / 1000 / 60 / 60 / 24
  Cookies.set(accessTokenKey,JSON.stringify(accessTokenInfo), {expires: days} )
}

export const getAccessToken = (): CookiesAccessTokenType | null => {
  const accessTokenJson = Cookies.get(accessTokenKey)
  if (accessTokenJson) {
    return JSON.parse(accessTokenJson) as CookiesAccessTokenType
  }

  return null
}

export const resetAccessToken =  (): void => {
  Cookies.remove(accessTokenKey)
}
