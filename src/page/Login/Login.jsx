import React, { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import SocialLogin from '../../Shared/SocialLogin/SocialLogin';

const Login = () => {

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const { loginUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [showpass, setShowPass] = useState(false)
    const handleFormSubmit = (event) => {
        event.preventDefault()
        const form = event.target
        const email = form.email.value
        const password = form.password.value
        const captcha = form.captcha.value
        console.log(email, password);
        if (validateCaptcha(captcha) == true) {
            loginUser(email, password)
                .then(() => {
                    navigate(from, { replace: true });
                })
                .catch(error => {
                    console.error(error)
                    Swal.fire({
                        icon: 'error',
                        title: `${error.code}`
                    })
                })
        }

        else {
            alert('Captcha Does Not Match');
            return
        }
    }
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="md:w-1/2 text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">We never share your data with anybody. We respect every one privacy.</p>
                    </div>
                    <div className="card flex md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleFormSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name='email' type="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className='flex items-center'>
                                    <input name='password' type={showpass ? 'text' : 'password'} placeholder="password" className="input input-bordered w-full" />
                                    <span className='-ml-8'>{showpass ? <AiFillEyeInvisible onClick={() => setShowPass(!showpass)} title='hide password' /> : <AiFillEye onClick={() => setShowPass(!showpass)} title='show password' />}</span>
                                </div>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <LoadCanvasTemplate />
                                <input name='captcha' type="text" placeholder="captcha" className="input input-bordered mt-2" />
                            </div>
                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-primary">Login</button>
                            </div>
                            <Link to='/signup'><p className='text-center'>New here? SignUp</p></Link>
                        </form>
                        <SocialLogin/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;