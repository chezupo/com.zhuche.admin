import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppDispatch, RootState} from '@/store'
import {createToken} from "@/api/Authroization";
import {getAccessToken, getAccessTokenExpiredAt, setAccessToken} from "@/util/AuthUtil";

export type MeType = {
  isLogin: boolean;
  accessToken: string;
  expiredAt: string;
}
const initialState: MeType = {
  isLogin: !!getAccessToken(),
  accessToken: getAccessToken(),
  expiredAt: getAccessTokenExpiredAt(),
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
