import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../firebase/firebase'


export function SignUpWithEmail() {

    // Import auth from firebase
    const auth = getAuth();

    // Import navigate from react router dom
    const navigate = useNavigate()

    // Create user with email function
    function signUp(event, email, password, repeatPassword, setLoading, name) {
        event.preventDefault()
        setLoading(true)
        if (password !== repeatPassword) {
            setLoading(false)
            toast.error("Passwords do not match!")
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {

                await updateProfile(auth.currentUser, {
                    displayName: name,
                })
                    .then(() => {
                        return
                    })
                    .catch((error) => {
                        setLoading(false)
                        toast.error("Something wrong!")
                    })

                await setDoc(doc(db, "users", userCredential.user.uid), {
                    favoriteSongs: []
                })
                    .then(() => {
                        setLoading(false)
                        navigate("/")
                    })
                    .catch((error) => {
                        setLoading(false)
                        toast.error("Something wrong")
                    })

            })
            .catch((error) => {
                setLoading(false)
                toast.error("Something wrong!")
            })
    }

    return { signUp }
}