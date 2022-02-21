import Cookies from "js-cookie";

const accessTokenKey = 'accessToken';
const accessTokenExpiredAtKey = 'accessTokenExpiredAt'

export const getAccessToken = (): string => {
  const accessTokenExpiredAt = Cookies.get(accessTokenKey) as string;

  return accessTokenExpiredAt ? accessTokenExpiredAt : '';
}

export const getAccessTokenExpiredAt = (): string => {
  const accessTokenExpiredAt = Cookies.get(accessTokenExpiredAtKey) as string

  return accessTokenExpiredAt ? accessTokenExpiredAt : ''
}

const usernameKey = 'username'
export const setUsername = (username: string) => {
  Cookies.set(usernameKey, username)
}

export const getUsername = (): string => {
  const username =  Cookies.get(usernameKey)

  return username ? username : ''
}
export const resetUsername = () => {
  Cookies.remove(usernameKey)
}

export const setAccessToken = (accessToken: string, expiredAt: Date): void => {
  const days: number = (expiredAt.getTime() - Date.now() ) / 1000 / 60 / 60 / 24
  Cookies.set(accessTokenExpiredAtKey, expiredAt.toTimeString(), {expires: days})
  Cookies.set(accessTokenKey, accessToken, {expires: days} )
}

export const resetAccessToken =  (): void => {
  Cookies.remove(accessTokenKey)
  Cookies.remove(accessTokenExpiredAtKey)
}






