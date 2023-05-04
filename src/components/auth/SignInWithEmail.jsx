import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export function SignInWithEmail() {

  // Import auth from firebase
  const auth = getAuth();

  // Import navigate from react router dom
  const navigate = useNavigate()

  // Create user with email function
  function signIn(event, email, password, setLoading) {
    event.preventDefault()
    setLoading(true)

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false)
        navigate("/")
      })
      .catch((error) => {
        setLoading(false)
        toast.error("Something wrong!")
      });

  }

  return { signIn }
}