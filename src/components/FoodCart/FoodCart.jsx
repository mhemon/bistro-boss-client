import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';

const FoodCart = ({ item }) => {
    const { name, recipe, image, price, _id } = item
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [, refetch] = useCart()
    const location = useLocation()
    const handleAddToCart = item => {
        if (user && user.email) {
            const cartItem = { menuItemID: _id, name, image, price, email: user.email }
            fetch('http://localhost:5000/carts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch() //refetch to show card item
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Added to Cart!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        } else {
            Swal.fire({
                title: 'Please login to order the food',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }
    return (
        <div className="w-full md:w-96 bg-base-100">
            <figure><img className='h-60 w-full' src={image} alt={name + ' images'} /></figure>
            <div className="card-body text-center bg-gray-200">
                <h2 className='text-2xl font-bold'>{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                    <button onClick={() => handleAddToCart(item)} className="btn btn-warning btn-outline border-0 border-b-2">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCart;