import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "@/store";
import {query2Obj} from "@wuchuhengtools/helper";
import {getLogs} from "@/api/log";

type InitialStateType = {
  list: PageType<LogItemType>
  loading: boolean

}
const initialState:InitialStateType = {
  list: {
    currentPage: 1,
    size: 12,
    list: [],
    total: 0
  },
  loading: false
}
const logSlice = createSlice({
  name: 'log',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>): InitialStateType => {
      return {...state, loading: action.payload}
    },
    init: (state, action: PayloadAction<PageType<LogItemType>>): InitialStateType => {
      return { ...state, list: action.payload }
    },
    save: (state, action: PayloadAction<PageType<LogItemType>>): InitialStateType => {
      return { ...state, list: action.payload }
    },

  }
})

const initThunk = () => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    const search = query2Obj(document.location.search)
    dispatch(setLoading(true))
    try {
      const {currentPage, size}  = getState().log.list
      const pageDate = await getLogs({
        page: parseInt(search?.page) || currentPage,
        size:parseInt(search?.size) || size
      })
      dispatch(init(pageDate))
    }finally {
      dispatch(setLoading(false))
    }
  }
}

const getLogsThunk = () => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    const search = query2Obj(document.location.search)
    dispatch(setLoading(true))
    try {
      const {currentPage, size}  = getState().log.list
      const pageDate = await getLogs({
        page: parseInt(search?.page) || currentPage,
        size:parseInt(search?.size) || size
      })
      dispatch(save(pageDate))
    }finally {
      dispatch(setLoading(false))
    }
  }
}

const logReducer = logSlice.reducer

export const {setLoading, save, init} = logSlice.actions
export {initThunk, getLogsThunk}
export default logReducer
