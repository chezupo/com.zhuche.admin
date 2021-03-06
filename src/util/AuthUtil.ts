import Cookies from "js-cookie";
import {AccessTokenInfoType} from "@/api/Authroization";
import store from "@/store";

const accessTokenKey = 'accessToken';
const myStoreKey = 'myStore';

type CookiesAccessTokenType = {username: string} & AccessTokenInfoType
const setAccessToken = (accessTokenInfo: CookiesAccessTokenType): void => {
  const expiredAt = new Date(Date.now() + accessTokenInfo.expiration)
  const days: number = (expiredAt.getTime() - Date.now() ) / 1000 / 60 / 60 / 24
  Cookies.set(accessTokenKey,JSON.stringify(accessTokenInfo), {expires: days} )
}

const getAccessToken = (): CookiesAccessTokenType | null => {
  const accessTokenJson = Cookies.get(accessTokenKey)
  if (accessTokenJson && accessTokenJson !== 'undefined') {
    return JSON.parse(accessTokenJson) as CookiesAccessTokenType
  }

  return null
}
const setMyStore = (value: StoreItemType): void => {
  localStorage.setItem(myStoreKey, JSON.stringify(value))
}

const getMyStore = (): StoreItemType | undefined => {
  const store = localStorage.getItem(myStoreKey)
  if (store) {
    return JSON.parse(store) as StoreItemType
  }
  return undefined
}

const resetAccessToken =  (): void => {
  Cookies.remove(accessTokenKey)
}

const isAdmin = (): boolean => {
  const myRoles: RoleType[] = store.getState().me.roles;

  return myRoles.includes('ROLE_ADMIN')
}

const isPromoter = (roles: RoleType[]) => roles.includes('ROLE_PROMOTER')

export {
  resetAccessToken,
  getAccessToken,
  setAccessToken,
  isAdmin,
  isPromoter,
  setMyStore,
  getMyStore
}

