import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import '@smastrom/react-rating/style.css'
import { Rating } from '@smastrom/react-rating';
import { FaQuoteLeft } from "react-icons/fa";

const Testomonial = () => {
    const [review, setReview] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReview(data))
    }, [])
    return (
        <section className='mt-10'>
            <SectionTitle
                subHeading="What Our Client Say"
                heading="TESTIMONIALS"
            ></SectionTitle>
            <div>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {
                        review.map(review => <SwiperSlide key={review._id}>
                            <div className='text-center py-8 md:py-10 space-y-4 flex flex-col items-center justify-center px-4'>
                            <FaQuoteLeft size='4em'/>
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <p>{review.details}</p>
                            <h3 className='text-yellow-500 text-2xl'>{review.name}</h3>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </section>
    );
};

export default Testomonial;