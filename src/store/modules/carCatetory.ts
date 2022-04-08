import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "@/store";
import {createCarCategory, fetchCarCategory, updateCarCategory, deleteCarCategory} from "@/api/carCategory";
import {getPageQuery} from "@/util/paginationUtil";

type InitialStateType = {
  list: PageType<CarCategoryItemType>
  loading: boolean
}

const initialState: InitialStateType = {
  list: {
    list: [],
    total: 0,
    currentPage: 1,
    size: 12
  },
  loading: false
}
const carCategorySlice = createSlice({
  name: 'car/category',
  initialState,
  reducers: {
    init: (state, action: PayloadAction<PageType<CarCategoryItemType>>): InitialStateType => {
      return {...state, list: action.payload}
    },
    save: (state, action: PayloadAction<PageType<CarCategoryItemType>>): InitialStateType => {
      return {...state, list: action.payload}
    },
    setLoading: (state, action: PayloadAction<boolean>): InitialStateType => ({...state, loading: action.payload}),
  }
})
const carCategoryReducer = carCategorySlice.reducer

const createCarCategoryThunk = (data: {name: string})=>{
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    dispatch(setLoading(true))
    try {
      await createCarCategory(data)
      await dispatch(fetchCarCategoryThunk())
    }finally {
      dispatch(setLoading(false))
    }
  }
}

const fetchCarCategoryThunk = () => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    dispatch(setLoading(true))
    const {currentPage, size} = getState().carCategory.list
    try {
      const newPageData = await fetchCarCategory(getPageQuery(currentPage, size))
      dispatch(save(newPageData))
    }finally {
      dispatch(setLoading(false))
    }
  }
}

const initCarCategoryThunk = () => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    dispatch(setLoading(true))
    const {currentPage, size} = getState().carCategory.list
    try {
      const newPageData = await fetchCarCategory(getPageQuery(currentPage, size))
      dispatch(init(newPageData))
    }finally {
      dispatch(setLoading(false))
    }
  }
}

const updateCarCategoryThunk = (id: number, data: {name: string}) => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    dispatch(setLoading(true))
    try {
      await updateCarCategory(id, data)
      await dispatch(fetchCarCategoryThunk())
    }finally {
      dispatch(setLoading(false))
    }
  }
}

const deleteCarCategoryThunk = (id: number) => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    dispatch(setLoading(true))
    try {
      await deleteCarCategory(id)
      await dispatch(fetchCarCategoryThunk())
    }finally {
      dispatch(setLoading(false))
    }
  }
}

export const {init, setLoading, save} = carCategorySlice.actions
export {
  createCarCategoryThunk,
  fetchCarCategoryThunk,
  initCarCategoryThunk,
  updateCarCategoryThunk,
  deleteCarCategoryThunk
}
export default carCategoryReducer
