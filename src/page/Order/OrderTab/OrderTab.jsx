import React from 'react';
import FoodCart from '../../../components/FoodCart/FoodCart';

const OrderTab = ({items}) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10 py-4'>
            {
                items.map(item => <FoodCart key={item._id} item={item}></FoodCart>)
            }
        </div>
    );
};

export default OrderTab;