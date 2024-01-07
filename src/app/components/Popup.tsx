
import React from "react"
import "@/app/css/popup.css"
import Chat from "@/app/components/chat/Main"
import Task from "@/app/components/task/Main"
import { PopupProps } from "@/app/interface"


const Popup: React.FC<PopupProps> = (props) => {
    return (
        <div id="Popup">
            {
                props['type'] == "inbox" ? <Chat /> : <Task />
            }
        </div>
    )
}

export default Popup