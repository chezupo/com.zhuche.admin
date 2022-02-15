import {configureStore} from '@reduxjs/toolkit'
import meSlice from '@/store/modules/me'
import activeRouteSlice from '@/store/modules/activeRoute'

const store =  configureStore({
  reducer: {
    me: meSlice,
    activeRoute: activeRouteSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
