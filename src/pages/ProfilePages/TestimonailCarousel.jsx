

// import React, { useEffect, useState } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { resizeImage } from './resizeImage';
// import TextToggler from './TextToggler';

// import "../ProfilePageCss/custom.css";

// const TestimonialCarousel = ({ testimonials }) => {
//   const [startIndex, setStartIndex] = useState(0);

//   const handlePrev = () => {
//     setStartIndex((prevIndex) => Math.max(0, prevIndex - 1));
//   };

//   const handleNext = () => {
//     setStartIndex((prevIndex) => Math.min(testimonials.length - 3, prevIndex + 1));
//   };
//   const [count, setCount] = useState(true);
  
//   const [currentIndex, setCurrentIndex] = useState(0);
//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 2500);

//     return () => clearInterval(interval);
//   }, []);

//   const nextSlide = () => {
//     setCount(true);
//     setTimeout(() => {
      
//       setCount(false);
//     }, 500); // Delay for animation
//   };
//   return (
//     <div className="relative w-full  mx-auto">
//       <div className="flex overflow-hidden" style={{ marginLeft: '25px' }}>
//         {testimonials.slice(startIndex, startIndex + 3).map((profileDetails, index) => (
//           <div key={startIndex + index} className="col  p-2 transition-all duration-300 ease-in-out ">
//           <div
//                         key={index}
//                         style={{ width: '100%' }}
//                       >
//                         <div className="item">
//                           <div className="content-box">
//                             <div className="reviews-item">
//                               <div className="image">
//                                 <img src={profileDetails?.profileImg} alt={profileDetails?.name} />
//                               </div>
//                               <div className="name">
//                                 — {profileDetails?.name}, {profileDetails?.profession}--pend
//                               </div>
//                               <p className="wd-100">
//                                 {profileDetails?.description}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//           </div>
//         ))}
//       </div>
//       <button
//         onClick={handlePrev}
//         disabled={startIndex === 0}
//         style={{ left: '-25px',backgroundColor:'red' }}
//         className="absolute  top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200 ease-in-out disabled:opacity-30 disabled:cursor-not-allowed"
//       >
//         <ChevronLeft className="w-6 h-6" />
//       </button>
//       <button
//         onClick={handleNext}
//         disabled={startIndex >= testimonials.length - 3}
//         style={{ right: '-25px',backgroundColor:'red' }}
//         className="absolute  top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200 ease-in-out disabled:opacity-30 disabled:cursor-not-allowed"
//       >
//         <ChevronRight className="w-6 h-6" />
//       </button>
//     </div>
//   );
// };

// export default TestimonialCarousel;



import img3 from "./Images/product.jpg";
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Testimonial.css'
const TestimonialCarousel = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNextSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setTimeout(() => setIsTransitioning(false), 500); // Match this with CSS transition duration
    }
  }, [testimonials.length, isTransitioning]);

  const goToPrevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [goToNextSlide]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="overflow-hidden w-full">
        <div 
          className={` slideshow-container ${isTransitioning ? 'transitioning' : ''}`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((profileDetails, index) => (
            <div key={index} className="slide">
             
                        <div className="item w-full">
                          <div className="content-box">
                            <div className="reviews-item">
                              <div className="image">
                                <img src={profileDetails?.profileImg?profileDetails?.profileImg:img3} alt={profileDetails?.name} 
                                />
                              </div>
                              <div className="name">
                                — {profileDetails?.name}, {profileDetails?.profession}--pend
                              </div>
                              <p className="wd-100">
                                {profileDetails?.description}
                              </p>
                            </div>
                          </div>
                        </div>
            
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={goToPrevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200 ease-in-out z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200 ease-in-out z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default TestimonialCarousel;
