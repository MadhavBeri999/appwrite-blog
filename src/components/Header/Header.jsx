import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Header() {
    const authStatus = useSelector((state) => state.auth.status) //status of store waal kar rahe hain
    const navigate = useNavigate()
    const navItems = [    //useNavigat() ke saath use kiya jata jin- jin routes par bhi jana hai idhar se decide hojat hai ki kahn kahan par jana hai by all these items
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus, //above waale auth status se we are aski.ng and will be use for the conditional rendring 
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },


    ]
    return (
        <header className='py-3 shadow bg-white'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'> {/*1.Iss waali div mein toh logo hi rakhna hai  */}
                        <Link to='/'>
                            <Logo />

                        </Link>
                    </div>
                    <ul className='flex ml-auto'> {/*2. yahan se unorderd list shuru hojonai hai and ismein jo bhi values chaiye voh ismein daal sakte hain.. */}
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>{/*//html element repeat hota hai usmein key lagani hoti hai  */}
                                    <button onClick={() => navigate(item.slug)}
                                        className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full text-gray-700 font-medium'> {/*Issi button se hamare paas puuri navigation honi hai  */}
                                        {item.name}

                                    </button>
                                </li>
                            ) : null
                        )}   {/*Kyunki logout button dikhana hain yaaa nahi CONDITIONAL RENDRING */}
                        {authStatus && (
                            <li>
                                <LogoutBtn />  {/*If hamare paas auth status hai toh hum show kar denge warna toh skip hii kardenge  */}
                            </li>
                        )}


                    </ul>
                </nav>

            </Container>
        </header>
    )
}

export default Header