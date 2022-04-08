import {createSlice} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "@/store";
import {updateUserPassword} from "@/api/users";

type InitialStateType = {
  list: PageType<UserType>
  loading: boolean
}
const initialState:InitialStateType = {
  list: {
    list: [],
    total: 0,
    size: 12,
    currentPage: 1
  },
  loading: false
}
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {}
})
const userReducer = userSlice.reducer

const updateUserPasswordThunk = (userId: number, password: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    await updateUserPassword(userId, password)
  }
}

export {updateUserPasswordThunk}
export default userReducer
