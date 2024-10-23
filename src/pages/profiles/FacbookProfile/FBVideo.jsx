import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SwiperCore from 'swiper';

import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/swiper-bundle.css';
import { Grid } from '@mui/material';

// Install Swiper modules
SwiperCore.use([Navigation, Pagination]);

const FBVideo = ({ videos }) => {


  return (
    <section className="mt-65 fbmainbody pt-4 pb-2 mn-pad" id="">


      <div className=" mx-auto px-3 ">
        <div className="flex flex-wrap">
          <div className=" lg:w-1/3">
            <div className="fbheader-section mb-2 px-4">
              <h2 className="text-3xl font-semibold">
                Our <span className="text-blue-500">Videos</span>
              </h2>
            </div>
          </div>
        </div>

        <Swiper className="mySwiper pl-2 pr-3"
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
            },
          }}
        >
          {/* {JSON.stringify(linksArray)} */}
          {videos.map((video, index) => (
            //    <Grid sx={12} md={6} lg={4}>

            <SwiperSlide>

              <div className="swiper-slide pt-2 pl-2 pb-2" key={index}>

                <div className="fbservice-box fbbg-white    ">
                  <iframe
                    className="w-full h-64 rounded-md"
                    src={video?.link}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="mt-2 cursor-pointer" data-bs-toggle="modal" data-bs-target="#myvid">
                  <p className="text-lg">{video?.name}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* </div> */}

    </section>
  );
};

export default FBVideo;
