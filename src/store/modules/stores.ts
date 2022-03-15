import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  createStore,
  CreateStoreType,
  destroy,
  getStores,
  UpdateStoreType,
  update as updateStore, UpdateItemGuidType
} from '@/api/stores'
import { AppDispatch, RootState } from '@/store'
import { queryStrToObject } from '@/util/helper'

type InitialStateType = {
  stores: PageType<StoreItemType>
  loading: boolean
}

const initialState:InitialStateType = {
  stores: {
    list: [],
    total: 0,
    currentPage: 1,
    size: 12,
  },
  loading: false
}
const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setLoading: (state,action: PayloadAction<boolean>) => {
      return {...state, loading: action.payload}
    },
    save: (state,action: PayloadAction<PageType<StoreItemType>>) => {
      return {...state, stores: action.payload}
    },
    update: (state,action: PayloadAction<PageType<StoreItemType>>) => {
      return {...state, stores: action.payload}
    }
  }
})

export const {save, update, setLoading} = storeSlice.actions

const storeReducer = storeSlice.reducer

export default storeReducer

export const createStoreThunk = (data: CreateStoreType) => {
  return async (dispatch: AppDispatch): Promise<StoreItemType> => {
    dispatch(setLoading(true))
    const newItem = await createStore(data)
    await dispatch( getStoresThunk() )
    dispatch(setLoading(false))
    return newItem;
  }
}

export const getStoresThunk = () => {
  return async (dispatch: AppDispatch, getState: () => RootState):Promise<void> => {
    dispatch(setLoading(true))
    const {currentPage, size} = getState().store.stores
    const {search} = document.location
    const query = queryStrToObject(search)
    const newStores = await getStores({
      page: currentPage,
      size: size,
      ...query
    })
    dispatch(update(newStores))
    dispatch(setLoading(false))
  }
}

export const destroyThunk = (id: number) => {
  return async (dispatch: AppDispatch):Promise<void> => {
    dispatch(setLoading(true))
      await destroy(id)
      await dispatch(getStoresThunk())
    dispatch(setLoading(false))
  }
}

export const updateThunk = (id: number, data: UpdateStoreType) => {
  return async (dispatch: AppDispatch):Promise<void> => {
    dispatch(setLoading(true))
    const returnGuids = data.returnGuids.map((el) => ({...el, id: el.id && el.id > 0 ? el.id : null}))
    const pickupGuids = data.pickupGuids.map((el) => ({...el, id: el.id && el.id > 0 ? el.id :  null}))
    await updateStore(id, {...data, returnGuids, pickupGuids})
    await dispatch(getStoresThunk())
    dispatch(setLoading(false))
  }
}
