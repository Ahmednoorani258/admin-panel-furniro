// import Login from '@/components/auth/Login'
import {SignIn} from "@clerk/nextjs"
import React from 'react'

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
    {/* <Login/> */}
    <SignIn appearance={{ elements: { footer: "hidden" } }}/>
    </div>
  )
}

export default Home