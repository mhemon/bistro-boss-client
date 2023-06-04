import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect } from 'react';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

import './CheckoutFrom.css'
import Swal from 'sweetalert2';

const CheckoutFrom = ({ cart, price }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [cardError, setCardError] = useState('')
    const { user } = useAuth()

    const [clientSecret, setClientSecret] = useState("");
    const [axiosSecure] = useAxiosSecure()

    const [processing, setProcessing] = useState(false)
    const [transaction, setTransaction] = useState('')

    useEffect(() => {
        if(price > 0){
            axiosSecure.post('/create-payment-intent', { price })
            .then(res => {
                setClientSecret(res.data.clientSecret)
            })
        }
    }, [axiosSecure, price])

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card == null) {
            return
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message)
        } else {
            setCardError('')
        }

        setProcessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    },
                },
            },
        );
        if (confirmError) {
            console.log(confirmError);
        }

        setProcessing(false)

        // console.log('payment intent', paymentIntent);
        if (paymentIntent.status === 'succeeded') {
            const transactionID = paymentIntent.id
            setTransaction(transactionID)
            const payment = {
                email: user?.email,
                transactionId: transactionID,
                price,
                date: new Date(),
                quantity: cart.length,
                cartItems: cart.map(item => item._id),
                menuItems: cart.map(item => item.menuItemID),
                status: 'service pending',
                itemNames: cart.map(item => item.name)
            }
            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertResult && res.data.deleteResult) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Payment Completed Successfully!',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                })
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className='w-2/3 mx-auto'>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />

                <button className='btn btn-primary btn-sm mt-4 w-36' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>

            </form>
            {cardError && <p className='text-red-600 w-2/3 mx-auto mt-4'>{cardError}</p>}
            {transaction && <p className='text-success w-2/3 mx-auto mt-4'>Transaction Completed, Your Transaction ID:- {transaction}</p>}
        </>
    );
};

export default CheckoutFrom;