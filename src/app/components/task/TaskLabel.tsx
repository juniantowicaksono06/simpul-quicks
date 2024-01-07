import { TaskLabelProps } from "@/app/interface"
import React, {useState, useRef, useEffect} from "react"

const TaskLabel: React.FC<TaskLabelProps> = (props) => {
    const optionRef = useRef<HTMLButtonElement | null>(null)
    const optionContentRef = useRef<HTMLDivElement | null>(null)
    const [optionOpened, setOptionOpened] = useState<boolean>(false)
    const [optionHeight, setOptionHeight] = useState<number>(0)

    const [taskLabelData, setTaskLabelData] = useState<Array<string>>(props['tasks'])

    const actionOpenOption = () => {
        setOptionOpened(!optionOpened)
    }

    const actionLabelSelection = (label: string) => {
        let newData = [...taskLabelData]
        if(!taskLabelData.includes(label)) {
            newData.push(label)
        }
        else {
            newData = newData.filter(item => item !== label)
        }
        setTaskLabelData(newData)
    }

    useEffect(() => {
        document.addEventListener("click", function(event: MouseEvent) {
            if((optionRef.current && !optionRef.current.contains(event.target as Node)) && (optionContentRef.current && !optionContentRef.current.contains(event.target as Node))) {
                setOptionOpened(false)
            }
        })
    }, [])

    useEffect(() => {
        if(optionOpened) {
            setOptionHeight(optionContentRef.current!.clientHeight)
        }
        else {
            setOptionHeight(0)
        }
    }, [optionOpened])

    return (
        <div className="task-label quicks-ms-n5">
            <div className="d-flex justify-content-center align-items-start me-2">
                <div className="position-relative">
                    <button className="quicks-button quicks-ms-n1" ref={optionRef} onClick={actionOpenOption}>
                        <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M13.4032 0.833374H5.52334C4.65742 0.833374 3.95681 1.58337 3.95681 2.50004H11.8288C12.6947 2.50004 13.4032 3.25004 13.4032 4.16671V15L14.9776 15.8334V2.50004C14.9776 1.58337 14.2691 0.833374 13.4032 0.833374ZM10.2545 5.83337V16.6417L6.94038 15.1334L6.31849 14.85L5.69661 15.1334L2.38249 16.6417V5.83337H10.2545ZM2.38245 4.16671H10.2545C11.1204 4.16671 11.8289 4.91671 11.8289 5.83337V19.1667L6.31845 16.6667L0.808044 19.1667V5.83337C0.808044 4.91671 1.51653 4.16671 2.38245 4.16671Z" fill="#2F80ED"/>
                        </svg>
                    </button>
                    <div ref={optionContentRef} className={optionOpened ? "task-label-option show colour-back-white bordered-solid-1 colour-border-gray rounded py-2 px-3" : "task-label-option hide"}>
                        <button className={taskLabelData.includes("Important ASAP") ? "task-label-item ms-0 mb-2 w-100 quicks-button important-asap lato-bold font-small text-start bordered-solid-1 colour-border-blue" : "task-label-item ms-0 mb-2 w-100 quicks-button important-asap lato-bold font-small text-start bordered-solid-1 colour-border-transparent"} onClick={() => actionLabelSelection("Important ASAP")}>
                            Important ASAP
                        </button>
                        <button className={taskLabelData.includes("Offline Meeting") ? "task-label-item ms-0 mb-2 w-100 quicks-button offline-meeting lato-bold font-small text-start bordered-solid-1 colour-border-blue" : "task-label-item ms-0 mb-2 w-100 quicks-button offline-meeting lato-bold font-small text-start bordered-solid-1 colour-border-transparent"} onClick={() => actionLabelSelection("Offline Meeting")}>
                            Offline Meeting
                        </button>
                        <button className={taskLabelData.includes("ASAP") ? "task-label-item ms-0 mb-2 w-100 quicks-button asap lato-bold font-small text-start bordered-solid-1 colour-border-blue" : "task-label-item ms-0 mb-2 w-100 quicks-button asap lato-bold font-small text-start bordered-solid-1 colour-border-transparent"} onClick={() => actionLabelSelection("ASAP")}>
                            ASAP
                        </button>
                        <button className={taskLabelData.includes("Client Related") ? "task-label-item ms-0 mb-2 w-100 quicks-button client-related lato-bold font-small text-start bordered-solid-1 colour-border-blue" : "task-label-item ms-0 mb-2 w-100 quicks-button client-related lato-bold font-small text-start bordered-solid-1 colour-border-transparent"} onClick={() => actionLabelSelection("Client Related")}>
                            Client Related
                        </button>
                        <button className={taskLabelData.includes("Self Task") ? "task-label-item ms-0 mb-2 w-100 quicks-button self-task lato-bold font-small text-start bordered-solid-1 colour-border-blue" : "task-label-item ms-0 mb-2 w-100 quicks-button self-task lato-bold font-small text-start bordered-solid-1 colour-border-transparent"} onClick={() => actionLabelSelection("Self Task")}>
                            Self Task
                        </button>
                        <button className={taskLabelData.includes("Appointments") ? "task-label-item ms-0 w-100 quicks-button appointments lato-bold font-small text-start bordered-solid-1 colour-border-blue" : "task-label-item ms-0 w-100 quicks-button appointments lato-bold font-small text-start bordered-solid-1 colour-border-transparent"} onClick={() => actionLabelSelection("Appointments")}>
                            Appointments
                        </button>
                        <button className={taskLabelData.includes("Court Related") ? "task-label-item ms-0 mb-1 w-100 quicks-button court-related lato-bold font-small text-start bordered-solid-1 colour-border-blue" : "task-label-item ms-0 mb-1 w-100 quicks-button court-related lato-bold font-small text-start bordered-solid-1 colour-border-transparent"} onClick={() => actionLabelSelection("Court Related")}>
                            Court Related
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-100 task-label-list">
                {
                    taskLabelData.map((task: string, index: number) => {
                        let clsName = task.toLowerCase().replace(/\s/g, "-");
                        return (
                            <div key={index} className={`task-label-item lato-bold font-small text-center ${clsName} colour-front-dark-gray`}>
                                {task}
                            </div>
                        )
                    })
                }
                {/* <div className="task-label-item lato-bold font-small text-center important-asap colour-front-dark-gray">
                    Important ASAP
                </div> */}
            </div>
        </div>
    )
}

export default TaskLabel