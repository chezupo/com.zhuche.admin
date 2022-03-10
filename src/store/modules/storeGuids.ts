import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '@/store'
import { queryStrToObject } from '@/util/helper'
import { getReturnGuids } from '@/api/storeGuids'
type InitialStateType = {
  returnGuids: PageType<StoreGuideType>
  loading: boolean
}
const initialState: InitialStateType = {
  returnGuids: {
    list: [],
    currentPage: 1,
    total: 0,
    size: 12
  },
  loading: false
}
const storeGuids = createSlice({
  name: 'storeBanner',
  initialState,
  reducers: {
    save: (state, action: PayloadAction<PageType<StoreGuideType>>) =>
      ({...state, returnGuids: action.payload}),
    setLoading: (state, action: PayloadAction<boolean>) => {
      return {...state, loading: action.payload}
    }
  }
})

const storeBannerReducer = storeGuids.reducer
export default storeBannerReducer

export const {save, setLoading} = storeGuids.actions

export const getStoreReturnGuideThunk = () => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    dispatch(setLoading(true))
    const {search} = document.location
    const queryObj = queryStrToObject(search)
    const {size, currentPage} = getState().storeGuids.returnGuids
    const newBanners = await getReturnGuids({
      page: currentPage,
      size,
      ...queryObj
    })
    dispatch(save(newBanners))
    dispatch(setLoading(false))
  }
}



