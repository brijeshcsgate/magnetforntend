import React, { useContext, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
// import { Navigation, Pagination } from 'swiper';
import { resizeImage } from '../../ProfilePages/resizeImage';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import TextToggler from '@/pages/ProfilePages/TextToggler';
import EnquiryForm from '@/components/EnquiryForm/EnquiryForm';
import { ContextAPI } from "../../../contextAPI/ContextProfileV2";
import { Close } from '@mui/icons-material';
import FBEnquiryForm from '@/components/EnquiryForm/FBEnquiryForm';

const FBService = ({ services, profileUserId, visitorInfo }) => {
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
  const [serviceData, setServiceData] = useState(services);
  // const { setServiceModalDataV2 } = useContext(ContextAPI);
  // const handleSendServiceV1ModalData = (ele) => {
  //   setServiceModalDataV2(ele);
  // };
  return (
    <section id="" className="fbmainbody pt-4 pb-2 mn-pad">
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
            },
          }}
          // >

          className="mySwiper pl-2 pr-3"
        // style={{display:'flex'}}
        >
          {/* Slide 1 */}
          {/* <Grid container sx={{ marginTop: 0, paddingTop: 0 }}> */}


          {serviceData?.length > 0 &&
            serviceData?.map((item, index) => (
              // <Grid sx={12} md={6} lg={4} >

              <SwiperSlide >
                <div className='p-2' key={item.id}>
                  <div className="fbservice-box fbbg-white  rounded-lg  ">
                    <div className="fbelement">
                      {/* <div
                  className="  rotate-image fbshape bg-blue-500 h-16 w-16 mb-4 cursor-pointer"
                  data-bs-toggle="modal"
                  data-bs-target="#myModal"
                > */}
                      <img src={item.image} alt={item.name} style={resizeImage(380, 290)}
                        className="w-full  object-cover image-cut fbshape rotate-image"
                      //  className="    object-cover rotate-image "  rotate-image rounded-md fbshape
                      />

                      {/* </div> */}
                    </div>
                    <div className="fbservice-containet">
                      <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                      <p className="text-gray-700 mb-4">
                        <TextToggler text={item.description} charLimit={30} isShowBtn={false} />
                      </p>
                      <div className="flex space-x-4 justify-center">

                        <button onClick={() => handleOpen(item)} className="fb-ser-button" >
                          <span className="">View detail</span>
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
                            {/* style={resizeImage(342, 228)} */}
                            <img src={selectedItem.image} alt={selectedItem.name} />
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

        <div className="fbswiper-button-next"></div>
        <div className="fbswiper-button-prev"></div>
        <div className="fbswiper-pagination"></div>
      </div>
    </section>
  );
};

export default FBService;
