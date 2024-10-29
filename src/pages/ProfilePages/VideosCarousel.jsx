import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { resizeImage } from './resizeImage';
import TextToggler from './TextToggler';
import VideoCard from './VideoCard';
import { Grid } from '@mui/material';

const VideosCarousel = ({ videos }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to determine device type based on width
  const getDeviceType = () => {
    if (width < 768) return 1;
    if (width < 1024) return 2;
    return 3;
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(videos.length - getDeviceType(), prevIndex + 1));
  };

  return (
    <div className="relative w-full  mx-auto">
      {/* <div className="flex overflow-hidden" style={{marginLeft:'25px'}}> */}
      <Grid container spacing={2} className="overflow-hidden py25px25" >
   
        {videos.slice(startIndex, startIndex + getDeviceType()).map((video, index) => (
      <Grid item xs={12} md={6} lg={4}>
        
      <div key={startIndex + index} className="  transition-all duration-300 ease-in-out">
            <VideoCard
                  key={index}
                  popupHref={video?.link}
                  videoSrc={video?.link}
                  title={video?.name}
                  dataSrId={video?.dataSrId}
                />          </div>
        </Grid>
        ))}
        
        </Grid>
       <button
        onClick={handlePrev}
        disabled={startIndex === 0}
       
        className="absolute left25 top-1/2 transform -translate-y-1/2 lrbtn p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200 ease-in-out disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        disabled={startIndex >= videos.length - getDeviceType()}
        
        className="absolute right25 top-1/2 transform -translate-y-1/2 lrbtn p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200 ease-in-out disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default VideosCarousel;
