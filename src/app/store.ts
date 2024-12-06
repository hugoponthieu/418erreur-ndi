import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import autoClickerMiddleware from '@/features/counter/autoClicker'

export const store = configureStore({
    reducer: {
        counter: counterReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(autoClickerMiddleware),
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store