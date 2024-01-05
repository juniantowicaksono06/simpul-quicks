import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: "app",
    initialState: {
        selectedChat: {},
        loading: false
    },
    reducers: {
        setSelectedChat: (state, action) => {
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