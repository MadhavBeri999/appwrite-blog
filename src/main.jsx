import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterContextProvider, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AuthLayout from "./components/AuthLayout.jsx"
import Login from './pages/Login.jsx'
import AddPost from './pages/AddPost.jsx'
import Signup from './pages/Signup'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import AllPosts from './pages/AllPosts.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: < Home />
      },
      {
        path: '/login',
        element: ( //Parenthisis for passing more than two elements in the return
          <AuthLayout authentication={false} >  {/*passing in the authenticatio with authentication by default set to be false */}
            <Login />
          </AuthLayout>


        ),

      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}> {/* Jahan authentication nahi chaiye toh phir vahan pe false kardo  */}
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>  {/*Jahan authentication chahiye toh phir vahan pe laga dena hai authentication and that too be true or otherwise make it false */}
            {" "}
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
