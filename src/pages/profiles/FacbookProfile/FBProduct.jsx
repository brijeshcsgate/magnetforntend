import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import React, { useState } from 'react';

import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import ImageSliderBulk2 from '@/pages/ProfilePages/ImageSliderBulk2';
import TextToggler from '@/pages/ProfilePages/TextToggler';
import FBEnquiryForm from '@/components/EnquiryForm/FBEnquiryForm';
import { Close } from '@mui/icons-material';
import ImageSliderFB from '@/pages/ProfilePages/ImageSliderFB';
const FBProduct = ({ products, profileUserId, visitorInfo }) => {
  const [productData, setProductData] = useState(products);
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Track the selected item for details
  const handleOpen = (item) => {
    setSelectedItem(item); // Set the clicked item
    setOpen(true); // Open the dialog
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null); // Reset the selected item when dialog is closed
  };
  // const [serviceData, setServiceData] = useState(services);

  return (
    // id products, section-services --class
    <section className="fbmainbody mn-pad" id="">

      <div className=" mx-auto px-3 ">
        <div className="flex flex-wrap">
          <div className=" lg:w-1/3">
            <div className="fbheader-section mb-2 px-4">
              <h2 className="text-3xl font-semibold">
                Our <span className="text-blue-500">Products</span>
              </h2>
            </div>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
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
          // >

          className="mySwiper pl-2 pr-3"
        >

          {productData?.length > 0 &&
            productData.map((item, index) => (
              // <Grid sx={12} md={8} lg={4} >
              <SwiperSlide >

                <div className="pl-2 pr-2 fbswiper-slide mt-0" key={index}>
                  <div className="fbsingle-product   ">
                    <div className="fbproduct-item">
                      {/* <img src={profileImage} alt="" className="w-full  object-cover rounded-md" /> */}
                      <ImageSliderFB images={item?.image} autoChangeInterval={2000} />

                      <h5 className="font-bold">{item.name}</h5>
                      <p className="fbdescription text-gray-600">
                        <TextToggler text={item.description} charLimit={280} isShowBtn={false} />
                      </p>
                      <h6 className="text-secondary">
                        MRP:{" "}{item.price}                    </h6>
                      <div className="flex space-x-4 justify-left">
                        <button onClick={() => handleOpen(item)} className="fb-ser-button" >
                          View detail
                        </button>

                        <FBEnquiryForm profileUserId={profileUserId} visitorInfo={visitorInfo} cl='text-secondary' />

                      </div>
                    </div>
                  </div>
                </div>



                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  fullWidth

                >
                  <DialogTitle style={{ fontSize: '16px', fontWeight: '700', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                    <span></span><span onClick={handleClose}><Close /></span>
                  </DialogTitle>
                  <DialogContent>
                    {selectedItem && (
                      <div
                        key={selectedItem.id}
                        // col col-m-12 col-t-6 col-d-4
                        className=" box-item f-mockup animated  transition-all duration-300 ease-in-out"
                        // data-sr-id={selectedItem.id}
                        style={{
                          visibility: "visible",
                          opacity: "1",
                          transitionBehavior: "normal, normal, normal",
                          transitionTimingFunction:
                            "ease, cubic-bezier(0.6, 0.2, 0.1, 1), cubic-bezier(0.6, 0.2, 0.1, 1)",
                          transitionDelay: "0s, 0s, 0s",
                          left: "0%",
                        }}
                      >
                        <div className="image">
                          <div className="has-popup">
                            <ImageSliderFB images={selectedItem?.image} autoChangeInterval={2000} />

                            {/* <img src={selectedItem.image} alt={selectedItem.name} /> */}
                          </div>
                        </div>
                        <div className="content-box">
                          <div className="name has-popup">
                            <strong>{selectedItem.name}</strong>
                          </div>
                          {/* <br/> */}
                          <div>
                            {selectedItem.description}
                          </div>
                          {/* <TextToggler text={selectedItem.description} charLimit={200} isShowBtn={false} /> */}

                        </div>
                      </div>)}

                  </DialogContent>
                </Dialog>
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
