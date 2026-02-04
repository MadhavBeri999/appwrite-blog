import { useEffect, useState } from 'react'

import './App.css'

import { useDispatch } from 'react-redux'
import authService from './appwrite/auth.js'//kyonki isi service ke andar hai get user and we will ask from it directly that get user is working for now or not .
import { login, logout } from './store/authslice'
import { Header, Footer } from "./components"
import { Outlet } from 'react-router-dom'
//loding karani hain jaan nahi issi se hi pata chalega 

function App() {

  // 1st step State banahi hai to show while loading the user data
  const [loading, setloading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getcurrentuser()
      .then((userdata) => {
        /* HERE THE THING THAT WE ARE TRYING IS THAT AUTHSERVICE SE NIKAL RAHE HAIN
           KI AGAR USER LOGGED IN HAIN YAAN NAHI
           USKE BAAD AGAR LOGGED IN HAI TOH DISPATCH SE USKO LOGIN REDUCER MEIN
           BHEJ RAHE HAIN KI USKI STATE GLOBALLY JISKO BHI CHAIYE PATA HO
           KI VOH PARTICULAR USER LOGGED IN HAI */

        if (userdata) {
          dispatch(login(userdata)) // ✅ FIXED (NO OBJECT WRAP)
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setloading(false))
  }, [])


  return !loading ? (

    <div className="min-h-screen flex flex-wrap content-between bg-gray-50">


      <div className="w-full">

        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />

      </div>
    </div>
  ) : (null)
}

export default App
