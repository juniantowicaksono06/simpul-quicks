import "@/app/css/task.css"
import TaskCard  from "@/app/components/task/TaskCard"
import React, { useEffect, useState, useRef } from "react"
import { TaskCardProps, TaskList } from "@/app/interface"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/app/store/store"
import { showLoading, hideLoading } from "@/app/state/app"
import Loading from '@/app/components/global/Loading'

const Task = () => {
    const [optionOpened, setOptionOpened] = useState<boolean>(false)
    const [taskId, setTaskId] = useState<number>(0)
    const [taskName, setTaskName] = useState<string>("")
    const [taskList, setTaskList] = useState<Array<TaskList>>([])
    const [taskData, setTaskData] = useState<Array<TaskCardProps>>([])
    const isLoading: boolean = useSelector<RootState, boolean>((state) => state.app.loading)
    const dispatch = useDispatch()
    const data1: TaskCardProps = {
        id: 1,
        date: "07/01/2024",
        title: "Set up documentation report for several Cases : Case 145443, Case 192829 and Case 182203",
        description: "Hello World\nHow are you?",
        taskStatus: "DONE",
        daysLeft: 2
    }
    
    const data2: TaskCardProps = {
        id: 2,
        title: "Set up documentation report for several Cases : Case 145443, Case 192829 and Case 182203",
        description: "Hello World\nHow are you?",
        taskStatus: "NOT DONE"
    }

    const optionRef = useRef<HTMLDivElement | null>(null)
    const optionContentRef = useRef<HTMLDivElement | null>(null)

    const taskTopbarRef = useRef<HTMLDivElement | null>(null)
    const taskContainerRef = useRef<HTMLDivElement | null>(null)
    const [containerContentHeight, setContainerContentHeight] = useState<number>(0)

    const actionChangeTask = (id: number, _taskName: string) => {
        setTaskId(id)
        setTaskName(_taskName)
    }

    const fetchTaskData = async () => {
        const response = await fetch(`${process.env.API_BASE_URL}/task-detail/${taskId}`)
        if(!response.ok) {
            alert("Ooops... something wrong!")
            return
        }
        const result = await response.json()
        const data: Array<TaskCardProps> = result['taskList']
        setTaskData(data)
        
        dispatch(hideLoading())
    }

    useEffect(() => {
        dispatch(showLoading())
        setContainerContentHeight( document.querySelector('#Popup')!.clientHeight - taskTopbarRef.current!.clientHeight - 10)

        document.addEventListener("click", function(event: MouseEvent) {
            if((optionRef.current && !optionRef.current.contains(event.target as Node)) && (optionContentRef.current && !optionContentRef.current.contains(event.target as Node))) {
                setOptionOpened(false)
            }
        })

        const fetchTaskList = async () => {
            const response = await fetch(`${process.env.API_BASE_URL}/task-list`)
            if(!response.ok) {
                alert("Ooops... something wrong!")
                return
            }
            const data: Array<TaskList> = await response.json()
            setTaskId(data[0]['id'])
            setTaskName(data[0]['taskName'])
            setTaskList(data)
        }
        fetchTaskList()

    }, [])

    useEffect(() => {
        if(taskId == 0) return
        fetchTaskData()
    }, [taskId])

    return (
        <>
            <div ref={taskTopbarRef} id="TaskTopbar">
                <div className="d-flex justify-content-between ps-2 pe-0">
                    <div className="position-relative">
                        <div className="ms-5 colour-border-gray justify-content-center align-items-center" id="BtnTaskSelection" onClick={() => {
                            setOptionOpened(!optionOpened)
                        }} ref={optionRef}>
                            <button className="colour-back-transparent border-none">
                                <span>{ taskName }</span>
                            </button>
                            {
                                optionOpened ? 
                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.175 7.08749L5 3.27083L8.825 7.08749L10 5.91249L5 0.912495L-1.02722e-07 5.91249L1.175 7.08749Z" fill="#4F4F4F"/>
                                </svg>
                                :
                                <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.59795 0.912477L5.77295 4.72914L1.94795 0.912476L0.772949 2.08748L5.77295 7.08748L10.7729 2.08748L9.59795 0.912477Z" fill="#4F4F4F"/>
                            </svg>
                            }
                        </div>
                        <div ref={optionContentRef} className={optionOpened ? "task-selection show colour-back-white colour-border-gray" : "task-selection hide colour-back-white colour-border-gray"}>
                            {
                                taskList.map((task: TaskList, index: number) => {
                                    return (
                                        <React.Fragment key={task['id']}>
                                            <button className="btn lato-bold colour-front-black font-medium mb-0" onClick={() => {
                                                actionChangeTask(task['id'], task['taskName'])
                                            }}>
                                                <span>{ task['taskName'] }</span>
                                            </button>
                                            {
                                                index < taskList.length - 1 ? <hr className="separator mt-0" /> : <></>
                                            }
                                        </React.Fragment>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="">
                        <button className="btn colour-back-blue colour-front-white">
                            New Task
                        </button>
                    </div>
                </div>
            </div>
            {
                isLoading ? 
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <Loading text="Loading Task List..." />
                    </div>
                : 
                <>
                    <div ref={taskContainerRef} id="TaskContainer" style={{
                        maxHeight: `${containerContentHeight}px`
                    }}>
                        {
                            taskData.map((cardData: TaskCardProps) => <TaskCard {...cardData} key={cardData['id']} />)
                        }
                    </div>
                </>
            }
        </>
    )
}

export default Task