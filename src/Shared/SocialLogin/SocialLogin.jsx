import React from 'react';
import { useContext } from 'react';
import { BsGoogle } from "react-icons/bs";
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const { googleLogin } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleGoogle = () => {
        googleLogin()
            .then((result) => {
                // console.log(result.user.displayName, result.user.email);
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ name: result.user.displayName, email: result.user.email })
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true });
                    })
            })
            .catch(error => {
                console.error(error)
                Swal.fire({
                    icon: 'error',
                    title: `${error.code}`
                })
            })
    }
    return (
        <div>
            <div className="divider"></div>
            <div className='flex justify-center items-center pb-4'>
                <button onClick={handleGoogle} className="btn btn-circle">
                    <BsGoogle />
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;