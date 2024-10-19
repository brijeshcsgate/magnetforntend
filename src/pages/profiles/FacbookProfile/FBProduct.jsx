import { Grid } from '@mui/material';
import React from 'react';

import { Navigation,Pagination } from 'swiper/modules';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
const FBProduct = ({profileImage}) => {
  return (
    // id products, section-services --class
    <section className="fbmainbody mn-pad" id="">
      <div className="fbcontainer mx-auto px-3 ">
        <div className="row px-4">
          <div className="col-md-10 col-lg-8">
            <div className="fbheader-section">
              {/* <h2 className="title text-2xl font-semibold">
                our <span className="text-primary">products</span>
              </h2> */}
               <h2 className="text-3xl font-semibold">
               Our <span className="text-blue-500">Products</span>
              </h2>
            </div>
          </div>
        </div>
        {/* <div className="swiper product-br fbmeSwiper ">
          <div className="fbswiper-wrapper px-4" style={{display:'flex'}}> */}
            {/* <Grid container sx={{ marginTop: 0, paddingTop: 0 }}> */}
                
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
     
          className="mySwiper pl-2 pr-3"
          // style={{display:'flex'}}
        >
       
            {Array.from({ length: 5 }).map((_, index) => (
                // <Grid sx={12} md={8} lg={4} >
                <SwiperSlide > 
     
              <div className="fbswiper-slide mt-0" key={index}>
                <div className="fbsingle-product  pr-4 rounded-lg ">
                  <div className="fbproduct-item">
                  <img src={profileImage} alt="" className="w-full  object-cover rounded-md" />
                  
                    <h5 className="font-bold">NIKE</h5>
                    <p className="fbdescription text-gray-600">
                      Express delivery inno service effective logistics solution for delivery of small cargo delivery service.
                    </p>
                    <h6 className="text-lg font-semibold">
                      $ 300 <span className="line-through text-gray-500">$ 400</span>
                    </h6>
                    <div className="fbbutton_dil flex space-x-2 mt-4">
                      <a data-bs-toggle="modal" data-bs-target="#pro-pop" href="#" className="text-blue-500 hover:underline">
                        View detail
                      </a>
                      <a data-bs-toggle="modal" data-bs-target="#pro-pop" href="#" className="text-blue-500 hover:underline">
                        Enquiry
                      </a>
                    </div>
                  </div>
                  {/* <div className="card product-thum mt-4">
                    <img src={profileImage} alt="" className="w-full  object-cover rounded-md" />
                  </div> */}
                </div>
              </div>
              {/* </Grid>
            ))}
             </Grid> */}
               </SwiperSlide> 

))}
</Swiper>

          </div>
          {/* Uncomment if you want pagination */}
          {/* <div className="swiper-pagination"></div> */}
        {/* </div> */}
      {/* </div> */}
    </section>
  );
};

export default FBProduct;
