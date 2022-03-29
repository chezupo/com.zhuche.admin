import { configureStore } from '@reduxjs/toolkit'
import meSlice from '@/store/modules/me'
import activeRouteSlice from '@/store/modules/activeRoute'
import loadingSlice from '@/store/modules/loading'
import bannersReducer from '@/store/modules/banners'
import configurationReducer from '@/store/modules/configuration'
import divisionReducer from '@/store/modules/division'
import storeReducer from '@/store/modules/stores'
import errorReducer from '@/store/modules/error'
import storeGuids from '@/store/modules/storeGuids'
import brandReducer from "@/store/modules/brand";
import storeCarConfigReducer from "@/store/modules/storeCarConfig";
import logReducer from "@/store/modules/log";

const store =  configureStore({
  reducer: {
    me: meSlice,
    activeRoute: activeRouteSlice,
    loading: loadingSlice,
    banners: bannersReducer,
    configuration: configurationReducer,
    division: divisionReducer,
    store: storeReducer,
    error: errorReducer,
    storeGuids: storeGuids,
    brands: brandReducer,
    storeCarConfig: storeCarConfigReducer,
    log: logReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
