import { GlobalContextProvider, useGlobalContext } from '@/Context/store'
import NotLogged from '@/components/NotLogged'
import WaitingScreen from '@/components/WaitingScreen'
import { AuthPages } from '@/constants/AuthPages'

import { OUTPUT_isLogged } from '@/interfaces/Login/output'
import { loginStatusInterface } from '@/interfaces/Status'
import '@/styles/globals.css'
import IsLogged from '@/utils/Client/LoginValidation'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'

import { io } from "socket.io-client"

export interface PagePropsInterface {
  state: OUTPUT_isLogged

}




export default function App({ Component, pageProps }: AppProps) {
  const [loginStatus, setLoginStatus] = useState<loginStatusInterface>("waiting")
  const router = useRouter()
  const [pageContext, setPageContext] = useState<PagePropsInterface>()
  const pageNeedAuth = !AuthPages.noNeedAuth.includes(router.pathname)

  const startSocketConnection = () => {

    const socket = io("ws://192.168.1.5:5000", {
      auth: {
        token: "CEBOLA FRITA"
      }
    })

    socket.on("boa-vinda", data => {
      console.log(data);
    })
    console.log("INICIANDO SOCKET");
  }

  useEffect(() => {

    if (pageNeedAuth) {
      IsLogged(state => {

        console.log(state);

        if (state.isLogged) {
          setPageContext({ state })
          setLoginStatus("logged")
          startSocketConnection()
        }
        else setLoginStatus("not-logged")
      })
    } else {
      setLoginStatus("logged")
    }
  }, [render])

  if (loginStatus == "waiting") return < WaitingScreen />
  if (loginStatus == "not-logged") return <NotLogged />

  if (loginStatus == "logged") return (
    <GlobalContextProvider>
      <Component {...pageProps} {...pageContext} />
    </GlobalContextProvider>
  )
}
