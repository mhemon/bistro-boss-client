import React from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import useMenu from '../../hooks/useMenu';
import { GrUserAdmin } from 'react-icons/gr';
import { BsFillTrash3Fill } from 'react-icons/bs';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageItem = () => {
    const [menu, , refetch] = useMenu()
    const [axiosSecure] = useAxiosSecure()

    const handleDelete = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/menu/${item._id}`)
                    .then(res => {
                        if(res.data.deletedCount > 0){
                            refetch()
                            Swal.fire(
                              'Deleted!',
                              'Your item has been deleted.',
                              'success'
                            )
                        }
                    })
            }
        })
    }
    return (
        <div className='w-full h-full'>
            <SectionTitle heading='Manage Items' subHeading='Hurry up' />

            <div className="overflow-x-auto mx-4">
                <table className="table w-full mx-auto">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Item Image</th>
                            <th>Item Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menu.map((item, index) => <tr key={item._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    {item.category}
                                </td>
                                <td className='text-right'>
                                    ${item.price}
                                </td>
                                <th>
                                    <button className="btn btn-ghost bg-[#D1A054] text-white">
                                        <GrUserAdmin size='1.3em' />
                                    </button>
                                </th>
                                <th>
                                    <button onClick={() => handleDelete(item)} className="btn btn-ghost bg-red-600 text-white">
                                        <BsFillTrash3Fill size='1.3em' />
                                    </button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageItem;