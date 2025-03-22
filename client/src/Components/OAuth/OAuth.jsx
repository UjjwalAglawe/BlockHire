import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../../reducer/user/userSlice';
import axios from 'axios';

export default function OAuth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            console.log('Google Sign-In Success:', result);

            const { data } = await axios.post('/api/auth/google', {
                name: result.user.displayName,
                email: result.user.email,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            dispatch(signInSuccess(data));

            console.log('Backend Response:', data);

            navigate('/');
        } catch (error) {
            console.error('Google Sign-In Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <button
            onClick={handleGoogleClick}
            type="button"
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-sm transition-colors duration-200"
        >
            Continue with Google
        </button>
    );
}
