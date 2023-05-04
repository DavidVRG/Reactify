import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SignUpWithEmail } from '../components/auth/SignUpWithEmail'
import Loading from '../components/utils/Loading'

export default function SignUp() {

  // Import SignUp from SignUpWithEmail component
  const { signUp } = SignUpWithEmail()

  // Set userdata state
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    name: ""
  })
  const { email, password, repeatPassword, name } = userData

  // Set userdata function
  function onChangeUserData(e) {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  // Set loading for wait firebase response
  const [loading, setLoading] = useState(false)

  return (
    loading ? (<Loading />) : (
      <main className='w-screen h-screen overflow-auto'>

        <div className='w-full py-6 border-b-[1px] border-slate-200'>
          <h1 className='flex items-center justify-center gap-2'>
            <img src="logo.png" alt="Reactify" className='w-14 h-14' />
            <span className='text-3xl font-medium'>Reactify</span>
          </h1>
        </div>

        <div className='max-w-sm space-y-3 w-[95%] md:w-full mx-auto py-8'>

          <h2 className='text-sm font-bold text-center'>Sign in to Reactify to continue.</h2>

          <button
            className='flex items-center justify-center gap-2 border text-gray-800 border-gray-400 hover:border-gray-800 transition duration-200 ease-in-out p-3 w-full rounded-3xl font-medium'>
            <img src="google.png" alt="Google" className='w-8 h-8' />
            <span>Continue with Google</span>
          </button>

          <div className='flex items-center gap-3'>
            <div className='w-full h-[1px] bg-slate-300' />
            <div className='font-medium text-lg'>or</div>
            <div className='w-full h-[1px] bg-slate-300' />
          </div>

          <form className='space-y-4' onSubmit={(event) => signUp(event, email, password, repeatPassword, setLoading, name)}>

            <div>
              <label
                htmlFor="email"
                className='text-sm font-medium'>Email address</label>
              <input
                value={email}
                name='email'
                onChange={(e) => onChangeUserData(e)}
                id='email'
                type="email"
                placeholder='Email address'
                className='w-full border border-gray-400 rounded-sm mt-1 p-2' />
            </div>

            <div>
              <label
                htmlFor="name"
                className='text-sm font-medium'>Name</label>
              <input
                value={name}
                name='name'
                onChange={(e) => onChangeUserData(e)}
                id='name'
                type="name"
                placeholder='Name'
                className='w-full border border-gray-400 rounded-sm mt-1 p-2' />
            </div>

            <div>
              <label
                htmlFor="password"
                className='text-sm font-medium'>Password</label>
              <input
                value={password}
                name='password'
                onChange={(e) => onChangeUserData(e)}
                id='password'
                type="password"
                placeholder='Password'
                className='w-full border border-gray-400 rounded-sm mt-1 p-2' />
            </div>

            <div>
              <label
                htmlFor="repeat-password"
                className='text-sm font-medium'>Repat password</label>
              <input
                value={repeatPassword}
                name='repeatPassword'
                onChange={(e) => onChangeUserData(e)}
                id='repeat-password'
                type="password"
                placeholder='Repat password'
                className='w-full border border-gray-400 rounded-sm mt-1 p-2' />
            </div>

            <Link
              to="/sign-in"
              className='block text-md underline'>
              You have an account?
            </Link>

            <button
              type="submit"
              className='w-full p-3 bg-green-500 hover:scale-105 transition duration-200 ease-in-out font-medium rounded-3xl uppercase tracking-wide'>
              Sign Up
            </button>

          </form>

        </div>

      </main>
    )
  )
}