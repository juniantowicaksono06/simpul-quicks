
import React, { useEffect, useState } from 'react'
import Popup from './components/Popup'
import { useDispatch } from "react-redux"
import { setSelectedChat } from "./state/app"

const Main = () => {
    const [buttonStatus, setButtonStatus] = useState(0)
    const [selectedButton, setSelectedButton] = useState("")
    const dispatch = useDispatch()
  
    const actionOpenButtonSelection = () => {
      if((buttonStatus == 0 || buttonStatus == 2)) {
        setButtonStatus(1)
      }
      else if(buttonStatus == 1) {
        if(selectedButton != "") {
          setSelectedButton("")
        }
        setButtonStatus(2)
      }
    }
  
    useEffect(() => {
      if(selectedButton == "") {
        dispatch(setSelectedChat({}))
      }
    }, [selectedButton])
  
    const actionOpenMenu = (e: React.MouseEvent, type = "") => {
      e.stopPropagation()
      if(type != selectedButton) {
          dispatch(setSelectedChat({}))
      }
      setSelectedButton(type)
    }
  
    return (
    <main className="h-100 w-100">
        <div className='h-100 w-100 px-0 colour-back-extra-dark'>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className='input-group-text quicks-input-dark text-white d-inline-block h-100'>
                <i className="fas fa-search fa-1x"></i>
              </span>
            </div>
            <input type="text" className='form-control quicks-input-dark text-white' />
            {
              selectedButton == "" ? <></> : <Popup type={selectedButton} />
            }
            <div id='mainMenuButtonContainer'>
              <button className={selectedButton == "" ? "btn colour-back-blue rounded-circle" : selectedButton == "inbox" ? "btn colour-back-purple rounded-circle" : "btn colour-back-orange rounded-circle" } id="selectedButton" onClick={() => {
                actionOpenButtonSelection()
              }}>
                {
                  selectedButton == "" ? 
                    <svg width="48" height="48" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M31.4427 12.3359C32.3618 12.9486 32.6101 14.1904 31.9974 15.1094L24.737 26H35C35.7376 26 36.4153 26.406 36.7634 27.0563C37.1114 27.7066 37.0732 28.4957 36.6641 29.1094L27.3308 43.1094C26.7181 44.0285 25.4763 44.2768 24.5573 43.6641C23.6382 43.0514 23.3899 41.8097 24.0026 40.8906L31.263 30H21C20.2624 30 19.5847 29.5941 19.2367 28.9437C18.8886 28.2934 18.9268 27.5043 19.3359 26.8906L28.6692 12.8906C29.2819 11.9716 30.5237 11.7232 31.4427 12.3359Z" fill="#FFFFFF"/>
                    </svg> : selectedButton == "task" ? 
                    <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M3.11114 0.666687H23.1111C24.3334 0.666687 25.3334 1.66669 25.3334 2.88891V17.3334C25.3334 18.5556 24.3334 19.5556 23.1111 19.5556H3.11114C1.88892 19.5556 0.888916 18.5556 0.888916 17.3334V2.88891C0.888916 1.66669 1.88892 0.666687 3.11114 0.666687ZM3.11114 2.88891V17.3334H12V2.88891H3.11114ZM23.1111 17.3334H14.2222V2.88891H23.1111V17.3334ZM22 6.7778H15.3334V8.44446H22V6.7778ZM15.3334 9.55558H22V11.2222H15.3334V9.55558ZM22 12.3334H15.3334V14H22V12.3334Z" fill="#FFFFFF"/>
                    </svg> : 
                    <svg width="26" height="27" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M16.4443 0.110657H1.9999C1.38879 0.110657 0.888794 0.610657 0.888794 1.22177V16.7773L5.33324 12.3329H16.4443C17.0555 12.3329 17.5555 11.8329 17.5555 11.2218V1.22177C17.5555 0.610657 17.0555 0.110657 16.4443 0.110657ZM15.3332 2.3328V10.1106H4.41103L3.75547 10.7661L3.11103 11.4106V2.3328H15.3332ZM19.7777 4.55512H21.9999C22.611 4.55512 23.111 5.05512 23.111 5.66623V22.3329L18.6666 17.8885H6.44435C5.83324 17.8885 5.33324 17.3885 5.33324 16.7773V14.5551H19.7777V4.55512Z" fill="#FFFFFF"/>
                    </svg>
                }
              </button>
              <div className="d-flex button-selection" id="buttonSelection">
                {
                  selectedButton == "task" ? <></> : 
                  <div className={buttonStatus == 0 ? "init" : buttonStatus == 1 ? "show" : "hide"}>
                    {
                      selectedButton == "" ? 
                      <h6 className='text-white lato-regular font-small text-center mt-1'>Task</h6> : <div style={{
                        height: "19.19px",
                        marginBottom: "0.5rem"
                      }}></div>
                    }
                    <button className='btn colour-back-light rounded-circle' id="btnTask" onClick={(e: React.MouseEvent<HTMLButtonElement>) => {actionOpenMenu(e, "task")}}>
                      <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M3.11114 0.666687H23.1111C24.3334 0.666687 25.3334 1.66669 25.3334 2.88891V17.3334C25.3334 18.5556 24.3334 19.5556 23.1111 19.5556H3.11114C1.88892 19.5556 0.888916 18.5556 0.888916 17.3334V2.88891C0.888916 1.66669 1.88892 0.666687 3.11114 0.666687ZM3.11114 2.88891V17.3334H12V2.88891H3.11114ZM23.1111 17.3334H14.2222V2.88891H23.1111V17.3334ZM22 6.7778H15.3334V8.44446H22V6.7778ZM15.3334 9.55558H22V11.2222H15.3334V9.55558ZM22 12.3334H15.3334V14H22V12.3334Z" fill="#F8B76B"/>
                      </svg>
                    </button> 
                  </div>
                }
                {
                  selectedButton == "inbox" ? <></> :
                  <div className={buttonStatus == 0 ? "init" : buttonStatus == 1 ? "show" : "hide"}>
                    {
                      selectedButton == "" ? 
                      <h6 className='text-white lato-regular font-small text-center mt-1'>Inbox</h6> : <div style={{
                        height: "19.19px",
                        marginBottom: "0.5rem"
                      }}></div>
                    }
                    <button className='btn colour-back-light rounded-circle' id="btnInbox" onClick={(e: React.MouseEvent<HTMLButtonElement>) => {actionOpenMenu(e, "inbox")}}>
                      <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M16.4443 0.110657H1.9999C1.38879 0.110657 0.888794 0.610657 0.888794 1.22177V16.7773L5.33324 12.3329H16.4443C17.0555 12.3329 17.5555 11.8329 17.5555 11.2218V1.22177C17.5555 0.610657 17.0555 0.110657 16.4443 0.110657ZM15.3332 2.3328V10.1106H4.41103L3.75547 10.7661L3.11103 11.4106V2.3328H15.3332ZM19.7777 4.55512H21.9999C22.611 4.55512 23.111 5.05512 23.111 5.66623V22.3329L18.6666 17.8885H6.44435C5.83324 17.8885 5.33324 17.3885 5.33324 16.7773V14.5551H19.7777V4.55512Z" fill="#8885FF"/>
                      </svg>
                    </button>
                  </div>
                }
                <div className={selectedButton == "" ? "ellipse-behind hidden" :  "ellipse-behind showing"}></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
}

export default Main