import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { db } from '../../firebase/firebase'
import { doc, setDoc } from "firebase/firestore";

export function SignInWithGoogle() {

  // Import navigate from react router dom
  const navigate = useNavigate()

  // Import auth and provider from firebase
  const auth = getAuth()
  const provider = new GoogleAuthProvider()

  // Sign in with google function
  function handleSignInWithGoogle() {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        await setDoc(doc(db, "users", result.user.uid), {
          favoriteSongs: []
        })
          .then(() => {
            navigate("/")
          })
          .catch((error) => {
            toast.error("Something wrong!")
          })
      }).catch((error) => {
        toast.error("Something wrong!")
      })
  }

  return { handleSignInWithGoogle }
}