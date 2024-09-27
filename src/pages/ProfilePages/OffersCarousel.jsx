import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { resizeImage } from './resizeImage';
import TextToggler from './TextToggler';

const OffersCarousel = ({ offers = [] }) => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(offers.length - 3, prevIndex + 1));
  };

  const [count, setCount] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCount(true);
    setTimeout(() => {
      setCount(false);
    }, 500); // Delay for animation
  };
  return (
    <div className="relative w-full  mx-auto">
      <div className="flex overflow-hidden" style={{ marginLeft: '25px' }}>
        {offers.slice(startIndex, startIndex + 3).map((offer, index) => (
          <div key={startIndex + index} className="col col-m-12 col-t-6 col-d-4 p-2 transition-all duration-300 ease-in-out">
            <div
              key={index}
              className=" box-item f-mockup animated"
              data-sr-id="4"
              style={{
                visibility: 'visible',
                transform: 'translateY(0px) scale(1)',
                opacity: '1',
                transition:
                  'all 0.5s cubic-bezier(0.6, 0.2, 0.1, 1), transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1), opacity 0.5s cubic-bezier(0.6, 0.2, 0.1, 1)',
                left: '0%',
                top: '0px',
              }}
            >
              <div className="image">
                <a href={`#popup-${index}`} className="has-popup">
                  <img
                    src={offer?.image}
                    // className="p-in-image-slide"
                    className={`p-in-image-slide2 ${count ? "p-in-slide-out" : "p-in-slide-in"
                      }`}
                    alt={offer?.name}
                  />
                </a>
              </div>
              <div className="content-box">
                <a href={`#popup-${index}`} className="name has-popup">
                  {offer?.name}
                </a>
                <p>{offer?.description}</p>

                <div className="service-bts flex-row-g20">
                  <a href={`#popup-${index}`} className="btn btn_animated has-popup">
                    <span className="circle center_icon">
                      Starts:
                      {offer?.startDate} {offer?.startTime}
                    </span>
                  </a>
                  <a
                    href={`#popup-${index}`}
                    className="btn extra contact-btn btn_animated has-popup"
                  >
                    <span className="circle center_icon">
                      Ends:
                      {offer?.endDate} {offer?.endTime}
                    </span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handlePrev}
        disabled={startIndex === 0}
        style={{ left: '-25px' }}
        className="absolute  top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200 ease-in-out disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        disabled={startIndex >= offers.length - 3}
        style={{ right: '-25px' }}
        className="absolute  top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200 ease-in-out disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default OffersCarousel;
