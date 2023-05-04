import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { db } from './firebase/firebase'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <div className='App'>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
