import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppDispatch, RootState} from '@/store'
import {createToken} from "@/api/Authroization";
import {
  getAccessToken,
  getAccessTokenExpiredAt,
  getUsername,
  resetAccessToken, resetUsername,
  setAccessToken,
  setUsername
} from "@/util/AuthUtil";

export type MeType = {
  isLogin: boolean;
  accessToken: string;
  expiredAt: string;
  username: string
}
const initialState: MeType = {
  isLogin: !!getAccessToken(),
  accessToken: getAccessToken(),
  expiredAt: getAccessTokenExpiredAt(),
  username: getUsername()
}
export const meSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<MeType>) => {
      return action.payload
    },
    logout: (state, action: PayloadAction<MeType>) => {
      return action.payload
    },
  },
})


// 登录操作
export const loginThunk = (username: string, password: string)=> {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void>  => {
    const {accessToken, expiration} = await createToken({username, password })
    const expiredAt = new Date(Date.now() + expiration)
    setAccessToken(accessToken, expiredAt)
    setUsername(username)
    const me: MeType = {
      isLogin: true,
      accessToken: accessToken,
      expiredAt:getAccessTokenExpiredAt(),
      username: username
    }
    dispatch(login(me))
  }
}
export const {login, logout} = meSlice.actions

export default meSlice.reducer

// 登出
export const logoutThunk = ()=> {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void>  => {
    resetUsername()
    resetAccessToken()
    dispatch(logout(initialState))
  }
}

