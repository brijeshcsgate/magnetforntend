// import React, { useState, useEffect, useCallback } from 'react';
// import { resizeImage } from './resizeImage';

// const ImageSliderBulk = ({ images, autoSlideInterval = 2000 }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const goToNext = useCallback(() => {
//     setCurrentIndex((prevIndex) => 
//       (prevIndex + 1) % images.length
//     );
//   }, [images.length]);

//   useEffect(() => {
//     const slideInterval = setInterval(goToNext, autoSlideInterval);
//     return () => clearInterval(slideInterval);
//   }, [goToNext, autoSlideInterval]);

// //   if (!images || images.length === 0) {
// //     return <div className="text-center p-4">No images available</div>;
// //   }

//   return (
//     <div className="relative w-full h-64 md:h-96 overflow-hidden">
//       <div 
//         className="flex transition-transform ease-out duration-500"
//         style={{ 
//         //   transform: `translateX(-${currentIndex * 100}%)`,
//           width: `${images.length * 100}%`
//         }}
//       >
//         {images.map((img, index) => (
//           <img 
//             key={index} 
//             src={img} 
//             alt={`Slide ${index + 1}`}
//             className="w-full h-full object-cover"
//             style={resizeImage(342, 228)}
//           />
//         ))}
//       </div>
      
//       {/* Indicator dots */}
//       {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {images.map((_, index) => (
//           <div
//             key={index}
//             className={`w-2 h-2 rounded-full ${
//               currentIndex === index ? "bg-white" : "bg-gray-300"
//             }`}
//           />
//         ))}
//       </div> */}
//     </div>
//   );
// };

// export default ImageSliderBulk;
// // "description": "FleetWare offers a comprehensive solution for managing your vehicle inventory, stock movement, fuel control, and tracking, providing you with key benefits:\n\nStreamlined Stock Control\nGain full transparency of your stock by location (showroom or stockyard), saving time on physical audits and allowing your team to focus on more productive tasks. Classify stock as For Sale, Demo, and more for easy organization.\n\nEfficient Stock Movement\nSimplify stock transfers, driver allocation, and fuel management with a dedicated Android app for drivers, ensuring a seamless and structured workflow.\n\nFuel Expense Management\nGain detailed insights into fuel expenses for sales, service, and maintenance. Real-time reconciliation of fuel bills saves both time and money while ensuring cost control.\n\nIoT & Telematics Integration\nSafeguard your vehicles with advanced tracking, driving behavior analysis, and vehicle health monitoring, ensuring your assets are handled responsibly.\n\nWith FleetWare, optimize efficiency, reduce costs, and ensure better control of your vehicle fleet operations.",
// // "image": [
// //     "https://magne8.s3.ap-south-1.amazonaws.com/image_picker_D306F952-73A0-4EE1-9F22-B108188E3311-23362-00000817B3EC12E4.jpg",
// //     "https://magne8.s3.ap-south-1.amazonaws.com/image_picker_D6DB810B-2ED2-4769-9068-5CE4EA1DF675-23362-00000817BAE711C3.jpg",
// //     "https://magne8.s3.ap-south-1.amazonaws.com/image_picker_E3745DB0-8AC1-4FE4-BF09-13A07B974BFC-23362-00000817C51735AF.jpg",
// //     "https://magne8.s3.ap-south-1.amazonaws.com/image_picker_EAFA8C85-2C3C-4CDA-9D5F-A9F88E7C17C1-23362-00000817CE361E3E.jpg",
// //     "https://magne8.s3.ap-south-1.amazonaws.com/image_picker_0CC0E308-029E-425D-8970-ED106140F114-23362-00000817D34478E7.jpg"
// // ],















import React, { useState, useEffect, useCallback } from 'react';
import { resizeImage } from './resizeImage';

const ImageSliderBulk = ({ images, autoChangeInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  const goToNext = useCallback(() => {
    setFadeIn(false); // Start fade out
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setFadeIn(true); // Start fade in
    }, 500); // Half of the transition duration
  }, [images.length]);

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
        className={`absolute inset-0 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
      >
        <img 
          src={images[currentIndex]} 
          alt={`Image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          // style={resizeImage(342, 228)}
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

export default ImageSliderBulk;
