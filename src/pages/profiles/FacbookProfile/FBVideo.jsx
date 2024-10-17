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

const FBVideo = () => {
    const videos = [
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
        <section className="mt-65" id="">
        <div className="container mx-auto px-5">
    
        <div className=" pt-4 pb-4">
            <div className="container mx-auto">
            <div className="row">
          <div className="col-md-10 col-lg-8">
            <div className="header-section">
            <h2 className="text-3xl font-semibold">
               Our <span className="text-blue-500">Videos</span>
              </h2>
            </div>
          </div>
        </div>

                <Swiper className="mt-4" 
                // navigation pagination
                
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={3} // Set to how many slides you want visible at a time
                navigation
                pagination={{ clickable: true }}
                >
             
                    {videos.map((video, index) => (
                        //    <Grid sx={12} md={6} lg={4}>
             
                        <SwiperSlide key={index} className="flex flex-col items-center">
                            <iframe
                                className="w-full h-64 rounded-md"
                                src={video}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                            <div className="mt-2 cursor-pointer" data-bs-toggle="modal" data-bs-target="#myvid">
                                <p className="text-lg">Magnet</p>
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
