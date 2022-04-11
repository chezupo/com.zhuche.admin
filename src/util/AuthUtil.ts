import Cookies from "js-cookie";
import {AccessTokenInfoType} from "@/api/Authroization";
import store from "@/store";
import {RoleType} from "@/store/modules/me";

const accessTokenKey = 'accessToken';

type CookiesAccessTokenType = {username: string} & AccessTokenInfoType
const setAccessToken = (accessTokenInfo: CookiesAccessTokenType): void => {
  const expiredAt = new Date(Date.now() + accessTokenInfo.expiration)
  const days: number = (expiredAt.getTime() - Date.now() ) / 1000 / 60 / 60 / 24
  Cookies.set(accessTokenKey,JSON.stringify(accessTokenInfo), {expires: days} )
}

const getAccessToken = (): CookiesAccessTokenType | null => {
  const accessTokenJson = Cookies.get(accessTokenKey)
  if (accessTokenJson) {
    return JSON.parse(accessTokenJson) as CookiesAccessTokenType
  }

  return null
}

const resetAccessToken =  (): void => {
  Cookies.remove(accessTokenKey)
}

const isAdmin = (): boolean => {
  const myRoles: RoleType[] = store.getState().me.roles;

  return myRoles.includes(RoleType.ROLE_ADMIN)
}

export {
  resetAccessToken,
  getAccessToken,
  setAccessToken,
  isAdmin
}

