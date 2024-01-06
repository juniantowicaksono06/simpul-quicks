import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppState, SelectedChats } from '../interface'

export const appSlice = createSlice({
    name: "app",
    initialState: {
        selectedChat: {},
        loading: false
    } as AppState,
    reducers: {
        setSelectedChat: (state, action: PayloadAction<Partial<SelectedChats>>) => {
            state.selectedChat = action.payload
        },
        showLoading: (state) =>{
            state.loading = true
        },
        hideLoading: (state) => {
            state.loading = false
        }
    }
})

export const { setSelectedChat, showLoading, hideLoading } = appSlice.actions
export default appSlice.reducer