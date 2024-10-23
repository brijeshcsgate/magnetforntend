import { Grid } from '@mui/material';
import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,Pagination } from 'swiper/modules';
import 'swiper/css';
import { resizeImage } from '@/pages/ProfilePages/resizeImage';
const FBImage = ({images}) => {
  // const images = Array(9).fill({
  //   src: profileImage,
  //   caption: 'Magnet',
  // });

  return (
    <section className=" fbmainbody pt-4 pb-2 mn-pad" id="">
    {/* <div className="fbcontainer mn-pad mx-auto px-5"> */}


        
      <div className=" mx-auto px-3 ">
        <div className="flex flex-wrap">
          <div className=" lg:w-1/3">
            <div className="fbheader-section mb-2 px-4">
              <h2 className="text-3xl font-semibold">
              Our <span className="text-blue-500">Images</span>
              </h2>
            </div>
          </div>
        </div>
        </div>
        {/* Swiper */}
        {/* <div className="swiper mySwiper mt-2">
          <div className="swiper-wrapper"> */}
          {/* <Grid container> */}
           <div className='pl-2 pr-5'>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          // spaceBetween={30}
          // slidesPerView={3}
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
        // >
     
          className="mySwiper pl-2 pr-2"
          // style={{display:'flex'}}
        >
                      {/* {images?.length > 0 && */}
        {images.map((image, index) => (
               <SwiperSlide > 
         
           <div className="swiper-slide py-2 pl-4" key={index}>
           <div className="fbservice-box     ">
             
                <div
                  data-bs-toggle="modal"
                  data-bs-target="#myimg"
                  className="fbimg-box relative"
                >
                  <img src={image?.image} alt="" className='fbobjectFitcover' />
                  <div className="fbtransparent-box absolute inset-0 flex items-center justify-center  bg-opacity-30 hover:bg-opacity-50 transition duration-300">
                    <div className="fbcaption text-black">
                      <p><b>{image?.name}</b></p>
                    </div>
                  </div>
                </div>
              </div>
              </div>
               </SwiperSlide> 

            ))}
        </Swiper>
        </div>
          {/* </div> */}
          {/* <div className="fbswiper-button-next"></div>
          <div className="fbswiper-button-prev"></div>
          <div className="fbswiper-pagination"></div>
        </div>
      </div> */}
    {/* </div> */}
    </section>
  );
};

export default FBImage;
