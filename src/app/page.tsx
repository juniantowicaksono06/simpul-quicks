"use client"
import store from '@/app/store/store'
import { Provider } from 'react-redux'
import Main from '@/app/main'

export default function Home() {
  return (
    <Provider store={store}>
        <Main />
    </Provider>
  )
}
