import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AppReducer from '../state/app'

const rootReducer = combineReducers({
    app: AppReducer
})


export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
    reducer: rootReducer
})

export default store