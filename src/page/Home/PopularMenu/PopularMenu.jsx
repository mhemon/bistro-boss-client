import React, { useEffect, useMemo, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCard from '../../../Shared/MenuCard/MenuCard';
import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {
    const [menu] = useMenu()
    const popular = menu.filter(item => item.category === 'popular')
    return (
        <section className='mt-16 mb-20'>
            <SectionTitle
            heading="From our menu"
            subHeading="Check it out"
            ></SectionTitle>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 px-4'>
                {
                    popular.map(item => <MenuCard
                    key={item._id}
                    item={item}></MenuCard>)
                }
            </div>
            <div className='text-center mt-8'>
            <button className="btn btn-outline border-0 border-b-2">View Full Menu</button>
            </div>
        </section>
    );
};

export default PopularMenu;