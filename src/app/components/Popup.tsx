
import React from "react"
import "../css/popup.css"
import Chat from "./chat/Main"
import Task from "./task/Main"
import { PopupProps } from "../interface"


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