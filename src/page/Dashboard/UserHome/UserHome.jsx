import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UserHome = () => {
    const { user } = useAuth()
    const [axiosSecure] = useAxiosSecure()

    console.log(user);

    const { data: userInfo = {}, isLoading } = useQuery({
        queryKey: ['user-home', user.email],
        queryFn: async () => {
            const res = await axiosSecure(`/user-home?email=${user.email}`)
            return res.data
        }
    })

    if (isLoading) {
        return <progress className="progress w-56" value={0} max="100"></progress>
    }

    return (
        <div className='w-full h-full p-4'>
            <h3 className="text-3xl m-2 mb-3 font-bold">Hi, {user?.displayName || 'Anonymous'}</h3>
            <div className="stats shadow w-full">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div className="stat-title">Total Menu</div>
                    <div className="stat-value">{userInfo.totalMenu}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                    </div>
                    <div className="stat-title">Total Order</div>
                    <div className="stat-value">{userInfo.totalOrder}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                    </div>
                    <div className="stat-title">Total payment</div>
                    <div className="stat-value">${userInfo.totalPayment}</div>
                </div>

            </div>

            <div className='md:flex mt-4 gap-3'>
                <div className='w-full md:w-1/2 flex justify-center items-center bg-[#FFEDD5] h-[300px] mb-2'>
                    <div>
                        <div className='flex justify-center'>
                            <div className='w-[150px]  border-2 border-orange-700 rounded-full bg-white overflow-auto'>
                                <img className='w-full h-full' src={user.photoURL} />
                            </div>
                        </div>
                        <h3 className="text-2xl m-2 mb-3 font-bold">{user?.displayName || 'Anonymous'}</h3>
                    </div>
                </div>
                <div className='w-full md:w-1/2 flex justify-center items-center bg-[#FEF9C3] h-[300px]'>
                    <div>
                        <h3 className='text-3xl'>Your Activities</h3>
                        <p className='text-base font-semibold text-[#0088FE] mt-4'>Orders: {userInfo.totalOrder}</p>
                        {/* <p>Reviews: </p>
                    <p>Bookings: </p> */}
                        <p className='text-base font-semibold text-[#FF8042]'>Payments: ${userInfo.totalPayment}</p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default UserHome;