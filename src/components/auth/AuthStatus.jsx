import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

// This component is listen that the user is logged in or not
export function AuthStatus() {

    // Logged in boolean state 
    const [loggedIn, setLoggedIn] = useState(false)

    // If the user logged in or not then the checkingStatus value set to false.
    // If checkingStatus is true then this app show the loading component.
    const [checkingStatus, setCheckingStatus] = useState(true)

    useEffect(() => {
        // OnAuthStateChanged is listen the user auth.
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(true)
            } else {
                setLoggedIn(false)
            }
            setCheckingStatus(false)
        })
    }, [])
    return { loggedIn, checkingStatus }
}