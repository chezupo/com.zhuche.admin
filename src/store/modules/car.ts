import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "@/store";
import {createCar, CreateQueryType, fetchCars} from "@/api/car";
import {getPageQuery} from "@/util/paginationUtil";

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
    setLoading: (state, action: PayloadAction<boolean>): InitialStateType => ({...state, loading: action.payload}),
    init: (state, action: PayloadAction<PageType<CarItemType>>): InitialStateType => {
      return {...state, list: action.payload}
    },
    save: (state, action: PayloadAction<PageType<CarItemType>>): InitialStateType => {
      return {...state, list: action.payload}
    },

  }
})

const carReducer = carSlice.reducer

const createCarHunk = (requestData: CreateQueryType) => {
  return async (dispatch: AppDispatch, getState: () => RootState):Promise<void> => {
    dispatch(setLoading(true))
    try {
      await createCar(requestData)
      await dispatch(fetchThunk())
    }finally {
      dispatch(setLoading(false))
    }
  }
}

const fetchThunk = () => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    dispatch(setLoading(true))
    try {
      const {currentPage, size} =  getState().cars.list
      const queryData = getPageQuery(currentPage, size)
      const pageData = await fetchCars(queryData);
      dispatch(save(pageData))
    }finally {
      dispatch(setLoading(false))
    }
  }
}

const initThunk = () => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    dispatch(setLoading(true))
    try {
      const {currentPage, size} =  getState().cars.list
      const queryData = getPageQuery(currentPage, size)
      const pageData = await fetchCars(queryData);
      dispatch(init(pageData))
    }finally {
      dispatch(setLoading(false))
    }
  }
}

export const {setLoading, init, save} = carSlice.actions
export {createCarHunk, initThunk, fetchThunk}
export default carReducer
