import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import img1 from '../../../assets/home/02.jpg'
const Recommend = () => {
    return (
        <section className='mt-10'>
            <SectionTitle
                heading="CHEF RECOMMENDS"
                subHeading="Should try"
            ></SectionTitle>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 md:mb-16 mb-8 px-4'>
                <div className="w-full md:w-96 bg-base-100">
                    <figure><img src={img1} alt="Shoes" /></figure>
                    <div className="card-body text-center bg-gray-200">
                        <h2 className='text-2xl font-bold'>Caeser Salad</h2>
                        <p>Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
                        <div className="card-actions justify-center">
                            <button className="btn btn-warning btn-outline border-0 border-b-2">Add to Cart</button>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-96 bg-base-100">
                    <figure><img src={img1} alt="Shoes" /></figure>
                    <div className="card-body text-center bg-gray-200">
                        <h2 className='text-2xl font-bold'>Caeser Salad</h2>
                        <p>Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
                        <div className="card-actions justify-center">
                        <button className="btn btn-warning btn-outline border-0 border-b-2">Add to Cart</button>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-96 bg-base-100">
                    <figure><img src={img1} alt="Shoes" /></figure>
                    <div className="card-body text-center bg-gray-200">
                        <h2 className='text-2xl font-bold'>Caeser Salad</h2>
                        <p>Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
                        <div className="card-actions justify-center">
                        <button className="btn btn-warning btn-outline border-0 border-b-2">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Recommend;