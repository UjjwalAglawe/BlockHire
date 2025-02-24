import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import axios from 'axios'; // Import axios

const OAuth = () => {
    const navigate = useNavigate();

    const handleGoogleClick = async () => {

        console.log("clicked")
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            console.log(result);

            const res = await axios.post('/api/auth/google', {
                name: result.user.displayName,
                email: result.user.email,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Use res.data instead of res.json()
            console.log(res.data)

            navigate('/');
        } catch (error) {
            console.log('could not sign in with google', error);
        }
    };

    return (
        <button onClick={handleGoogleClick}
            type='button'
            className="w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md shadow-sm transition-colors duration-200"
        >
            Continue with google
        </button>
    )
}

export default OAuth;
