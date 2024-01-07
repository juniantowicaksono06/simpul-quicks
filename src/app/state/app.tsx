import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppState, SelectedChats, ReplyTo } from '../interface'

export const appSlice = createSlice({
    name: "app",
    initialState: {
        selectedChat: {},
        loading: false,
        reply: {
            to: "",
            text: ""
        }
    } as AppState,
    reducers: {
        setSelectedChat: (state, action: PayloadAction<SelectedChats>) => {
            state.selectedChat = action.payload
        },
        setReply: (state, action: PayloadAction<Partial<ReplyTo>>) => {
            state.reply = action.payload
        },
        showLoading: (state) =>{
            state.loading = true
        },
        hideLoading: (state) => {
            state.loading = false
        }
    }
})

export const { setSelectedChat, showLoading, hideLoading, setReply } = appSlice.actions
export default appSlice.reducer