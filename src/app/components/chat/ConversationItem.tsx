import React from "react"
import { ConversationItem } from "@/app/interface"
import { useState, useEffect, useRef } from "react"
import { setReply } from "@/app/state/app"
import { useDispatch } from "react-redux"

const ConversationItem: React.FC<ConversationItem> = (props) => {
    const [optionOpened, setOptionOpened] = useState<boolean>(false)

    const optionRef = useRef<HTMLButtonElement | null>(null)
    const optionContentRef = useRef<HTMLDivElement | null>(null)
    const dispatch = useDispatch()
    
    useEffect(() => {
        document.addEventListener("click", function(event: MouseEvent) {
            if((optionRef.current && !optionRef.current.contains(event.target as Node)) && (optionContentRef.current && !optionContentRef.current.contains(event.target as Node))) {
                setOptionOpened(false)
            }
        })
    }, [])
    const actionOpenOption = () => {
        setOptionOpened(!optionOpened)
    }
    
    const actionReply = (text: string, to: string) => {
        setOptionOpened(!optionOpened)
        dispatch(setReply({
            text: text,
            to: to
        }))
    }

    return (
        props['from'] == "You" ? 
        <>
            <div className="conversation-right mb-2">
                {
                    !("reply" in props) ? 
                    <div className="position-relative">
                        
                        <button ref={optionRef} className="quicks-button position-absolute" onClick={() => {
                            actionOpenOption()
                        }} style={{
                            top: "0",
                            left: "-40px"
                        }}>
                            <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M2.00008 0.666664C1.26675 0.666664 0.666748 1.26666 0.666748 2C0.666748 2.73333 1.26675 3.33333 2.00008 3.33333C2.73341 3.33333 3.33342 2.73333 3.33342 2C3.33342 1.26666 2.73341 0.666664 2.00008 0.666664ZM10.0001 0.666664C9.26675 0.666664 8.66675 1.26666 8.66675 2C8.66675 2.73333 9.26675 3.33333 10.0001 3.33333C10.7334 3.33333 11.3334 2.73333 11.3334 2C11.3334 1.26666 10.7334 0.666664 10.0001 0.666664ZM4.66675 2C4.66675 1.26666 5.26675 0.666664 6.00008 0.666664C6.73341 0.666664 7.33341 1.26666 7.33341 2C7.33341 2.73333 6.73341 3.33333 6.00008 3.33333C5.26675 3.33333 4.66675 2.73333 4.66675 2Z" fill="#4F4F4F"/>
                            </svg>
                        </button>
                        <div ref={optionContentRef} className={optionOpened ? "conversation-option show colour-back-white colour-border-light-gray" : "conversation-option hide colour-back-white colour-border-light-gray"}>
                            <button className="quicks-button lato-regular font-medium colour-front-blue mb-0">
                                <span>Edit</span>
                            </button>
                            <hr className="my-0" />
                            <button className="quicks-button lato-regular font-medium colour-front-red mb-0">
                                <span>Delete</span>
                            </button>
                        </div>
                    </div> : <></>
                }
                <div className="conversation-item lato-regular font-small">
                    <div>
                        <h6 className="lato-bold font-medium colour-front-purple text-end mb-0">{ props['from'] }</h6>
                    </div>
                    {
                        "reply" in props ? 
                        <div className="reply-content colour-back-light">
                            { props['reply'] }
                        </div>
                        : <></>
                    }
                    {
                        !("reply" in props) ? 
                        <div className="conversation-me">
                            <div className="box colour-back-light-purple colour-front-gray">
                                <h6 className="lato-regular font-medium mb-0">{props['text']}</h6>
                                <p className="mb-0 font-small lato-regular">{props['times']}</p>
                            </div>
                        </div> : <></>
                    }
                </div>
            </div>
            {
                ("reply" in props) ?
                <div className="conversation-right mb-2">
                    <div className="position-relative">
                        
                        <button ref={optionRef} className="quicks-button position-absolute" onClick={() => {
                            actionOpenOption()
                        }} style={{
                            top: "-20px",
                            left: "-40px"
                        }}>
                            <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M2.00008 0.666664C1.26675 0.666664 0.666748 1.26666 0.666748 2C0.666748 2.73333 1.26675 3.33333 2.00008 3.33333C2.73341 3.33333 3.33342 2.73333 3.33342 2C3.33342 1.26666 2.73341 0.666664 2.00008 0.666664ZM10.0001 0.666664C9.26675 0.666664 8.66675 1.26666 8.66675 2C8.66675 2.73333 9.26675 3.33333 10.0001 3.33333C10.7334 3.33333 11.3334 2.73333 11.3334 2C11.3334 1.26666 10.7334 0.666664 10.0001 0.666664ZM4.66675 2C4.66675 1.26666 5.26675 0.666664 6.00008 0.666664C6.73341 0.666664 7.33341 1.26666 7.33341 2C7.33341 2.73333 6.73341 3.33333 6.00008 3.33333C5.26675 3.33333 4.66675 2.73333 4.66675 2Z" fill="#4F4F4F"/>
                            </svg>
                        </button>
                        <div ref={optionContentRef} className={optionOpened ? "conversation-option show colour-back-white colour-border-light-gray" : "conversation-option hide colour-back-white colour-border-light-gray"}>
                            <button className="quicks-button lato-regular font-medium colour-front-blue mb-0">
                                <span>Edit</span>
                            </button>
                            <hr className="my-0" />
                            <button className="quicks-button lato-regular font-medium colour-front-red mb-0">
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                    <div className="conversation-item lato-regular font-small">
                        <div className="conversation-me">
                            <div className="box colour-back-light-purple colour-front-gray">
                                <h6 className="lato-regular font-medium mb-0">{props['text']}</h6>
                                <p className="mb-0 font-small lato-regular">{props['times']}</p>
                            </div>
                        </div>
                    </div>
                </div> : <></>
            }
        </>
        :
        <div className="conversation-left mb-2">
            <div className="conversation-item lato-regular font-small">
                <div>
                    <h6 className={props['from'] == "Mary Hilda" ? "lato-bold font-medium colour-front-yellow text-start mb-0" : props['from'] == "Obaidullah Amarkhil" ?  "lato-bold font-medium colour-front-green text-start mb-0" : "lato-bold font-medium colour-front-purple text-start mb-0"}>{ props['from'] }</h6>
                </div>
                <div className="d-flex">
                    <div className={props['from'] == "Mary Hilda" ? "box colour-back-light-yellow colour-front-gray" : props['from'] == "Obaidullah Amarkhil" ? "box colour-back-light-green colour-front-gray" : "box colour-back-white2 colour-front-gray"}>
                        <h6 className="lato-regular font-medium mb-0">{ props['text'] }</h6>
                        <p className="mb-0 font-small lato-regular">{ props['times'] }</p>
                    </div>
                </div>
            </div>
            <div className="position-relative">
                <button ref={optionRef} className="quicks-button position-absolute" onClick={() => {
                    actionOpenOption()
                }} style={{
                    top: "0"
                }}>
                    <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M2.00008 0.666664C1.26675 0.666664 0.666748 1.26666 0.666748 2C0.666748 2.73333 1.26675 3.33333 2.00008 3.33333C2.73341 3.33333 3.33342 2.73333 3.33342 2C3.33342 1.26666 2.73341 0.666664 2.00008 0.666664ZM10.0001 0.666664C9.26675 0.666664 8.66675 1.26666 8.66675 2C8.66675 2.73333 9.26675 3.33333 10.0001 3.33333C10.7334 3.33333 11.3334 2.73333 11.3334 2C11.3334 1.26666 10.7334 0.666664 10.0001 0.666664ZM4.66675 2C4.66675 1.26666 5.26675 0.666664 6.00008 0.666664C6.73341 0.666664 7.33341 1.26666 7.33341 2C7.33341 2.73333 6.73341 3.33333 6.00008 3.33333C5.26675 3.33333 4.66675 2.73333 4.66675 2Z" fill="#4F4F4F"/>
                    </svg>
                </button>
                <div ref={optionContentRef} className={optionOpened ? "conversation-option show colour-back-white colour-border-light-gray" : "conversation-option hide colour-back-white colour-border-light-gray"}>
                    <button className="quicks-button lato-regular font-medium colour-front-blue mb-0">
                        <span>Share</span>
                    </button>
                    <hr className="my-0" />
                    <button className="quicks-button lato-regular font-medium colour-front-blue mb-0" onClick={() => actionReply(props['text'], props['from'])}>
                        <span>Reply</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConversationItem