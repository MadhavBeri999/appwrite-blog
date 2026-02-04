
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authslice'
import { useDispatch } from 'react-redux'
import Button from './Button'
import Logo from './Logo'
import Input from './Input'
import authService from '../appwrite/auth'
import { useForm } from "react-hook-form"

function Login() {
    console.log("LOGIN PAGE RENDERED");

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, seterror] = useState("")

    //HAMARE PAAS TO HANDLE SUBMIT HAI THEN WHY GIVING THE NAME AS LOGIN ?
    //ISKI ALAG USAGE
    const login = async (data) => {
        seterror("") //cleaning error ..practise

        try {
            // ✅ STEP 1: create session (email + password)
            const session = await authService.login(
                data.email,
                data.password
            )

            if (!session) return

            // ✅ STEP 2: get current logged-in user
            const currentUser = await authService.getcurrentuser()

            // ✅ STEP 3: update redux state
            if (currentUser) {
                dispatch(authLogin(currentUser))
                navigate("/")
            }

        } catch (error) {
            seterror(error.message || "Login failed")
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className='mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-gray-200 shadow-lg'>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign in to your account
                </h2>

                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {error && (
                    <p className="text-red-600 mt-8 text-center">{error}</p>
                )}

                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>

                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
                                        || "Email address must be a valid address",
                                }
                            })}
                        />

                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />

                        <Button type="submit" className="w-full">
                            Sign in
                        </Button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
