import DatePicker from "@/app/components/global/DatePicker"
import { TaskCardProps } from "@/app/interface"
import TaskDescription from "@/app/components/task/TaskDescription"
import React, { useState, useEffect, useRef } from "react"
import TaskLabel from "./TaskLabel"

const TaskCard: React.FC<TaskCardProps> = (props) => {
    const [isCardClose, setIsCardClose] = useState<boolean>(
        props['taskStatus'] === "DONE"
    )
    const [optionOpened, setOptionOpened] = useState<boolean>(false)
    const [status, setStatus] = useState<boolean>(
        props['taskStatus'] === "DONE"
    )

    const optionRef = useRef<HTMLButtonElement | null>(null)
    const optionContentRef = useRef<HTMLDivElement | null>(null)

    const actionChangeStatus = () => {
        setStatus(!status)
    }

    const actionCloseCard = () => {
        setIsCardClose(!isCardClose)
    }

    const actionOpenOption = () => {
        setOptionOpened(!optionOpened)
    }

    useEffect(() => {
        document.addEventListener("click", function(event: MouseEvent) {
            if((optionRef.current && !optionRef.current.contains(event.target as Node)) && (optionContentRef.current && !optionContentRef.current.contains(event.target as Node))) {
                setOptionOpened(false)
            }
        })
    }, [])

    return (
        <div className="task-card">
            <div className="d-flex justify-content-between">
                <div className="d-flex">
                    <input type="checkbox" className="form-check-input colour-border-gray" onChange={actionChangeStatus} checked={status} />
                    <p className={status ? "lato-bold font-large ms-2 mb-0 task-card-title strikethrough-text colour-front-gray" : "lato-bold font-large ms-2 mb-0 task-card-title"}>{ props.title }</p>
                </div>
                <div className="d-flex align-items-start">
                    <h6 className="lato-regular font-medium mb-0 me-2 colour-front-red task-control">{ "daysLeft" in props && !status ? `${props['daysLeft']} Days Left` : "" }</h6>
                    <h6 className="lato-regular font-medium mb-0 me-1 task-control">{ "date" in props ? props['date'] : "" }</h6>
                    <button className="quicks-button py-1 task-collapse-button" onClick={actionCloseCard}>
                        {
                            isCardClose ? 
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.825 0.912476L5 4.72914L1.175 0.912476L0 2.08748L5 7.08747L10 2.08748L8.825 0.912476Z" fill="#4F4F4F"/>
                            </svg> :
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.175 7.08749L5 3.27083L8.825 7.08749L10 5.91249L5 0.912495L-1.02722e-07 5.91249L1.175 7.08749Z" fill="#4F4F4F"/>
                            </svg>
                        }
                    </button>
                    <div className="position-relative task-option-button">
                        <button ref={optionRef} className="quicks-button py-1" onClick={actionOpenOption}>
                            <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M2.00008 0.666664C1.26675 0.666664 0.666748 1.26666 0.666748 2C0.666748 2.73333 1.26675 3.33333 2.00008 3.33333C2.73341 3.33333 3.33342 2.73333 3.33342 2C3.33342 1.26666 2.73341 0.666664 2.00008 0.666664ZM10.0001 0.666664C9.26675 0.666664 8.66675 1.26666 8.66675 2C8.66675 2.73333 9.26675 3.33333 10.0001 3.33333C10.7334 3.33333 11.3334 2.73333 11.3334 2C11.3334 1.26666 10.7334 0.666664 10.0001 0.666664ZM4.66675 2C4.66675 1.26666 5.26675 0.666664 6.00008 0.666664C6.73341 0.666664 7.33341 1.26666 7.33341 2C7.33341 2.73333 6.73341 3.33333 6.00008 3.33333C5.26675 3.33333 4.66675 2.73333 4.66675 2Z" fill="#4F4F4F"/>
                            </svg>
                        </button>
                        <div ref={optionContentRef} className={optionOpened ? "task-option show colour-back-white colour-border-gray" : "task-option hide colour-back-white colour-border-gray"}>
                            <button className="quicks-button py-1 lato-regular font-medium colour-front-red mb-0">
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={isCardClose ? "task-detail d-none" : "task-detail"}>
                <div className="task-date">
                    <DatePicker dateValue={props['date']} />
                </div>
                <TaskDescription text={props.description} />
                <TaskLabel tasks={"taskLabel" in props ? props['taskLabel'] : [] as Array<string>} key={props['id']} />
            </div>
            {
                props['separator'] ?
                <hr className="separator" />
                : <></>
            }
        </div>
    )
}

export default TaskCard