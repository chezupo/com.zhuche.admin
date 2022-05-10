import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  ConfigurationType,
  getConfiguration,
  updateConfiguration,
  UpdateConfigurationType,
  updateInsurance
} from '@/api/Configurations'
import {AppDispatch, RootState} from '@/store'

const initialState: ConfigurationType = {
  imgPrefix: '',
  appName: '',
  logo: '',
  amapKey: '',
  amapSearchKey: '',
  notice: '',
  insurance: 0,
  servicePhone: '',
  orderAgreement: '',
  insuranceAgreement: '',
  promotionLevel1: 0,
  promotionLevel2: 0
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

const updateInsuranceThunk = (insurance: number) => {
  return async (dispatch: AppDispatch, getState: () => RootState ): Promise<void> => {
    const newConfig = await updateInsurance(insurance)
    dispatch(save({
      ...getState().configuration,
      ...newConfig
    }))
  }
}

export {updateInsuranceThunk}
