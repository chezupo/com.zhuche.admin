import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "@/store";
import {query2Obj} from "@wuchuhengtools/helper";
import {
  createStoreCarConfig,
  CreateStoreCarConfigQueryType,
  getStoreCarConfigs,
  GetStoreCarConfigsQueryType
} from "@/api/storeCarConfig";

type InitialStateType = {
  list: PageType<StoreCarConfigItemType>
  loading: boolean
}
const initialState: InitialStateType = {
  list: {
    size: 12,
    list: [],
    total: 0,
    currentPage: 1
  },
  loading: false
}
const storeCarConfigSlice = createSlice({
  name: 'storeCarConfig',
  initialState,
  reducers: {
    init: (state, action:PayloadAction<PageType<StoreCarConfigItemType>>): InitialStateType => {
      return {...state, list: action.payload}
    },
    save: (state, action:PayloadAction<PageType<StoreCarConfigItemType>>): InitialStateType => {
      return {...state, list: action.payload}
    },
    setLoading: (state, action: PayloadAction<boolean>): InitialStateType => {
      return {...state, loading:action.payload}
    },
  }
})
const storeCarConfigReducer = storeCarConfigSlice.reducer

const initThunk = () => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    dispatch(setLoading(true))
    const {currentPage, size} = getState().storeCarConfig.list
    const {search} = document.location
    const queryObj = query2Obj(search)
    const query: GetStoreCarConfigsQueryType = {
      page: parseInt(queryObj.page ) || currentPage,
      size: parseInt(queryObj.size) || size,
      ...(queryObj.name ? {name: queryObj.name} : {})
    }
    try {
      const newStoreCarConfig = await getStoreCarConfigs(query)
      dispatch(init(newStoreCarConfig))
    }finally {
      dispatch( setLoading(false) )
    }
  }
}

const getStoreCarConfigsThunk = () => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    dispatch(setLoading(true))
    const {currentPage, size} = getState().storeCarConfig.list
    const {search} = document.location
    const queryObj = query2Obj(search)
    const query: GetStoreCarConfigsQueryType = {
      page: parseInt(queryObj.page ) || currentPage,
      size: parseInt(queryObj.size) || size,
      ...(queryObj.name ? {name: queryObj.name} : {})
    }
    try {
      const newStoreCarConfig = await getStoreCarConfigs(query)
      dispatch(save(newStoreCarConfig))
    }finally {
      dispatch( setLoading(false) )
    }
  }
}

const createStoreCarConfigThunk = (data: CreateStoreCarConfigQueryType) => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    dispatch(setLoading(true))
    try {
      await createStoreCarConfig(data)
      await dispatch(getStoreCarConfigsThunk())
    }finally {
      dispatch(setLoading(false))
    }
  }
}

export const {init, setLoading, save} = storeCarConfigSlice.actions
export {initThunk, getStoreCarConfigsThunk, createStoreCarConfigThunk}
export default storeCarConfigReducer
