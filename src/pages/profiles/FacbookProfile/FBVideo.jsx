import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SwiperCore from 'swiper';

import { Navigation,Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/swiper-bundle.css';
import { Grid } from '@mui/material';

// Install Swiper modules
SwiperCore.use([Navigation, Pagination]);

const FBVideo = ({videos}) => {

const linksArray = videos.map(item => item.link);
const namesArray = videos.map(item => item.name);
    const videos2 = [
        "https://www.youtube.com/embed/Zhawgd0REhA",
        "https://www.youtube.com/embed/Zhawgd0REhA",
        "https://www.youtube.com/embed/Zhawgd0REhA",
        "https://www.youtube.com/embed/Zhawgd0REhA",
        "https://www.youtube.com/embed/Zhawgd0REhA",
        "https://www.youtube.com/embed/Zhawgd0REhA",
        "https://www.youtube.com/embed/Zhawgd0REhA",
        "https://www.youtube.com/embed/Zhawgd0REhA",
        "https://www.youtube.com/embed/Zhawgd0REhA",
    ];

    return (
        <section className="mt-65 fbmainbody" id="">
        <div className="fbcontainer mn-pad mx-auto px-5">
    
        <div className="  pb-4">
            <div className="fbcontainer mx-auto">
            <div className="row">
          <div className="col-md-10 col-lg-8">
            <div className="fbheader-section px-4">
            <h2 className="text-3xl font-semibold">
               Our <span className="text-blue-500">Videos</span>
              </h2>
            </div>
          </div>
        </div>

                <Swiper className="mt-4 px-4" 
                // navigation pagination
                
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                // slidesPerView={3} // Set to how many slides you want visible at a time
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    // When the screen width is >= 1024px (desktop)
                    1024: {
                      slidesPerView: 3,  // Show 3 slides for larger screens
                    },
                    // When the screen width is >= 768px (tablet)
                    768: {
                      slidesPerView: 2,  // Show 2 slides for tablet view
                    },
                    // When the screen width is >= 640px (mobile)
                    640: {
                      slidesPerView: 1,  // Show 1 slide for mobile view
                    },}}
                >
             {/* {JSON.stringify(linksArray)} */}
                    {videos.map((video, index) => (
                        //    <Grid sx={12} md={6} lg={4}>
             
                        <SwiperSlide key={index} className="flex flex-col items-center ">
                            <iframe
                                className="w-full h-64 rounded-md"
                                src={video?.link}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                            <div className="mt-2 cursor-pointer" data-bs-toggle="modal" data-bs-target="#myvid">
                                <p className="text-lg">{video?.name}</p>
                            </div>
                        </SwiperSlide>
                ))}
                </Swiper>
            </div>
        </div>
        </div>
        </section>
    );
};

export default FBVideo;
