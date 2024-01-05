import { configureStore } from "@reduxjs/toolkit";
import AppReducer from '../state/app'


export default configureStore({
    reducer: {
        app: AppReducer
    }
})