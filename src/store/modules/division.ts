import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '@/store'
import { getProvince } from '@/api/province'
import { getCities } from '@/api/cities'
import { getAreas } from '@/api/area'

const initialState:DivisionType =  {
  province: [],
  cities: [],
  areas: []
}

const division = createSlice({
  name: 'division',
  initialState,
  reducers: {
    saveProvince: (state, action: PayloadAction<ProvinceType[]>) => {
      return {...state, province: action.payload}
    },
    saveCities: (state, action: PayloadAction<CityType[]>) => {
      return {...state,cities: action.payload}
    },
    saveAreas: (state, action: PayloadAction<AreaType[]>) => {
      return {...state, areas: action.payload}
    }
  }
})
const {reducer: divisionReducer} = division

export default divisionReducer

export const {saveProvince, saveCities, saveAreas} = division.actions

export const getProvinceThunk = () => {
  return async (dispatch: AppDispatch): Promise<void> => {
    saveCities([])
    saveAreas([])
    const province = await getProvince()
    dispatch(saveProvince(province))
  }
}

export const getCitiesThunk = (code: string) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    saveAreas([])
    const cities = await getCities(code)
    dispatch(saveCities(cities))
  }
}

export const getAreasThunk = (provinceCode: string, areaCode: string) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    const areas = await getAreas(provinceCode, areaCode)
    dispatch(saveAreas(areas))
  }
}

