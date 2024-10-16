import { Grid } from '@mui/material';
import React from 'react';

const FBImage = ({profileImage}) => {
  const images = Array(9).fill({
    src: profileImage,
    caption: 'Magnet',
  });

  return (
    <div className="border-gallery">
      <div className="container mx-auto px-4">
        <div className="row">
          <div className="col-md-10 col-lg-8">
            <div className="header-section">
              <h2 className="title text-2xl font-semibold">
                <span>Image gallery</span>
              </h2>
            </div>
          </div>
        </div>
        {/* Swiper */}
        <div className="swiper mySwiper mt-4">
          <div className="swiper-wrapper">
          <Grid container>
           
            {images.map((image, index) => (
                <Grid sx={12} md={8} lg={4}>
           
           <div className="swiper-slide" key={index}>
                <div
                  data-bs-toggle="modal"
                  data-bs-target="#myimg"
                  className="img-box relative"
                >
                  <img src={image.src} alt="" className="w-full h-auto" />
                  <div className="transparent-box absolute inset-0 flex items-center justify-center  bg-opacity-30 hover:bg-opacity-50 transition duration-300">
                    <div className="caption text-white">
                      <p>{image.caption}</p>
                    </div>
                  </div>
                </div>
              </div>
              </Grid>
            ))}
             </Grid>
          </div>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </div>
  );
};

export default FBImage;
