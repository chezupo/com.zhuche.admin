import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ConfigurationType, getConfiguration, updateConfiguration, UpdateConfigurationType} from "@/api/Configurations";
import {AppDispatch, RootState} from "@/store";

const initialState: ConfigurationType = {
  imgPrefix: '',
  appName: '',
  logo: '',
  amapKey: ''
}

const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    init: (state, action:PayloadAction<ConfigurationType>) => action.payload,
    save: (state, action:PayloadAction<ConfigurationType>) => action.payload
  }
})

const configurationReducer = configurationSlice.reducer
export default configurationReducer;

export const {init, save} = configurationSlice.actions

// 初始化配置
export const initializeConfigurationThunk = () => {
  return async (dispatch: AppDispatch): Promise<void> => {
    const configuration = await getConfiguration()
    dispatch(init(configuration))
  }
}

// 更新配置
export const updateConfigurationThunk = (data: UpdateConfigurationType) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    const res = await updateConfiguration(data)
    dispatch(save(res))
  }
}
