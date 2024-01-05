"use client"
import store from './store/store'
import { Provider } from 'react-redux'
import Main from './main'
export default function Home() {
  return (
    <Provider store={store}>
        <Main />
    </Provider>
  )
}
