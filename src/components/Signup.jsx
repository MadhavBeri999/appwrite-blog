import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import service from '../appwrite/conf'
import { login as authLogin } from '../store/authslice'


import { useDispatch } from 'react-redux'
import Button from './Button'

import Input from './Input'
import authService from '../appwrite/auth'
import { useForm } from "react-hook-form"
//SAME LOGIN.JSX JAISE SO MOST OF THINGS COPY PASTE import 

function Signup() {
    console.log("SIGNUP PAGE RENDERED");

    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createaccount(data.email, data.password, data.name)
            if (userData) {
                const currentUser = await authService.getcurrentuser()
                if (currentUser) {
                    dispatch(authLogin(currentUser)); // Use the login action from store
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message) // This will show "Invalid credentials" or "User already exists"
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className='mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-gray-200 shadow-lg'>
                <h2 className="text-center text-2xl font-bold">Sign up to create account</h2>

                {/* Error Display */}
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input label="Full Name: " placeholder="Enter your full name" {...register("name", { required: true })} />
                        <Input label="Email: " placeholder="Enter your email" type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input label="Password: " type="password" placeholder="Enter your password" {...register("password", { required: true })} />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup