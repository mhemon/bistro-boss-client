import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { updateProfile } from 'firebase/auth';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import SocialLogin from '../../Shared/SocialLogin/SocialLogin';

const Signup = () => {
    const { createUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showpass, setShowPass] = useState(false)
    const onSubmit = data => {
        const email = data.email
        const name = data.name
        const password = data.password
        console.log(email, password, name);
        createUser(email, password)
            .then(result => {
                console.log(result)
                updateProfile(result.user, { displayName: name })
                    .then(() => {
                        // user create and name update success
                        const updateUser = {
                            name : data.name,
                            email : data.email
                        }
                        fetch('http://localhost:5000/users', {
                            method : 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(updateUser)
                        })
                        .then(res => res.json())
                        .then(() => {
                            Swal.fire({
                                title: 'Account Created!',
                                showClass: {
                                    popup: 'animate__animated animate__fadeInDown'
                                },
                                hideClass: {
                                    popup: 'animate__animated animate__fadeOutUp'
                                }
                            })
                            navigate('/')
                        })
                    })
                    .catch(error => {
                        console.error(error)
                        Swal.fire({
                            icon: 'error',
                            title: `${error.code}`,
                            text: `${error.message}`
                        })
                    })
            })
            .catch(error => {
                console.error(error)
                Swal.fire({
                    icon: 'error',
                    title: `${error.code}`,
                    text: `${error.message}`
                })
            })
    }

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Signup</title>
            </Helmet>

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left md:w-1/2">
                        <h1 className="text-5xl font-bold">Signup now!</h1>
                        <p className="py-6">We never share your data with anybody. We respect every one privacy.</p>
                    </div>
                    <div className="card flex md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input name='name' type="text" placeholder="name" className="input input-bordered" {...register("name", { required: true })} />
                                {errors.name && <span className='text-red-600'>Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name='email' type="email" placeholder="email" className="input input-bordered" {...register("email", { required: true })} />
                                {errors.email && <span className='text-red-600'>Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className='flex items-center'>
                                    <input name='password' type={showpass ? 'text' : 'password'} placeholder="password" className="input input-bordered w-full" {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])/ })} />
                                    <span className='-ml-8'>{showpass ? <AiFillEyeInvisible onClick={() => setShowPass(!showpass)} title='hide password'/> : <AiFillEye onClick={ () => setShowPass(!showpass)} title='show password'/>}</span>
                                </div>
                                {errors.password?.type === 'required' && <span className='text-red-600'>Password is required</span>}
                                {errors.password?.type === 'pattern' && <span className='text-red-600'>Password must have 1 digit & 1 upppercase & 1 lowercase & 1 special char</span>}
                                {errors.password?.type === 'minLength' && <span className='text-red-600'>Password Length Must be 6</span>}
                                {errors.password?.type === 'maxLength' && <span className='text-red-600'>Password length can not 20</span>}
                            </div>
                            <div className="form-control">
                                <button type='submit' className="btn btn-primary">Signup</button>
                            </div>
                            <Link to='/login'><p className='text-center'>Alreday have an account? Login</p></Link>
                        </form>
                        <SocialLogin/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;