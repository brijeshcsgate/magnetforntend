
import React, { useState, useEffect, useCallback } from 'react';
import { resizeImage } from './resizeImage';

const ImageSliderFB = ({ images, autoChangeInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  const goToNext = useCallback(() => {
    setFadeIn(false); // Start fade out
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images?.length);
      setFadeIn(true); // Start fade in
    }, 500); // Half of the transition duration
  }, [images?.length]);

  useEffect(() => {
    const changeInterval = setInterval(goToNext, autoChangeInterval);
    return () => clearInterval(changeInterval);
  }, [goToNext, autoChangeInterval]);

  if (!images || images.length === 0) {
    return <div className="text-center p-4">No images available</div>;
  }

  return (
    <div className="relative w-full h-44 md:h-96 overflow-hidden">
      <div 
        className={`absolute inset-0 transition-opacity mb-2 duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
      >
        <img 
          src={images[currentIndex]} 
          alt={`Image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          // style={resizeImage(380, 290)}
        />
      </div>
      
      {/* Indicator dots */}
      {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-300"
            }`}
          />
        ))}
      </div> */}
    </div>
  );
};

export default ImageSliderFB;
