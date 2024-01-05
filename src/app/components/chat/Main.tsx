import { useState, useEffect } from "react"
import { ListChatDataProps, PopupProps, SelectedChats } from "../../interface"
import Conversation from "./Conversation"
import Loading from '../global/Loading'
import { useDispatch, useSelector } from "react-redux"
import ListChat from "./ListChat"


import { showLoading, hideLoading } from "../../state/app"

const Chat = () => {
    const isLoading: boolean = useSelector((state) => state.app.loading)
    const selectedChat: SelectedChats = useSelector((state) => state.app.selectedChat)
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
                <div id="PopupTopbar">
                    <div className="input-group">
                        <input type="text" onChange={(e: Event) => {
                            if(allChat.length == 0) return
                            const searchValue: string = e.target.value
                            actionFilterChat(searchValue)
                            setChatSearch(searchValue)
                        }} className="" placeholder="Search" id="PopupSearchbar" />
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