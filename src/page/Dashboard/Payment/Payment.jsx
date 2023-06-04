import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import CheckoutFrom from './CheckoutFrom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useCart from '../../../hooks/useCart';

// TODO: Provide publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PK);
const Payment = () => {
    const [cart] = useCart()
    const total = cart.reduce( (sum, item) => item.price + sum , 0)
    const price = parseFloat(total.toFixed(2))
    return (
        <div className='w-full h-full'>
            <SectionTitle subHeading='please procced' heading='Payment' />
            <Elements stripe={stripePromise}>
                <CheckoutFrom cart={cart} price={price}></CheckoutFrom>
            </Elements>
        </div>
    );
};

export default Payment;