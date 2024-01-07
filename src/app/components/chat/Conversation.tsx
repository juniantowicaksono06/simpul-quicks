import { useDispatch, useSelector } from "react-redux"
import { SelectedChats , Chats, AppState } from "@/app/interface"
import { setSelectedChat } from "@/app/state/app"
import { RootState } from "@/app/store/store"
import { useEffect, useState, useRef } from "react"
import React from 'react'
import Loading from "@/app/components/global/Loading"
import ConversationItem from "./ConversationItem"

const Conversation = () => {
    const selectedChat: Partial<SelectedChats> = useSelector<RootState, Partial<SelectedChats>>((state) => state.app.selectedChat)
    const [containerContentHeight, setContainerContentHeight] = useState(0)
    const [isReachUnread, setIsReachUnread] = useState<boolean>(false)
    
    var unreadMessage: boolean = false
    const actionGoToUnread = () => {
        var element: Element | null = document.querySelector("#ConversationContent")
        element!.scrollTop = document.querySelector("#NewMessageSection")!.getBoundingClientRect()['y'] - (element!.scrollHeight + 80)
    }

    useEffect(() => {
        setContainerContentHeight(document.querySelector("#Popup")!.clientHeight - document.querySelector("#ConversationTopBar")!.clientHeight - document.querySelector("#ConversationInput")!.clientHeight - 10)
        if(unreadMessage) {
            var element = document.querySelector("#ConversationContent")
            setIsReachUnread(document.querySelector("#NewMessageSection")!.getBoundingClientRect()['y'] - (element!.scrollHeight + 80) < element!.scrollTop)
            document.querySelector("#ConversationContent")?.addEventListener("scroll", function() {
                var element = document.querySelector("#ConversationContent")
                setIsReachUnread(document.querySelector("#NewMessageSection")!.getBoundingClientRect()['y'] - (element!.scrollHeight + 80) < element!.scrollTop)
            })
        }
    }, [unreadMessage])
    const dispatch = useDispatch()
    const actionCloseConversation = () => {
        dispatch(setSelectedChat({}))
    }
    return (
        <>
            <div id="ConversationTopBar">
                <div className="d-flex justify-content-between h-100">
                    <div className="d-flex justify-content-center align-items-center">
                        <button className="btn px-0 py-0" onClick={actionCloseConversation}>
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
                        <button className="btn px-0 py-0" onClick={actionCloseConversation}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#333333"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <hr className="colours-back-light-gray my-0" />
            </div>
            <div id="ConversationContent" style={{
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
                                <ConversationItem from={chats['from']} times={times} text={chats['text']} key={index} />
                            }
                            </React.Fragment> 
                        )   
                    })
                }
            </div>
            {
                unreadMessage && !isReachUnread ? 
                <div id="NewMessageNotif">
                    <div className="d-flex justify-content-center">
                        <button className="btn px-3 py-2 colour-back-light-blue" onClick={actionGoToUnread}>
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
                <input type="text" className="lato-regular font-medium" placeholder="Type a new message" id="InputMessage" />
                <div>
                    <button className="btn colour-back-blue colour-front-white lato-regular font-medium">Send</button>
                </div>
            </div>
        </>
    )
}

export default Conversation