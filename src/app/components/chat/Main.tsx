import { useState, useEffect, ChangeEvent } from "react"
import { ListChatDataProps, SelectedChats } from "@/app/interface"
import Conversation from "@/app/components/chat/Conversation"
import Loading from '@/app/components/global/Loading'
import { useDispatch, useSelector } from "react-redux"
import ListChat from "@/app/components/chat/ListChat"
import { showLoading, hideLoading } from "@/app/state/app"
import { RootState } from "@/app/store/store"
import "@/app/css/chat.css"

const Chat = () => {
    const isLoading: boolean = useSelector<RootState, boolean>((state) => state.app.loading)
    const selectedChat: Partial<SelectedChats> = useSelector<RootState, Partial<SelectedChats>>((state) => state.app.selectedChat)
    const dispatch = useDispatch()
    const [chatData, setChatData] = useState([])
    const [allChat, setAllChat] = useState([])
    const [chatSearch, setChatSearch] = useState("")
    useEffect(() => {
        dispatch(showLoading())
        const fetchInboxData = async () => {
            const response = await fetch(`${process.env.API_BASE_URL}/chat-list`)
            if(!response.ok) {
                alert("Ooops... something wrong!")
                return
            }
            const data = await response.json()
            setChatData(data)
            setAllChat(data)
            dispatch(hideLoading())
        }
        fetchInboxData()
    }, [selectedChat])

    const actionFilterChat = (searchValue: string) => {
        setChatData(allChat)
        setChatData(allChat.filter((chat: ListChatDataProps) => {
            if(chat['title'].toLowerCase().includes(searchValue.toLowerCase())) return chat
            return null
        }))
    }
    return (
        <>
            {
                Object.keys(selectedChat).length == 0 ? 
                <div id="ChatTopbar">
                    <div className="input-group">
                        <input type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            if(allChat.length == 0) return
                            const searchValue: string = e.target.value
                            actionFilterChat(searchValue)
                            setChatSearch(searchValue)
                        }} className="" placeholder="Search" id="ChatSearchbar" />
                        <div className="input-group-append">
                            <span className='input-group-text d-inline-block h-100 text-dark bg-white' id="PopupSearchIcon">
                                <i className="fas fa-search fa-1x"></i>
                            </span>
                        </div>
                    </div>
                </div>
                : <></>
            }
            {
                Object.keys(selectedChat).length > 0 ? <Conversation />  : <></>
            }
            {
                chatData.length > 0 && !isLoading && Object.keys(selectedChat).length == 0 ? <ListChat data={chatData} /> : <></>
            }
            {
                isLoading ? 
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <Loading text="Loading Chats..." />
                    </div>
                : 
                <></>
            }
        </>
    )
}

export default Chat