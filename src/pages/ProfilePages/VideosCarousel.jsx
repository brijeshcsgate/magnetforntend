import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { resizeImage } from './resizeImage';
import TextToggler from './TextToggler';
import VideoCard from './VideoCard';

const VideosCarousel = ({ videos }) => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(videos.length - 3, prevIndex + 1));
  };

  return (
    <div className="relative w-full  mx-auto">
      <div className="flex overflow-hidden" style={{marginLeft:'25px'}}>
        {videos.slice(startIndex, startIndex + 3).map((video, index) => (
          <div key={startIndex + index} className="col col-m-12 col-t-6 col-d-4 p-2 transition-all duration-300 ease-in-out">
            <VideoCard
                  key={index}
                  popupHref={video?.link}
                  videoSrc={video?.link}
                  title={video?.name}
                  dataSrId={video?.dataSrId}
                />          </div>
        ))}
      </div>
      <button
        onClick={handlePrev}
        disabled={startIndex === 0}
        style={{left:'-25px'}}
        className="absolute  top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200 ease-in-out disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        disabled={startIndex >= videos.length - 3}
        style={{right:'-25px'}}
        className="absolute  top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200 ease-in-out disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default VideosCarousel;
