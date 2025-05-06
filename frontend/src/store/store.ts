import { configureStore } from "@reduxjs/toolkit"
import { type TypedUseSelectorHook, useSelector, useDispatch } from "react-redux"
import usersReducer from "../reducers/usersReducer"
import myStateReducer from "../reducers/myStateReducer"

export const store = configureStore({
  reducer: {
    usersReducer:usersReducer.usersReducer,
    myStateReducer:myStateReducer.myStateReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
