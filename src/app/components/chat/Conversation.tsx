import { useDispatch, useSelector } from "react-redux"
import { SelectedChats , Chats, AppState, ReplyTo } from "@/app/interface"
import { setSelectedChat, setReply } from "@/app/state/app"
import { RootState } from "@/app/store/store"
import { useEffect, useState, useRef, ChangeEvent } from "react"
import React from 'react'
import Loading from "@/app/components/global/Loading"
import ConversationItem from "./ConversationItem"

const Conversation = () => {
    const selectedChat: SelectedChats = useSelector<RootState, SelectedChats>((state) => state.app.selectedChat)
    const myReply: Partial<ReplyTo> = useSelector<RootState, Partial<ReplyTo>>((state) => state.app.reply)
    const [containerContentHeight, setContainerContentHeight] = useState(0)
    const [isReachUnread, setIsReachUnread] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")

    const newMessageNotifRef = useRef<HTMLDivElement | null>(null)
    
    var unreadMessage: boolean = false
    const actionGoToUnread = () => {
        var element: Element | null = document.querySelector("#ConversationContent")
        element!.scrollTop =  (element!.scrollHeight - 200) - document.querySelector("#NewMessageSection")!.getBoundingClientRect()['y']
    }

    const getHeightCalculation = () => {
        let height = document.querySelector("#Popup")!.clientHeight - document.querySelector("#ConversationTopBar")!.clientHeight - document.querySelector("#ConversationInput")!.clientHeight - 10

        if(myReply['text'] != "" && myReply['to'] != "") {
            height -= document.querySelector("#ReplyTo")!.clientHeight
        }
        if(!("particants" in selectedChat)) {
            height -= document.querySelector("#MessageConnect")!.clientHeight
        }
        return height
    }

    const actionSetContainerHeight = () => {
        let height = getHeightCalculation()

        setContainerContentHeight(height)
    }

    const setNewMessageNotifPosition = () => {
        if(newMessageNotifRef.current == null || newMessageNotifRef.current == undefined) return
        let bottom = 64
        if(myReply.text != "" && myReply.to != "") {
            bottom += document.querySelector('#ReplyTo')!.clientHeight
        }
        if(!("particants" in selectedChat)) {
            bottom += document.querySelector('#MessageConnect')!.clientHeight
        }
        newMessageNotifRef.current.style.bottom = `${bottom}px`
    }

    useEffect(() => {
        setNewMessageNotifPosition()
        actionSetContainerHeight()
    }, [myReply])

    useEffect(() => {
        actionSetContainerHeight()
        setNewMessageNotifPosition()
        if(unreadMessage) {
            var element = document.querySelector("#ConversationContent")

            if(document.querySelector("#NewMessageSection") === null) {
                if(element!.scrollTop > document.querySelector("#NewMessageSection")!.getBoundingClientRect()['x'] - window.innerHeight) {
                    setIsReachUnread(true)
                }
                else {
                    setIsReachUnread(false)
                }
            }
            document.querySelector("#ConversationContent")?.addEventListener("scroll", function() {
                var element = document.querySelector("#ConversationContent")
                var scrollPosition = element!.scrollHeight - document.querySelector("#NewMessageSection")!.clientHeight - document.querySelector("#NewMessageSection")!.scrollTop
                console.log(scrollPosition)
                if(scrollPosition <= 50) {
                    setIsReachUnread(true)
                }
                else {
                    setIsReachUnread(false)
                }
            })
        }
    }, [unreadMessage, isReachUnread])

    const dispatch = useDispatch()
    const actionCloseConversation = () => {
        dispatch(setSelectedChat({}))
    }
    const actionRemoveReply = () => {
        dispatch(setReply({
            "text": "",
            "to": ""
        }))
    }
    const actionSendMessage = () => {
        if(selectedChat.chats === undefined) return
        const chatData = [...selectedChat.chats]
        if(myReply.text != "") {
            chatData!.push({
                date: "2021-06-09 19:10:00",
                text: message,
                from: "You",
                status: "READ",
                reply: myReply.text
            })
        }
        else {
            chatData!.push({
                date: "2021-06-09 19:10:00",
                text: message,
                from: "You",
                status: "READ"
            })
        }
        const newArray: Chats[] = chatData.map(item => ({ ...item, status: "READ" }));
        dispatch(setSelectedChat({...selectedChat, chats: [...newArray]}))
        actionRemoveReply()
        unreadMessage = false
        setMessage("")
    }
    return (
        <>
            <div id="ConversationTopBar">
                <div className="d-flex justify-content-between h-100">
                    <div className="d-flex justify-content-center align-items-center">
                        <button className="quicks-button px-0 py-0" onClick={actionCloseConversation}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z" fill="#333333"/>
                            </svg>
                        </button>
                        <div className="ms-4">
                            <h6 className="lato-bold font-large colour-front-blue mb-0" id="ConversationTitle">{ selectedChat['title'] }</h6>
                            <p className="lato-regular font-small mt-0 mb-0" id="ConversationParticants">{selectedChat['particants']} Particants</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <button className="quicks-button px-0 py-0" onClick={actionCloseConversation}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#333333"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <hr className="colours-back-light-gray my-0" />
            </div>
            <div id="ConversationContent" className="quicks-scrollbar" style={{
                height: `${containerContentHeight}px`,
                maxHeight: `${containerContentHeight}px`
            }}>
                {
                    selectedChat['chats']!.map((chats: Chats, index) => {
                        const dateObj: Date = new Date(chats['date'])
                        let previousDateObj: Date | null = null
                        const months: Array<string> = [
                            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
                        ]
                        let currentDate: string = `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`
                        let previousDate: string | null = null
                        let isNewDate: boolean = false
                        let isUnread: boolean = false
                        if(index > 0) {
                            let prevChatIsUnread = selectedChat['chats']![index - 1]['status']
                            if(prevChatIsUnread == 'READ' && chats['status'] == 'UNREAD') {
                                isUnread = true
                                unreadMessage = true
                            }
                            previousDateObj = new Date(selectedChat['chats']![index - 1]['date'])
                            previousDate = `${previousDateObj.getFullYear()}-${previousDateObj.getMonth()}-${previousDateObj.getDate()}`
                            if(currentDate != previousDate) {
                                isNewDate = true
                            }
                        }
                        else if(index == 0) {
                            isNewDate = true
                            if(chats['status'] == "UNREAD") {
                                isUnread = true
                                unreadMessage = true
                            }
                        }
                        
                        const times = `${dateObj.getHours()}:${dateObj.getMinutes()}`

                        let dates: string = ""

                        if(isNewDate) {
                            if(currentDate == "2021-5-9") {
                                dates = `Today`
                            }
                            dates = `${dates} ${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`
                        }
                        
                        
                        return (
                            <React.Fragment key={index}>
                                {
                                    isNewDate ? 
                                    <div className="hr-with-text">
                                        <hr />
                                        <div className="d-flex justify-content-center">
                                            <span className="lato regular font-small hr-indicator colour-back-white">{ dates }</span>
                                        </div>
                                    </div> 
                                    :
                                    <></>
                                }
                                {
                                    isUnread ? 
                                    <div className="hr-with-text" id="NewMessageSection">
                                        <hr className="colour-border-red" />
                                        <div className="d-flex justify-content-center">
                                            <span className="lato regular font-small hr-indicator colour-back-white colour-front-red">New Message</span>
                                        </div>
                                    </div> 
                                    :
                                    <></>
                                }
                            {
                                "reply" in chats ?
                                <ConversationItem from={chats['from']} times={times} text={chats['text']} reply={chats['reply']} key={index} />
                                :
                                <ConversationItem from={chats['from']} times={times} text={chats['text']} key={index} /> 
                            }
                            </React.Fragment> 
                        )   
                    })
                }
            </div>
            {
                unreadMessage && !isReachUnread ? 
                <div ref={newMessageNotifRef} id="NewMessageNotif">
                    <div className="d-flex justify-content-center">
                        <button className="quicks-button px-3 py-2 colour-back-light-blue" onClick={actionGoToUnread}>
                            <h6 className="lato-bold font-medium colour-front-blue mb-0">New Message</h6>
                        </button>
                    </div>
                </div> 
                : <></>
            }
            {
                !("particants" in selectedChat) ?
                <div id="MessageConnect">
                    <div className="d=flex colour-back-light-blue d-flex align-items-center">
                        <Loading className="quicks-spinner-blue" size="SMALL" />
                        <div className="ms-3">
                            <h6 className="lato-regular font-small colour-front-black mb-0">Please wait while we connect you with one of our team ...</h6>
                        </div>
                    </div>
                </div>
                : 
                <></>
            }
            <div id="ConversationInput">
                <div className="w-100 d-flex flex-column justify-content-end">
                    {
                        myReply.text != "" && myReply.to != "" ? 
                        <div className="w-100 colour-back-light colour-border-gray" id="ReplyTo">
                            <button className="quicks-button" id="CloseReply" onClick={actionRemoveReply}>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 1.20857L10.7914 0L6 4.79143L1.20857 0L0 1.20857L4.79143 6L0 10.7914L1.20857 12L6 7.20857L10.7914 12L12 10.7914L7.20857 6L12 1.20857Z" fill="#4F4F4F"/>
                                </svg>
                            </button>
                            <h6 className="lato-bold font-medium">Replying to {myReply.to}</h6>
                            <h6 className="lato-regular font-small mb-0">
                                { myReply.text }
                            </h6>
                        </div> : <></>
                    }
                    <input type="text" className="w-100 lato-regular font-medium no-border-radius-top" placeholder="Type a new message" id="InputMessage" style={{
                        maxHeight: "40px"
                    }} value={message} onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)} />
                </div>
                <div>
                    <button className="quicks-button colour-back-blue colour-front-white lato-regular font-medium rounded" onClick={actionSendMessage}>Send</button>
                </div>
            </div>
        </>
    )
}

export default Conversation