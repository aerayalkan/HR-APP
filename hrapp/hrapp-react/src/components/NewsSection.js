import React from 'react';

const NewsSection = ({ imageSrc, title, description }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-1/4 m-2">
            <div className="w-full h-150">
                <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-gray-700">{description}</p>
            </div>
        </div>
    );
};

export default NewsSection;
