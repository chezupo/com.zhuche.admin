import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getOrders, OrderPageType} from "@/api/order";
import {AppDispatch, RootState} from "@/store";

type InitialStateType = {
  pageData: OrderPageType
  loading: boolean
}

const initialState: InitialStateType = {
  pageData: {
    list: [],
    total: 0,
    currentPage: 1,
    size: 12
  },
  loading: false
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>): InitialStateType => {
      return {...state, loading: action.payload}
    },
    save: (state, action: PayloadAction<OrderPageType> ): InitialStateType => {
      return {...state, pageData: action.payload}
    },
    int: (state, action: PayloadAction<OrderPageType> ): InitialStateType => {
      return {...state, pageData: action.payload}
    }
  }
})


const getOrderThunk = () => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> =>{
    dispatch(actions.setLoading(true));
    try {
      const pageData = await getOrders()
      dispatch(actions.save(pageData))
    }finally {
      dispatch(actions.setLoading(false));
    }
  }
}
const orderReducer = orderSlice.reducer

export {getOrderThunk}
export const actions = orderSlice.actions
export default orderReducer
