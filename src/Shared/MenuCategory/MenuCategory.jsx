import React from 'react';
import MenuCard from '../MenuCard/MenuCard';
import Cover from '../Cover/Cover';
import { Link } from 'react-router-dom';

const MenuCategory = ({items, img, title}) => {
    return (
        <div className='my-16'>
            {title && <Cover img={img} title={title}/>}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 px-4'>
                {
                    items.map(item => <MenuCard
                    key={item._id}
                    item={item}></MenuCard>)
                }
            </div>
            <Link to={`/order/${title ? title : 'salad'}`}><div className='text-center my-4'>
            <button className="btn btn-outline border-0 border-b-2">Order Food</button>
            </div></Link>
        </div>
    );
};

export default MenuCategory;