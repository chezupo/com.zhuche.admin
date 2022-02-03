import Cookies from 'js-cookie'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '@/store'

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

export const loginThunk = (meInfo: MeType) => {
  return (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    const expiredAt = new Date(meInfo.expiredAt)
    const days: number = (expiredAt.getTime() - Date.now() ) / 1000 / 60 / 60 / 24
    Cookies.set(accessTokenExpiredAt, meInfo.expiredAt, {expires: days})
    Cookies.set(accessTokenKey, meInfo.accessToken, {expires: days})
    dispatch(login({...meInfo, isLogin: true}))

    return Promise.resolve()
  }
}
export const {login} = meSlice.actions

export default meSlice.reducer
