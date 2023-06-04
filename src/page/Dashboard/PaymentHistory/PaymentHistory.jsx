import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
    const [axiosSecure] = useAxiosSecure()
    const { user } = useAuth()

    const {data: payment = [], isLoading} = useQuery({
        queryKey: ['payment-history'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment-history?email=${user.email}`)
            return res.data
        }
    })

    if(isLoading){
        return <progress className="progress w-56" value={0} max="100"></progress>
    }

    const formatDate = (dateString) => {
        const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
      }

    return (
        <div className='w-full h-full'>
            <SectionTitle heading='Payment history' subHeading='At a Glance' />
            <h3 className="text-3xl m-2 mb-3 font-bold">Total Payment: {payment.length}</h3>
            <div className="overflow-x-auto px-2">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payment.map(item => <tr key={item._id}>
                                <th>{item.email}</th>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                <td>{formatDate(item.date)}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;