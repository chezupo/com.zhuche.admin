import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BannersType, BannerType, createBanner, destroyBanner, getBanners, updateBanner} from "@/api/Banners";
import {AppDispatch, RootState} from "@/store";

export type InitialStateType = BannersType & {loading: boolean }
const initialState:InitialStateType = {
  list: [],
  total: 0,
  currentPage: 1,
  size: 6,
  loading: true
}

const bannersSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {
    save: (state, action: PayloadAction<BannersType>) => ({...state, ...action.payload }),
    setLoading: (state, action:PayloadAction<boolean>) =>  ({...state, loading: action.payload})
  }
})
const {reducer: bannersReducer} = bannersSlice
export default bannersReducer
export const {save, setLoading} =  bannersSlice.actions

// 获取banners
export const getBannersThunk = (page: number) => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    const oldBanners = getState().banners
    const {size} = getState().banners
    oldBanners.list.length === 0 && dispatch(setLoading(true))
    const newBanners =  await getBanners(page, size);
    dispatch(save(newBanners))
    dispatch(setLoading(false))
  }
}


// 创建banner
type CreateBannerRequestBodyType = {
  imgKey: string; content: string, title: string
}
export const createBannerThunk = (data: CreateBannerRequestBodyType) => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<BannerType> => {
    dispatch(setLoading(true))
    const {currentPage} = getState().banners
    try {
      const {id, imgKey, content, title} = await createBanner(data)
      dispatch(getBannersThunk(currentPage))
      dispatch(setLoading(false))
      return {id, imgKey, content, title}
    } catch (e) {
      dispatch(setLoading(false))
      throw e
    }
  }
}

// 更新banner
export const updateBannerThunk = (banner: BannerType) => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<BannerType> => {
    dispatch(setLoading(true))
    try {
      const newBanner =  await updateBanner(banner)
      const {list, ...others} = getState().banners
      const newList = list.map(i => i.id === banner.id ?  newBanner : i )
      dispatch(save({...others, list: newList}))
      dispatch(setLoading(false))

      return newBanner
    }catch (e) {
      dispatch(setLoading(false))
      throw e
    }
  }
}

// 删除banner
export const destroyBannerThunk = (banner: BannerType) => {
  return async (dispatch: AppDispatch, getSate: () => RootState): Promise<void> => {
    dispatch(setLoading(true))
    try {
      await destroyBanner(banner.id)
      const currentPage = getSate().banners.currentPage
      await dispatch(getBannersThunk(currentPage))
    }catch (e) {
      dispatch(setLoading(false))
      throw e
    }
  }
}
