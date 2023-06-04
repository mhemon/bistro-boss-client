import { Helmet } from "react-helmet-async";
import useCart from "../../../hooks/useCart";
import { BsFillTrash3Fill } from "react-icons/bs";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyCart = () => {
    const [cart, refetch] = useCart()
    const result = cart.reduce((sum, item) => item.price + sum, 0)

    const handleDelete = item => {
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
              fetch(`http://localhost:5000/carts/${item._id}`, {
                method : 'DELETE'
              })
              .then(res => res.json())
              .then(() => {
                refetch()
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
              })
            }
          })
    }
    return (
        <div className="mt-4 h-[100vh]">
            <Helmet>
                <title>Bistro Boss | MyCart</title>
            </Helmet>
            <div className="uppercase font-semibold flex h-[60px] justify-around items-center md:gap-10 px-2">
                <p className="text-2xl">Total Order : {cart.length}</p>
                <p className="text-2xl">Total Price : ${result.toFixed(2)}</p>
               <Link to="/dashboard/payment"><button className="btn btn-warning btn-sm">Complete Payment</button></Link>
            </div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Item Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => <tr key={item._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image} alt="Item Images" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td className="text-end">{item.price}</td>
                                <th>
                                    <button onClick={() => handleDelete(item)} className="btn btn-ghost bg-red-600 text-white"> <BsFillTrash3Fill size='1.3em'/> </button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyCart;