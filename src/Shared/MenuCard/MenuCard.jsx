import React from 'react';
import './MenuCard.css'
const MenuCard = ({item}) => {
    const {name, recipe, image, price} = item
    return (
        <div className='flex space-x-4'>
            <img className='w-[100px] custom-menu-card' src={image} alt="" />
            <div className='md:ml-4'>
                <h3 className='uppercase'>{name}--------</h3>
                <p>{recipe}</p>
            </div>
            <p className='text-yellow-500'>${price}</p>
        </div>
    );
};

export default MenuCard;