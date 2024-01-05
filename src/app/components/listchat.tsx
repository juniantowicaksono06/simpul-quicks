import React from "react"
import { ListChatDataProps, ListChatProps } from "../interface"
import { useDispatch } from "react-redux"
import { setSelectedChat } from "../state/app"
const listchat: React.FC<ListChatProps> = (props) => {
    const dispatch = useDispatch()
    const actionSelectChat = (id: number) => {
        const fetchData = async () => {
            const response = await fetch(`https://my-json-server.typicode.com/juniantowicaksono06/dummy-api/conversation/${id}`)
            if(!response.ok) {
                alert("Error fetching chat data!")
                return
            }
            dispatch(setSelectedChat(await response.json()))
        }
        fetchData()
    }
    return (
        <div className="py-3" id="ChatContainer">
            {
                props.data.map((chat: ListChatDataProps, index: number) => {
                    var inputDate = new Date(chat['date']);
                    var chatDate: string;
                    if(chat['status'] == "READ") {
                        var day = inputDate.getDate();
                        var month = inputDate.getMonth() + 1; // Months are zero-based, so add 1
                        var year = inputDate.getFullYear();
                        var hours = inputDate.getHours();
                        var minutes = inputDate.getMinutes();
    
                        var formattedDate = (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day + '/' + year;
                        var formattedTime = (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes;
    
                        chatDate = formattedDate + ' ' + formattedTime;
                    }
                    else {
                        var options = { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric', 
                            hour: 'numeric', 
                            minute: 'numeric', 
                            hour12: false 
                        };
                        chatDate = inputDate.toLocaleString('en-US', options);
                        chatDate = chatDate.replace("at ", "")
                    }
                    let firstName: string = chat['title']
                    firstName = firstName[0]
                    return <div className="chat-card px-0 py-0" key={index} onClick={() => {
                        actionSelectChat(chat['id'])
                    }}>
                        <div className="py-2">
                            <div className="chat-profile d-flex justify-content-center">
                                {
                                    chat['type'] == "group" ? 
                                    <div className="d-flex position-relative">
                                        <div className="profile colour-back-light-gray d-flex justify-content-center align-items-center position-absolute">
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M6 0C4.3425 0 3 1.3425 3 3C3 4.6575 4.3425 6 6 6C7.6575 6 9 4.6575 9 3C9 1.3425 7.6575 0 6 0ZM7.5 3C7.5 2.175 6.825 1.5 6 1.5C5.175 1.5 4.5 2.175 4.5 3C4.5 3.825 5.175 4.5 6 4.5C6.825 4.5 7.5 3.825 7.5 3ZM10.5 10.5C10.35 9.9675 8.025 9 6 9C3.9825 9 1.6725 9.96 1.5 10.5H10.5ZM0 10.5C0 8.505 3.9975 7.5 6 7.5C8.0025 7.5 12 8.505 12 10.5V12H0V10.5Z" fill="#828282"/>
                                            </svg>
                                        </div>
                                        <div className="profile colour-back-blue d-flex justify-content-center align-items-center position-relative">
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M6 0C4.3425 0 3 1.3425 3 3C3 4.6575 4.3425 6 6 6C7.6575 6 9 4.6575 9 3C9 1.3425 7.6575 0 6 0ZM7.5 3C7.5 2.175 6.825 1.5 6 1.5C5.175 1.5 4.5 2.175 4.5 3C4.5 3.825 5.175 4.5 6 4.5C6.825 4.5 7.5 3.825 7.5 3ZM10.5 10.5C10.35 9.9675 8.025 9 6 9C3.9825 9 1.6725 9.96 1.5 10.5H10.5ZM0 10.5C0 8.505 3.9975 7.5 6 7.5C8.0025 7.5 12 8.505 12 10.5V12H0V10.5Z" fill="white"/>
                                            </svg>
                                        </div>
                                    </div>
                                    : <div className="profile colour-back-blue d-flex justify-content-center align-items-center text-white lato-regular">
                                        {firstName}
                                    </div>
                                }
                            </div>
                            <div className="chat-info">
                                <div className="row">
                                    <div className="d-flex px-0">
                                        <h6 className="chat-header lato-bold font-large colour-front-blue">{chat['title']}</h6>
                                        <span className="lato-regular font-small chat-date" style={{
                                            marginLeft: chat['title'].length < 45 ? "20px" : "0"
                                        }}>{chatDate}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="px-0">
                                        {chat['last_chat']['from'] ? <h6 className="chat-contact-name lato-bold font-small ">{chat['last_chat']['from']}:</h6> : <></>}
                                        <h6 className="last-chat lato-regular font-small ">{ chat['last_chat']['text'] }</h6>
                                        {
                                            chat['status'] == "UNREAD" ?  
                                            <div className="position-relative">
                                                <div className="chat-unread colour-back-red"></div>
                                            </div>
                                            : <></>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        { 
                            index != props.data.length - 1 ?
                            <hr className="chat-separator" />
                            : 
                            <></>
                        }
                    </div>
                })
            }
        </div>
    )
}


export default listchat