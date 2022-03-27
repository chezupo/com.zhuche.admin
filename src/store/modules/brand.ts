import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "@/store";
import {createBrand, CreateBrandType, getBrands, GetBrandsQueryType, updateBrand} from "@/api/brand";
import {obj2Query, query2Obj} from "@wuchuhengtools/helper";

type InitialStateType = {
  list: PageType<BrandItemType>
  loading: boolean
}
const initialState: InitialStateType = {
  list: {
    currentPage: 1,
    total: 0,
    size: 10,
    list: [],
  },
  loading: false
}
const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    init: (state, action: PayloadAction<PageType<BrandItemType>>): InitialStateType => {
      return {...state, list: action.payload}
    },
    setLoading: (state, action: PayloadAction<boolean>): InitialStateType => {
      return {...state, loading: action.payload}
    },
    setList: (state, action: PayloadAction<PageType<BrandItemType>>): InitialStateType => {
      return {...state, list: action.payload}
    }
  }
})

const brandReducer = brandSlice.reducer

const createBrandThunk = (data: CreateBrandType) => {
  return async (dispatch:AppDispatch, getState: () => RootState): Promise<void> => {
    dispatch(setLoading(true))
    const {currentPage, size} = getState().brands.list
    try {
      await createBrand(data)
      await dispatch(getBrandThunk())
    }finally {
      dispatch(setLoading(false))
    }
  }
}
const initBrandThunk = () => {
  return async (dispatch: AppDispatch, getSate: () => RootState): Promise<void> => {
    dispatch(setLoading(true))
    const {currentPage, size} = getSate().brands.list
    try {
      const newList = await getBrands({page: currentPage, size})
      dispatch(init(newList))
    }finally {
      dispatch(setLoading(false))
    }
  }
}

const getBrandThunk = () => {
  return async (dispatch: AppDispatch, getSate: () => RootState): Promise<void> => {
    dispatch(setLoading(true))
    const {currentPage, size} = getSate().brands.list
    try {
      const {search} = document.location
      const searchQuery = query2Obj(search)
      const query: GetBrandsQueryType = {
        page: parseInt(searchQuery.page) ||  currentPage,
        size,
        ...(searchQuery.storeName ? {storeName: searchQuery.storeName} : {}),
        ...(searchQuery.name? {name: searchQuery.name} : {}),
      }
      const newList = await getBrands(query)
      dispatch(init(newList))
    }finally {
      dispatch(setLoading(false))
    }
  }
}

const updateBrandThunk = (data: BrandItemType) => {
  return async (dispatch: AppDispatch, getSate: () => RootState): Promise<void> => {
    dispatch(setLoading(true))
    const {currentPage, size} = getSate().brands.list
    try {
      await updateBrand(data)
      await dispatch(getBrandThunk())
    }finally {
      dispatch(setLoading(false))
    }
  }
}

const { setLoading, init} = brandSlice.actions
export {createBrandThunk, initBrandThunk, getBrandThunk, updateBrandThunk}
export default brandReducer

