import {configureStore} from '@reduxjs/toolkit'
import meSlice from '@/store/modules/me'
import activeRouteSlice from '@/store/modules/activeRoute'
import loadingSlice from "@/store/modules/loading";
import bannersReducer from "@/store/modules/banners"
import configurationReducer from "@/store/modules/configuration";


const store =  configureStore({
  reducer: {
    me: meSlice,
    activeRoute: activeRouteSlice,
    loading: loadingSlice,
    banners: bannersReducer,
    configuration: configurationReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store