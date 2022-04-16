import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppDispatch, RootState} from '@/store'
import {createToken} from "@/api/Authroization";
import {getAccessToken, resetAccessToken, setAccessToken} from "@/util/AuthUtil";

export type MeType = {
  isLogin: boolean;
  accessToken: string;
  expiredAt: string;
  username: string
  roles: RoleType[]
}
const cookiesAccessToken = getAccessToken()
const initialState: MeType = {
  isLogin: !!cookiesAccessToken,
  accessToken: cookiesAccessToken ? cookiesAccessToken.accessToken : '',
  expiredAt: cookiesAccessToken ? cookiesAccessToken.expiration + '' : '',
  username: cookiesAccessToken ? cookiesAccessToken.username : '',
  roles: cookiesAccessToken ? cookiesAccessToken.roles : []
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
    const {accessToken, expiration, roles, tokenType} = await createToken({username, password })
    setAccessToken({accessToken,expiration, roles, tokenType, username})
    const me: MeType = {
      isLogin: true,
      accessToken: accessToken,
      expiredAt:expiration + '',
      username: username,
      roles: roles
    }
    dispatch(login(me))
  }
}
export const {login, logout} = meSlice.actions

export default meSlice.reducer

// 登出
export const logoutThunk = ()=> {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void>  => {
    resetAccessToken()
    dispatch(logout(initialState))
  }
}

