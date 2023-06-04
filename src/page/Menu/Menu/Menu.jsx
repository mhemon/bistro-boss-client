import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../../Shared/Cover/Cover';
import img1 from '../../../assets/menu/banner3.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import PopularMenu from '../../Home/PopularMenu/PopularMenu';
import useMenu from '../../../hooks/useMenu';
import MenuCategory from '../../../Shared/MenuCategory/MenuCategory';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';


const Menu = () => {
    const [menu] = useMenu()
    const offered = menu.filter(item => item.category === 'offered')
    const dessert = menu.filter(item => item.category === 'dessert')
    const pizza = menu.filter(item => item.category === 'pizza')
    const salad = menu.filter(item => item.category === 'salad')
    const soup = menu.filter(item => item.category === 'soup')
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover img={img1} title="OUR MENU"/>
            <SectionTitle heading="TODAY'S OFFER" subHeading="Don't miss"></SectionTitle>
            <MenuCategory items={offered}></MenuCategory>
            <MenuCategory items={dessert} title="dessert" img={dessertImg}></MenuCategory>
            <MenuCategory items={pizza} title="pizza" img={pizzaImg}></MenuCategory>
            <MenuCategory items={salad} title="salad" img={saladImg}></MenuCategory>
            <MenuCategory items={soup} title="soup" img={soupImg}></MenuCategory>
        </div>
    );
};

export default Menu;