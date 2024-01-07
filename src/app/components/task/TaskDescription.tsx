import { useState, ChangeEvent, useRef, FC, useEffect } from "react"
import { DescriptionProps } from "@/app/interface"

const TaskDescription: FC<DescriptionProps> = (props) => {
    const [descriptionValue, setDescriptionValue] = useState<string | undefined>("text" in props ? props['text'] : "")
    // const totalLines: number | undefined = descriptionValue?.split('\n').length
    // const [textAreaRow, setTextAreaRow] = useState<number | undefined>(totalLines)
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

    const [textAreaHeight, setTextAreaHeight] = useState<number>(0)

    const autoResizeHeight = () => {
        textAreaRef.current!.style.height = 'auto';
        textAreaRef.current!.style.height = `${textAreaRef.current!.scrollHeight}px`;
    }

    useEffect(() => {
        // setTextAreaRow(descriptionValue?.split('\n').length)
        autoResizeHeight()
    }, [descriptionValue])

    useEffect(() => {
        autoResizeHeight()
    })

    return (
        <div className="task-description quicks-ms-n4">
            <div className="d-flex justify-content-center me-3 quicks-mt-n3 align-items-start">
                <button className="quicks-button" onClick={() => {
                    textAreaRef.current?.focus()
                }}>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.2165 0C12.0082 0 11.7915 0.0833333 11.6332 0.241667L10.1082 1.76667L13.2332 4.89167L14.7582 3.36667C15.0832 3.04167 15.0832 2.51667 14.7582 2.19167L12.8082 0.241667C12.6415 0.075 12.4332 0 12.2165 0ZM9.21667 5.01667L9.98333 5.78333L2.43333 13.3333H1.66667V12.5667L9.21667 5.01667ZM0 11.875L9.21667 2.65833L12.3417 5.78333L3.125 15H0V11.875Z" fill={
                            descriptionValue ? "#2F80ED" : "#828282"
                        } />
                    </svg>
                </button>
            </div>
            <textarea ref={textAreaRef} onFocus={() => {
                textAreaRef.current?.setSelectionRange(0, descriptionValue!.length)
            }} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                setDescriptionValue(e.target.value)
            }} className="lato-regular font-small" placeholder="No Description" rows={1} value={descriptionValue}></textarea>
        </div>
    )
}

export default TaskDescription