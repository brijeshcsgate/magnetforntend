import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid } from '@mui/material';
// import { Navigation, Pagination } from 'swiper';

import { Navigation,Pagination } from 'swiper/modules';
import 'swiper/css';

const FBService = ({profileImage}) => {
  return (
    <section id="" className="fbmainbody pt-4 pb-2 ">
      {/* container */}
      <div className=" mx-auto px-3 ">
        <div className="flex flex-wrap">
          <div className=" lg:w-1/3">
            <div className="fbheader-section mb-2 px-4">
              <h2 className="text-3xl font-semibold">
                WHAT WE <span className="text-blue-500">Service</span>
              </h2>
            </div>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={3}
          className="mySwiper pl-2 pr-3"
          // style={{display:'flex'}}
        >
          {/* Slide 1 */}
            <Grid container sx={{ marginTop: 0, paddingTop: 0 }}>
                
           
            {Array.from({ length: 5}).map((_, index) => (
                <Grid sx={12} md={8} lg={4} >
          
          {/* <SwiperSlide > */}
          <div className='p-2'>
            <div className="fbservice-box fbbg-white  rounded-lg p-6 ">
              <div className="fbelement">
                <div
                  className="fbshape bg-blue-500 h-16 w-16 mb-4 cursor-pointer"
                  data-bs-toggle="modal"
                  data-bs-target="#myModal"
                >
                  <img src={profileImage} alt="" className="w-full  object-cover rounded-md" />
                  
                </div>
              </div>
              <div className="fbservice-containet">
                <h3 className="text-xl font-semibold mb-2">LIFE INSURANCE</h3>
                <p className="text-gray-700 mb-4">
                  Mauris volutpat urna tristique finibus iaculis. Morbi facilisis.
                </p>
                <div className="flex space-x-4 justify-center">
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    className="text-blue-500 hover:underline"
                  >
                    View detail
                  </a>
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    className="text-blue-500 hover:underline"
                  >
                    Enquiry
                  </a>
                </div>
              </div>
            </div>
            </div>
            
          {/* </SwiperSlide> */}

              </Grid>
            ))}
             </Grid>
        </Swiper>

        <div className="fbswiper-button-next"></div>
        <div className="fbswiper-button-prev"></div>
        <div className="fbswiper-pagination"></div>
      </div>
    </section>
  );
};

export default FBService;
