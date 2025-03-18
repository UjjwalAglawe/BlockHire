import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            console.log(result)

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                }),
            });
            const data = await res.json();
            // dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            console.log('could not sign in with google', error);
        }
    };
    return (
        <button
            onClick={handleGoogleClick}
            type='button'
            className='w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-sm transition-colors duration-200'
        >
            Continue with google
        </button>
    );
}