import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "@/store";
import {createCar, CreateQueryType} from "@/api/car";

type InitialStateType = {
  list: PageType<CarItemType>
  loading: boolean
}
const initialState: InitialStateType = {
  list: {
    list: [],
    currentPage: 1,
    total: 0,
    size: 12
  },
  loading: false
}
const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>): InitialStateType => ({...state, loading: action.payload})
  }
})

const carReducer = carSlice.reducer

const createCarHunk = (requestData: CreateQueryType) => {
  return async (dispatch: AppDispatch, getState: () => RootState):Promise<void> => {
    dispatch(setLoading(true))
    try {
      await createCar(requestData)
    }finally {
      dispatch(setLoading(false))
    }
  }
}

export const {setLoading} = carSlice.actions
export {createCarHunk}
export default carReducer
