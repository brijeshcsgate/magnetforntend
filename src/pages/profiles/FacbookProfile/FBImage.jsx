import { Grid } from '@mui/material';
import React from 'react';

const FBImage = ({profileImage}) => {
  const images = Array(9).fill({
    src: profileImage,
    caption: 'Magnet',
  });

  return (
    <section className=" fbmainbody" id="">
    <div className="fbcontainer mx-auto px-5">

    <div className=" ">
      <div className=" mx-auto px-4">
        <div className="row">
          <div className="col-md-10 col-lg-8">
            <div className="fbheader-section pt-3">
            <h2 className="text-3xl font-semibold">
               Our <span className="text-blue-500">Images</span>
              </h2>
            </div>
          </div>
        </div>
        {/* Swiper */}
        <div className="swiper mySwiper mt-2">
          <div className="swiper-wrapper">
          <Grid container>
           
            {images.map((image, index) => (
                <Grid sx={12} md={8} lg={4}>
           
           <div className="swiper-slide pr-4 pb-2" key={index}>
                <div
                  data-bs-toggle="modal"
                  data-bs-target="#myimg"
                  className="fbimg-box relative"
                >
                  <img src={image.src} alt="" className="w-full h-auto" />
                  <div className="fbtransparent-box absolute inset-0 flex items-center justify-center  bg-opacity-30 hover:bg-opacity-50 transition duration-300">
                    <div className="fbcaption text-white">
                      <p>{image.caption}</p>
                    </div>
                  </div>
                </div>
              </div>
              </Grid>
            ))}
             </Grid>
          </div>
          <div className="fbswiper-button-next"></div>
          <div className="fbswiper-button-prev"></div>
          <div className="fbswiper-pagination"></div>
        </div>
      </div>
    </div>
    </div></section>
  );
};

export default FBImage;
