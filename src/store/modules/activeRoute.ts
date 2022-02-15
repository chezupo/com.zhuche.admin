import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MeType } from '@/store/modules/me'

type ActiveRouteType = {
  name: string
}
const initialState: ActiveRouteType = {
  name: ''
}
export const activeRouteSlice = createSlice({
  name: 'activeRoute',
  initialState,
  reducers: {
    save: (state, action: PayloadAction<ActiveRouteType>) => {
      return action.payload
    },
  },
})

export const {save} = activeRouteSlice.actions

export default activeRouteSlice.reducer
