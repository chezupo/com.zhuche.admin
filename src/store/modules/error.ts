import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialStateType = {
  visitable: boolean
  message: string
}
const initialState: InitialStateType = {
  visitable: false,
  message: ''
}
const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    showError: (state, action: PayloadAction<InitialStateType>) => {
      return {...state, ...action.payload}
    },
    hideError: (state) => {
      return {...state, visitable: false}
    },
  }
})

const errorReducer = errorSlice.reducer
export default errorReducer

export const {showError, hideError} = errorSlice.actions


