import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authslice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout()     // this i sa promise theerfore it is a promisetherfore then use karna paadega 
            .then(() => {
                dispatch(logout())   //ki store ko updtae hojaye ki voh logout ho chuka hai 
            })
    }

    return (
        <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logoutHandler}

        >Logout</button>
    )
}

export default LogoutBtn