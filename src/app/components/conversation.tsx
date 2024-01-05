import { useDispatch, useSelector } from "react-redux"
import { SelectedChats , Chats } from "../interface"
import { setSelectedChat } from "../state/app"
import "../conversation.css"
import { useEffect, useState } from "react"
import React from 'react'
import Loading from "./loading"

const conversation = () => {
    const selectedChat: SelectedChats = useSelector((state) => state.app.selectedChat)
    const [containerContentHeight, setContainerContentHeight] = useState(0)
    const [isReachUnread, setIsReachUnread] = useState(false)
    const [optionOpened, setOptionOpened] = useState(-1)
    var unreadMessage: boolean = false
    const actionGoToUnread = () => {
        var element = document.querySelector("#ConversationContent")
        element.scrollTop = document.querySelector("#NewMessageSection").getBoundingClientRect()['y'] - (element.scrollHeight + 80)
    }
    const actionOpenOption = (index: number) => {
        if(index == optionOpened) {
            setOptionOpened(-1)
        }
        else {
            setOptionOpened(index)
        }
    }
    useEffect(() => {
        setContainerContentHeight(document.querySelector("#Popup").clientHeight - document.querySelector("#ConversationTopBar").clientHeight - document.querySelector("#ConversationInput").clientHeight - 10)
        if(unreadMessage) {
            var element = document.querySelector("#ConversationContent")
            setIsReachUnread(document.querySelector("#NewMessageSection").getBoundingClientRect()['y'] - (element.scrollHeight + 80) < element.scrollTop)
            document.querySelector("#ConversationContent")?.addEventListener("scroll", function() {
                var element = document.querySelector("#ConversationContent")
                setIsReachUnread(document.querySelector("#NewMessageSection").getBoundingClientRect()['y'] - (element.scrollHeight + 80) < element.scrollTop)
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
                    selectedChat['chats'].map((chats: Chats, index) => {
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
                            let prevChatIsUnread = selectedChat['chats'][index - 1]['status']
                            if(prevChatIsUnread == 'READ' && chats['status'] == 'UNREAD') {
                                isUnread = true
                                unreadMessage = true
                            }
                            previousDateObj = new Date(selectedChat['chats'][index - 1]['date'])
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
                            {chats['from'] == "You" ?
                                <div className="conversation-right mb-2" key={index}>
                                    <div className="position-relative">
                                        <button className="btn position-absolute" onClick={() => {
                                            actionOpenOption(index)
                                        }} style={{
                                            top: "0",
                                            left: "-40px"
                                        }}>
                                            <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M2.00008 0.666664C1.26675 0.666664 0.666748 1.26666 0.666748 2C0.666748 2.73333 1.26675 3.33333 2.00008 3.33333C2.73341 3.33333 3.33342 2.73333 3.33342 2C3.33342 1.26666 2.73341 0.666664 2.00008 0.666664ZM10.0001 0.666664C9.26675 0.666664 8.66675 1.26666 8.66675 2C8.66675 2.73333 9.26675 3.33333 10.0001 3.33333C10.7334 3.33333 11.3334 2.73333 11.3334 2C11.3334 1.26666 10.7334 0.666664 10.0001 0.666664ZM4.66675 2C4.66675 1.26666 5.26675 0.666664 6.00008 0.666664C6.73341 0.666664 7.33341 1.26666 7.33341 2C7.33341 2.73333 6.73341 3.33333 6.00008 3.33333C5.26675 3.33333 4.66675 2.73333 4.66675 2Z" fill="#4F4F4F"/>
                                            </svg>
                                        </button>
                                        <div className={optionOpened == index ? "conversation-option show colour-back-white colour-border-light-gray" : "conversation-option hide colour-back-white colour-border-light-gray"}>
                                            <button className="btn lato-regular font-medium colour-front-blue mb-0">
                                                <span>Edit</span>
                                            </button>
                                            <hr className="my-0" />
                                            <button className="btn lato-regular font-medium colour-front-red mb-0">
                                                <span>Delete</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="conversation-item lato-regular font-small">
                                        <div>
                                            <h6 className="lato-bold font-medium colour-front-purple text-end mb-0">{ chats['from'] }</h6>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <div className="box colour-back-light-purple colour-front-gray">
                                                <h6 className="lato-regular font-medium mb-0">{chats['text']}</h6>
                                                <p className="mb-0 font-small lato-regular">{times}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="conversation-left mb-2" key={index}>
                                    <div className="conversation-item lato-regular font-small">
                                        <div>
                                            <h6 className={chats['from'] == "Mary Hilda" ? "lato-bold font-medium colour-front-yellow text-start mb-0" : chats['from'] == "Obaidullah Amarkhil" ?  "lato-bold font-medium colour-front-green text-start mb-0" : "lato-bold font-medium colour-front-purple text-start mb-0"}>{ chats['from'] }</h6>
                                        </div>
                                        <div className="d-flex">
                                            <div className={chats['from'] == "Mary Hilda" ? "box colour-back-light-yellow colour-front-gray" : chats['from'] == "Obaidullah Amarkhil" ? "box colour-back-light-green colour-front-gray" : "box colour-back-white2 colour-front-gray"}>
                                                <h6 className="lato-regular font-medium mb-0">{ chats['text'] }</h6>
                                                <p className="mb-0 font-small lato-regular">19:32</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="position-relative">
                                        <button className="btn position-absolute" onClick={() => {
                                            actionOpenOption(index)
                                        }} style={{
                                            top: "0"
                                        }}>
                                            <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M2.00008 0.666664C1.26675 0.666664 0.666748 1.26666 0.666748 2C0.666748 2.73333 1.26675 3.33333 2.00008 3.33333C2.73341 3.33333 3.33342 2.73333 3.33342 2C3.33342 1.26666 2.73341 0.666664 2.00008 0.666664ZM10.0001 0.666664C9.26675 0.666664 8.66675 1.26666 8.66675 2C8.66675 2.73333 9.26675 3.33333 10.0001 3.33333C10.7334 3.33333 11.3334 2.73333 11.3334 2C11.3334 1.26666 10.7334 0.666664 10.0001 0.666664ZM4.66675 2C4.66675 1.26666 5.26675 0.666664 6.00008 0.666664C6.73341 0.666664 7.33341 1.26666 7.33341 2C7.33341 2.73333 6.73341 3.33333 6.00008 3.33333C5.26675 3.33333 4.66675 2.73333 4.66675 2Z" fill="#4F4F4F"/>
                                            </svg>
                                        </button>
                                        <div className={optionOpened == index ? "conversation-option show colour-back-white colour-border-light-gray" : "conversation-option hide colour-back-white colour-border-light-gray"}>
                                            <button className="btn lato-regular font-medium colour-front-blue mb-0">
                                                <span>Share</span>
                                            </button>
                                            <hr className="my-0" />
                                            <button className="btn lato-regular font-medium colour-front-blue mb-0">
                                                <span>Reply</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>}
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
                        {/* <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div> */}
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

export default conversation