import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import  meSlice from '@/store/modules/me'

const store =  configureStore({
  reducer: {
    me: meSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
