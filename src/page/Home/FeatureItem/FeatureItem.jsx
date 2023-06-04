import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import featureImg from '../../../assets/home/featured.jpg'
import './FeatureItem.css'
const FeatureItem = () => {
    return (
        <section className='custom-bg-Images pt-2 md:pt-8 md:pb-16 text-white bg-fixed'>
            <SectionTitle
            heading="From our Menu"
            subHeading="Check it out"></SectionTitle>

            <div className='md:flex justify-center items-center md:w-2/3 mx-auto py-4 px-4'>
                <img className='w-[400px]' src={featureImg} alt="" />
                <div className='md:ml-8 mt-4 space-y-3 md:mt-0 md:space-y-1'>
                    <p>March 20, 2029</p>
                    <p className='uppercase'>Where i can get some</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio earum animi odio veritatis perferendis. Consequatur reprehenderit quam dolores? Fuga, sequi.</p>
                    <button style={{borderColor: 'white', color: 'white'}} className='btn btn-warning btn-outline border-0 border-b-2'>Read More</button>
                </div>
            </div>
        </section>
    );
};

export default FeatureItem;