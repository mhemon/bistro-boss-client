import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { GrUserAdmin } from "react-icons/gr";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure()
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure('/users')
        console.log(res.data);
        return res.data
    })

    const handleDelete = (user) => {

    }

    const updateUserRole = (user) => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} make admin!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    return (
        <div className='w-full h-full mx-auto py-4 px-4'>
            <h3 className='text-3xl font-semibold mb-4'>Total users : {users.length}</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role === 'admin' ? 'admin' : <button onClick={() => updateUserRole(user)} className="btn btn-ghost bg-[#D1A054] text-white"> <GrUserAdmin size='1.3em' /> </button>}</td>
                                <td>
                                    <button onClick={() => handleDelete(user)} className="btn btn-ghost bg-red-600 text-white"> <BsFillTrash3Fill size='1.3em' /> </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;