
import React from "react"
import "../popup.css"
import ListChat from "./listchat"
import Loading from './loading'
import { useState, useEffect } from "react"
import { ListChatDataProps, PopupProps, SelectedChats } from "../interface"
import { useDispatch, useSelector } from "react-redux"
import Conversation from "./conversation"

import { showLoading, hideLoading } from "../state/app"


const popup: React.FC<PopupProps> = (props) => {
    const isLoading: boolean = useSelector((state) => state.app.loading)
    const selectedChat: SelectedChats = useSelector((state) => state.app.selectedChat)
    const dispatch = useDispatch()
    const [chatData, setChatData] = useState([])
    const [allChat, setAllChat] = useState([])
    const [chatSearch, setChatSearch] = useState("")
    useEffect(() => {
        dispatch(showLoading())
        if(props.type == "inbox") {
            const fetchInboxData = async () => {
                const response = await fetch("https://my-json-server.typicode.com/juniantowicaksono06/dummy-api/chat-list")
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
        }
    }, [props.type, selectedChat])
    const actionFilterChat = (searchValue: string) => {
        setChatData(allChat)
        setChatData(allChat.filter((chat: ListChatDataProps, index) => {
            if(chat['title'].toLowerCase().includes(searchValue.toLowerCase())) return chat
            return null
        }))
    }
    return (
        <div id="Popup">
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
                chatData.length > 0 && props.type == "inbox" && !isLoading && Object.keys(selectedChat).length == 0 ? <ListChat data={chatData} /> : <></>
            }
            {
                isLoading ? 
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <Loading text={props.type == "inbox" ? "Loading Chats..." : "Loading Task..."} />
                    </div>
                : 
                <></>
            }
        </div>
    )
}

export default popup