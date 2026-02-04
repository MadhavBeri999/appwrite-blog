//THIS IS A PROTECTED CONTAINER 
//REFERING TO HOW THE ROUTES AND MECHANISM ARE PROTECTED
import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function Protected(
    { children, authentication = true } //abhi keliye toh by default isse true hi lena hai 
) {
    const navigate = useNavigate()
    const [loader, setloader] = useState(true) // by default loader kop true rakho ki voh chale 
    const authStatus = useSelector(state => state.auth.status)//actually jo hamare paas store mein jo status pada hai ham ussse lekar aarahr 
    //with the help of the useselector hook ..remember
    useEffect(() => {
        //TODO make it easy to understand 
        //another simple way but very very less secure
        /*if(authstaus == true){
        navigate('/')  (navigating to home page) 
        }
        elseif(authstatus === false){
        navigat('/login) (store se pata lag gaya ki voh toh valid hai hii nahi toh reject him )
        } 
        */
        if (authentication && authStatus !== authentication) {
            navigate("/login")

        }
        else if (!authentication && authStatus !== authentication) {
            navigate('/')
        }
        setloader(false) //kuch na kuch toh hoyega therfoer loader now false 


    }, [
        //kis kis pe dependednt hai 1.auth status , suthentication
        authStatus, authentication, navigate
    ])
    return (//Jab tak kuch bhi nahi hora tab tak keliye loading aajaye 
        loader ? <h1>Loading..</h1> : <>{children}</>
    )
}