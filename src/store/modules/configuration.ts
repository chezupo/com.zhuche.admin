import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ConfigurationType, getConfiguration} from "@/api/Configurations";
import {AppDispatch, RootState} from "@/store";

const initialState: ConfigurationType = {
  imgPrefix: ''
}

const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    init: (state, action:PayloadAction<ConfigurationType>) => action.payload
  }
})

const configurationReducer = configurationSlice.reducer
export default configurationReducer;

export const {init} = configurationSlice.actions

// 初始化配置
export const initializeConfiguration = () => {
  return async (dispatch: AppDispatch): Promise<void> => {
    const configuration = await getConfiguration()
    dispatch(init(configuration))
  }
}
