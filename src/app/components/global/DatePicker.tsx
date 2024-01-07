import { useState, useRef, useEffect, ChangeEvent, FocusEventHandler } from "react"
import "@/app/css/datepicker.css"

import { DatePickerProps } from "@/app/interface"

const DatePicker = (props: DatePickerProps) => {
    const [dateObj, setDateObj] = useState(new Date())
    const [isDatepickerOpen, setIsDatepickerOpen] = useState(false)
    const [dateList, setDateList] = useState<Array<number | null>>([])
    const [datePickerValue, setDatePickerValue] = useState<Partial<string>|undefined>("")

    const prependZero = (num: number) => {
        return num < 10 ? `0${num}` : num
    }

    const dayNames: Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames: Array<string> = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]
    const getFirstDayName = (year: number, month: number) => {
        const firstDayOfMonth = new Date(year, month - 1, 1);
        const dayOfWeek = firstDayOfMonth.getDay();
        return dayNames[dayOfWeek];
    }

    const getMaxDate = (year: number, month: number) => {
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfCurrentMonth = new Date(firstDayOfMonth.getTime() - 1);
        const maxDate = lastDayOfCurrentMonth.getDate();
        return maxDate;
    }

    const getListDate = (year: number, month: number): Array<number | null> => {
        const firstDay: string = getFirstDayName(year, month)
        const maxDate = getMaxDate(year, month)
        const dayNames: Array<string> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const firstEmptyDate: number = dayNames.findIndex(value => value === firstDay)
        const list: Array<number | null> = Array.from({length : firstEmptyDate}, value => null)
        list.push(...Array.from({length: maxDate}, (value, index) => index + 1))
        return list
    }

    const isValidDate = (date: string = "") => {
        if(date == "") return false
        const pattern = /^\d{2}\/\d{2}\/\d{4}$/

        if(pattern.test(date)) {
            var parts = date.split('/')
            var day = parseInt(parts[0], 10)
            var month = parseInt(parts[1], 10)
            var year = parseInt(parts[2], 10)
            var daysInMonth = new Date(year, month, 0).getDate();

            if(month < 1 || month > 12) return false
            if(day < 1 || day > daysInMonth) return false

            return true
        }
        return false
    }

    const convertDateString = (inputDateString: string | undefined) => {
        if(inputDateString === undefined) return ""
        const parts = inputDateString!.split('/');
        const convertedDateString = `${parts[1]}/${parts[0]}/${parts[2]}`;
        return convertedDateString
    }

    interface DatePickerRef {
        ref1: React.MutableRefObject<HTMLInputElement | null>;
        ref2: React.MutableRefObject<HTMLDivElement | null>;
        ref3: React.MutableRefObject<HTMLDivElement | null>;
        ref4: React.MutableRefObject<HTMLButtonElement | null>;
    }

    const datePickerRef: DatePickerRef = {
        ref1: useRef(null),
        ref2: useRef(null),
        ref3: useRef(null),
        ref4: useRef(null)
    }

    const dateRef: Array<object> = []

    const actionOpenDatePicker = (type: string = "button") => {
        if(!isDatepickerOpen) {
            setIsDatepickerOpen(!isDatepickerOpen)
        }
    }

    const actionChangeNextMonth = () => {
        let dayLeftOver = getMaxDate(dateObj.getFullYear(), dateObj.getMonth() + 1)
        dayLeftOver -= (dateObj.getDate() - 1)
        dayLeftOver = dayLeftOver * 86400000
        let newTimestamp = dateObj.getTime() + dayLeftOver
        let newDateObj = new Date(newTimestamp)
        setDateObj(newDateObj)
    }

    const actionPreviousMonth = () => {
        const tmpDateObj = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
        const newDateObj = new Date(tmpDateObj.getTime() - 1);
        setDateObj(newDateObj)
    }

    const actionDateInputBlur = (date: string | undefined) => {
        if(isValidDate(date)) {
            let newDateObj = new Date(convertDateString(date))
            setDateObj(newDateObj)
            return
        }
        setDatePickerValue("")
    }

    const actionSetDate = (date: number) => {
        setDatePickerValue(`${prependZero(date)}/${prependZero(dateObj.getMonth() + 1)}/${dateObj.getFullYear()}`)
        setIsDatepickerOpen(false)
    }

    useEffect(() => {
        if("dateValue" in props) {
            if(isValidDate(props.dateValue)) {
                setDatePickerValue(props.dateValue)
                setDateObj(new Date(convertDateString(props.dateValue)))
            }
        }
        document.addEventListener("click", function(event: MouseEvent) {
            const refKeys: Array<string> = Object.keys(datePickerRef)
            if(Array.from({ length: refKeys.length}, (value, index: number) => {
                return datePickerRef[refKeys[index] as keyof DatePickerRef].current && !datePickerRef[refKeys[index] as keyof DatePickerRef].current?.contains(event.target as Node)
            }).every(value => value === true)) {
                setIsDatepickerOpen(false)
            }
        })
    }, [])
    useEffect(() => {
        setDateList(getListDate(dateObj.getFullYear(), dateObj.getMonth() + 1))
    }, [dateObj])

    useEffect(() => {
        if(!isValidDate(datePickerValue)) return
        let newDateObj = new Date(convertDateString(datePickerValue))
        setDateObj(newDateObj)
        setDateList(getListDate(dateObj.getFullYear(), dateObj.getMonth() + 1))
    }, [datePickerValue])

    return (
        <>  
            <div className="d-flex align-items-center">
                <button ref={datePickerRef['ref4']} onClick={() => {
                    datePickerRef['ref1'].current?.focus()
                    setIsDatepickerOpen(!isDatepickerOpen)
                }} className="quicks-button quicks-ms-n4">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {
                            datePickerValue && isValidDate(datePickerValue) ? <path fillRule="evenodd" clipRule="evenodd" d="M8.99199 0.666626C4.39199 0.666626 0.666992 4.39996 0.666992 8.99996C0.666992 13.6 4.39199 17.3333 8.99199 17.3333C13.6003 17.3333 17.3337 13.6 17.3337 8.99996C17.3337 4.39996 13.6003 0.666626 8.99199 0.666626ZM9.00049 15.6666C5.31715 15.6666 2.33382 12.6833 2.33382 8.99996C2.33382 5.31662 5.31715 2.33329 9.00049 2.33329C12.6838 2.33329 15.6672 5.31662 15.6672 8.99996C15.6672 12.6833 12.6838 15.6666 9.00049 15.6666ZM8.16699 4.83329H9.41699V9.20829L13.167 11.4333L12.542 12.4583L8.16699 9.83329V4.83329Z" fill="#2F80ED"/> : <path fillRule="evenodd" clipRule="evenodd" d="M8.99187 0.666687C4.39187 0.666687 0.66687 4.40002 0.66687 9.00002C0.66687 13.6 4.39187 17.3334 8.99187 17.3334C13.6002 17.3334 17.3335 13.6 17.3335 9.00002C17.3335 4.40002 13.6002 0.666687 8.99187 0.666687ZM9.00037 15.6667C5.31703 15.6667 2.3337 12.6834 2.3337 9.00002C2.3337 5.31669 5.31703 2.33335 9.00037 2.33335C12.6837 2.33335 15.667 5.31669 15.667 9.00002C15.667 12.6834 12.6837 15.6667 9.00037 15.6667ZM8.16687 4.83335H9.41687V9.20835L13.1669 11.4334L12.5419 12.4584L8.16687 9.83335V4.83335Z" fill="#4F4F4F"/>
                        }
                    </svg>
                </button>
                <div className="input-group ms-3">
                    <input type="text" value={datePickerValue} maxLength={10} onFocus={() => {
                        datePickerRef['ref1'].current?.setSelectionRange(0, datePickerValue!.length)
                        setTimeout(() => {
                            setIsDatepickerOpen(true)
                        }, 100)
                    }} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setDatePickerValue(e.target.value)
                    }} onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        actionDateInputBlur(datePickerValue);
                        if (
                            !datePickerRef['ref3'].current?.contains(e.relatedTarget as Node)
                        ) {
                            setIsDatepickerOpen(false);
                        }
                    }} className="lato-regular form-control font-small quicks-datepicker-input" placeholder="Set Date" ref={datePickerRef['ref1']} onClick={() => {
                        actionOpenDatePicker("input")
                    }} />
                    <div className="input-group-text colour-back-transparent hover-pointer" ref={datePickerRef['ref2']} onClick={() => {
                        actionOpenDatePicker()
                    }} tabIndex={0} onFocus={() => {
                        setIsDatepickerOpen(false)
                        datePickerRef['ref2'].current?.blur()
                    }}>
                        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.333 1.99996H11.6663V0.666626H10.333V1.99996H3.66634V0.666626H2.33301V1.99996H1.66634C0.933008 1.99996 0.333008 2.59996 0.333008 3.33329V14C0.333008 14.7333 0.933008 15.3333 1.66634 15.3333H12.333C13.0663 15.3333 13.6663 14.7333 13.6663 14V3.33329C13.6663 2.59996 13.0663 1.99996 12.333 1.99996ZM12.333 14H1.66634V6.66663H12.333V14ZM1.66634 5.33329H12.333V3.33329H1.66634V5.33329Z" fill="#4F4F4F"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="position-relative">
                <div ref={datePickerRef['ref3']} className={isDatepickerOpen ? "quicks-datepicker-container colour-back-white px-2 py-2 border-thin colour-border-gray rounded show" : "quicks-datepicker-container px-2 py-2 border-thin colour-border-gray rounded hide"} onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                }} tabIndex={1}>
                    <div className="d-flex justify-content-between align-items-center">
                        <button className="quicks-button" onClick={actionPreviousMonth}>
                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.91703 0.935049L5.02703 0.0500488L0.0820312 5.00005L5.03203 9.95005L5.91703 9.06505L1.85203 5.00005L5.91703 0.935049Z" fill="black" fillOpacity="0.54"/>
                            </svg>
                        </button>
                        <button className="quicks-button">
                            <h6 className="lato-regular font-medium mb-0">{ monthNames[dateObj.getMonth()] } { dateObj.getFullYear() }</h6>
                        </button>
                        <button className="quicks-button" onClick={actionChangeNextMonth}>
                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.0820313 9.06505L0.967031 9.95005L5.91703 5.00005L0.967031 0.0500488L0.0820313 0.935049L4.14703 5.00005L0.0820312 9.06505H0.0820313Z" fill="black" fillOpacity="0.54"/>
                            </svg>
                        </button>
                    </div>
                    <div className="container-content w-100 h-100">
                        <div className="quicks-datepicker-grid my-2">
                            <div className="lato-bold font-small text-center no-text-select">M</div>
                            <div className="lato-bold font-small text-center no-text-select">T</div>
                            <div className="lato-bold font-small text-center no-text-select">W</div>
                            <div className="lato-bold font-small text-center no-text-select">Th</div>
                            <div className="lato-bold font-small text-center no-text-select">F</div>
                            <div className="lato-bold font-small text-center no-text-select">S</div>
                            <div className="lato-bold font-small text-center no-text-select">S</div>
                        </div>
                        <div className="quicks-datepicker-grid my-2">
                            {
                                dateList.map((value, index) => {
                                    let d: Date | null = null
                                    let datePickerClassName = "quicks-datepicker-item"
                                    if(datePickerValue != "" && datePickerValue != null) {
                                        d = new Date(convertDateString(datePickerValue))
                                        if(d.getMonth() == dateObj.getMonth() && d.getDate() == value && d.getFullYear() == dateObj.getFullYear()) {
                                            datePickerClassName += " selected"
                                        }
                                    }
                                    return (
                                        value === null ? <div className="" key={index}>
                                            <h6 className="lato-bold font-small text-center mb-0 py-2 no-text-select"></h6>
                                        </div> : <div className={datePickerClassName} key={index} onClick={() => {
                                            actionSetDate(value)
                                        }}>
                                            <h6 className="lato-bold font-small text-center mb-0 py-2 no-text-select">{ value }</h6>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default DatePicker