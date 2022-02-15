import Cookies from 'js-cookie'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '@/store'
import {createToken} from "@/api/Authroization";
import {getAccessTokenExpiredAt, setAccessToken} from "@/util/AuthUtil";

export type MeType = {
  isLogin: boolean;
  accessToken: string;
  expiredAt: string;
}
const accessTokenKey = 'accessToken';
const accessTokenExpiredAt = 'accessTokenExpiredAt'
const initialState: MeType = {
  isLogin: false,
  accessToken:  Cookies.get(accessTokenKey) ? Cookies.get(accessTokenKey) as string : '',
  expiredAt: Cookies.get(accessTokenExpiredAt) ? Cookies.get(accessTokenExpiredAt) as string : ''
}
export const meSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<MeType>) => {
      return action.payload
    },
  },
})

export const isLogin = (): boolean => !!Cookies.get(accessTokenKey)

// 登录操作
export const loginThunk = (username: string, password: string)=> {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void>  => {
    const {accessToken, expiration} = await createToken({username, password })
    const expiredAt = new Date(Date.now() + expiration)
    setAccessToken(accessToken, expiredAt)
    const me: MeType = {
      isLogin: true,
      accessToken: accessToken,
      expiredAt:getAccessTokenExpiredAt()
    }
    dispatch(login(me))
  }
}
export const {login} = meSlice.actions

export default meSlice.reducer
