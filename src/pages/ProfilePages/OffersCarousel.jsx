import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { resizeImage } from './resizeImage';
import TextToggler from './TextToggler';
import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import { Close } from '@mui/icons-material';
import { green } from '@mui/material/colors';

const OffersCarousel = ({ offers = [] }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to determine device type based on width
  const getDeviceType = () => {
    if (width < 768) return 1;
    if (width < 1024) return 2;
    return 3;
  };

  const handleClose = () => {
    setOpen(false); // Close dialog only when the Cancel button is clicked
};
  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(offers.length - getDeviceType(), prevIndex + 1));
  };

  const [count, setCount] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCount(true);
    setTimeout(() => {
      setCount(false);
    }, 500); // Delay for animation
  };
  return (
    <div className="relative w-full  mx-auto">
      {/* <div className="flex overflow-hidden" style={{ marginLeft: '25px' }}> */}
      <Grid container spacing={2} className="overflow-hidden"style={{paddingTop:'25px',paddingBottom:'25px',paddingLeft:'10px',paddingRight:'10px'}} >
    
        {offers.slice(startIndex, startIndex + getDeviceType()).map((offer, index) => (
        
        <Grid item xs={12} md={6} lg={4}>
       
       <div key={startIndex + index} 
      //  className="  transition-all duration-300 ease-in-out" 
       >
            <div
              key={index}
              className=" box-item f-mockup animated"
              data-sr-id="4"
              style={{
                visibility: 'visible',
                transform: 'translateY(0px) scale(1)',
                opacity: '1',
                transition:
                  'all 0.5s cubic-bezier(0.6, 0.2, 0.1, 1), transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1), opacity 0.5s cubic-bezier(0.6, 0.2, 0.1, 1)',
                left: '0%',
                top: '0px',
              }}
              onClick={()=>setOpen(true)}
            >
              <div className="image">
                <div className="has-popup">
                  <img
                    src={offer?.image}
                    style={resizeImage(342, 228)}
                    // className="p-in-image-slide"
                    // className={`p-in-image-slide2 ${count ? "p-in-slide-out" : "p-in-slide-in"
                      // }`}
                    alt={offer?.name}
                  />
                </div>
              </div>
              <div className="content-box">
                <div className="name has-popup">
                  {offer?.name}
                </div>
                <p><TextToggler text={offer?.description} charLimit={20} isShowBtn={false} /></p>

                <div className="service-bts flex-row-g15 flex-col">
                  {/* <div className="btn btn_animated has-popup"> */}
                    <span className="circle center_icon2" style={{color:''}}>
                      <b>Starts:</b>
                     {offer?.startDate} {offer?.startTime}
                    </span>
                  {/* </div> */}
                  {/* <div
                    className="btn extra contact-btn btn_animated has-popup"
                  > */}
                    <span className="circle center_icon2" style={{color:''}}>
                        <b>Ends:</b>
                     {offer?.endDate} {offer?.endTime}
                    </span>
                  {/* </div> */}
                </div>
              </div>

            </div>


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                // maxWidth="md"  
                fullWidth
                
            >
                <DialogTitle style={{ fontSize: '16px', fontWeight: '700' , display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
                    
                    <span></span><span onClick={handleClose}><Close /></span>
                </DialogTitle>
                <DialogContent>
                  <div>
                <div className="image">
                <div className="has-popup">
                  <img
                    src={offer?.image}
                    // className="p-in-image-slide"
                    // className={`p-in-image-slide2 ${count ? "p-in-slide-out" : "p-in-slide-in"
                      // }`}
                    alt={offer?.name}
                  />
                </div>
              </div>
              <div className="content-box">
                <div className="name has-popup">
                  {offer?.name}
                </div>
                <p>{offer?.description}</p>

                <div className="service-bts flex-row-g20">
                  {/* <a  className="btn btn_animated has-popup"> */}
                  <span className="circle center_icon" style={{color:'green'}}>
                      <b>Starts:</b>
                      {offer?.startDate} {offer?.startTime}
                    </span>
                    
                    <span className="circle center_icon" style={{color:'orange'}}>
                      <b>Ends:</b>
                      {offer?.endDate} {offer?.endTime}
                    </span>
                 
                </div>
              </div>

            </div>
                </DialogContent>
            </Dialog>

          </div>
          </Grid>
        ))}
        
        </Grid>
      <button
        onClick={handlePrev}
        disabled={startIndex === 0}
        style={{ left: '-25px' }}
        className="absolute  top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200 ease-in-out disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        disabled={startIndex >= offers.length - getDeviceType()}
        style={{ right: '-25px' }}
        className="absolute  top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200 ease-in-out disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default OffersCarousel;
