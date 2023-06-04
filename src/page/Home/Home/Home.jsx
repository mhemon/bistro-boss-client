import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import chefservice from '../../../assets/home/chef-service.jpg'
import './Home.css'
import PopularMenu from '../PopularMenu/PopularMenu';
import Recommend from '../Recommend/Recommend';
import FeatureItem from '../FeatureItem/FeatureItem';
import Testomonial from '../Testomonial/Testomonial';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <Banner />
            <Category />
            <div style={{
                backgroundImage: `url(${chefservice})`
            }} className='h-80 bg-cover bg-center p-4 md:p-10'>
                <div className='bg-white h-full text-center flex items-center'>
                    <div className='p-2'>
                        <h3 className='text-3xl custom-font'>Bistro Boss</h3>
                        <p className='md:w-2/3 mx-auto py-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis dignissimos non odit ipsam repellat fuga mollitia, deserunt delectus. Possimus ipsam reiciendis explicabo pariatur fuga voluptatem culpa velit laboriosam molestiae officiis.</p>

                    </div>
                </div>
            </div>
            <PopularMenu />
            <div className='h-[250px] bg-[#151515] flex justify-center items-center'>
                <p className='text-white text-2xl md:text-4xl'>Call Us: +88 01910904227</p>
            </div>
            <Recommend />
            <FeatureItem />
            <Testomonial />
        </div>
    );
};

export default Home;