import { Grid } from '@mui/material';
import React from 'react';

const FBProduct = ({profileImage}) => {
  return (
    // id products, section-services --class
    <section className="" id="">
      <div className="container mx-auto px-5">
        <div className="row px-4">
          <div className="col-md-10 col-lg-8">
            <div className="header-section">
              {/* <h2 className="title text-2xl font-semibold">
                our <span className="text-primary">products</span>
              </h2> */}
               <h2 className="text-3xl font-semibold">
               Our <span className="text-blue-500">Products</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="swiper product-br meSwiper ">
          <div className="swiper-wrapper px-3" style={{display:'flex'}}>
            <Grid container sx={{ marginTop: 0, paddingTop: 0 }}>
                
           
            {Array.from({ length: 5 }).map((_, index) => (
                <Grid sx={12} md={8} lg={4} >
              <div className="swiper-slide mt-0" key={index}>
                <div className="single-product  pr-4 rounded-lg ">
                  <div className="product-item">
                  <img src={profileImage} alt="" className="w-full  object-cover rounded-md" />
                  
                    <h5 className="font-bold">NIKE</h5>
                    <p className="description text-gray-600">
                      Express delivery inno service effective logistics solution for delivery of small cargo delivery service.
                    </p>
                    <h6 className="text-lg font-semibold">
                      $ 300 <span className="line-through text-gray-500">$ 400</span>
                    </h6>
                    <div className="button_dil flex space-x-2 mt-4">
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
              </Grid>
            ))}
             </Grid>
          </div>
          {/* Uncomment if you want pagination */}
          {/* <div className="swiper-pagination"></div> */}
        </div>
      </div>
    </section>
  );
};

export default FBProduct;
