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
import carReducer from "@/store/modules/car";
import carCategoryReducer from "@/store/modules/carCatetory";
import userReducer from "@/store/modules/user";
import orderReducer from "@/store/modules/order";

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
    log: logReducer,
    cars: carReducer,
    carCategory: carCategoryReducer,
    users: userReducer,
    orders: orderReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
