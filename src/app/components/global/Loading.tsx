import { LoadingProps } from "@/app/interface"

const Loading: React.FC<LoadingProps> = (props: LoadingProps) => {
    let sizeClass = "quicks-spinner-large"
    if("size" in props) {
        if(props['size'] == "SMALL") {
            sizeClass = "quicks-spinner-small"
        }
    }
    return (
        <div className="text-center">
            <div className={
                !("className" in props) ? `spinner-border ${sizeClass} quicks-spinner-gray` :  `spinner-border ${sizeClass} ${props.className}`
            } role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            {
                "text" in props ?
                <h6 className="mt-2">{props.text}</h6>
                : <></>
            }
        </div>
    )
}

export default Loading