import './App.css'
import Signup_login from './pages/signup/signup-login'
import SignupSuccess from './pages/signup/signup-success'
import Loader from './components/loader'
import * as React from 'react'
import {
  createBrowserRouter,
  RouterProvider
}from 'react-router-dom'

const Router = createBrowserRouter([
  {
    path:'/auth',
    element: <Signup_login page="login"/>
  },
  {
    path:'/auth/login',
    element:<Signup_login page="login"/>
  },
  {
    path:'/auth/signup',
    element:<Signup_login page="signup"/>
  },
  {
    path:'/auth/forget-password',
    element:<Signup_login page="forget-password"/>
  },
  {
    path:'/auth/success',
    element: <SignupSuccess/>
  },
  {
    path:'/loader',
    element:<Loader/>
  }
])

function App() {

  return (
    <>
      <React.StrictMode>
        <RouterProvider router={Router}/>
      </React.StrictMode>
    </>
  )
}

export default App
