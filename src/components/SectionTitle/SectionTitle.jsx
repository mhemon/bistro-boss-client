import React from 'react';

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className='text-center md:w-4/12 mx-auto my-4'>
            <p className='text-yellow-500 mb-2'>---{subHeading}---</p>
            <h3 className='text-3xl uppercase py-4 border-y-4'>{heading}</h3>
        </div>
    );
};

export default SectionTitle;