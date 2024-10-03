import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { resizeImage } from './resizeImage';
import TextToggler from './TextToggler';
import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import { Close } from '@mui/icons-material';

const ServicesCarousel = ({ images }) => {
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
    setStartIndex((prevIndex) => Math.min(images.length - getDeviceType(), prevIndex + 1));
  };

  return (
    <div className="relative w-full  mx-auto">
      {/* <div className="flex overflow-hidden" style={{marginLeft:'25px'}}> */}
      <Grid container spacing={2} className="overflow-hidden" style={{padding:'25px',paddingRight:'25px'}}>
      
        {images.slice(startIndex, startIndex + getDeviceType()).map((item, index) => (
             <Grid item xs={12} md={6} lg={4}>
          <div key={startIndex + index} 
          // className=" col col-m-12 col-t-6 col-d-4 p-2 transition-all duration-300 ease-in-out"
          >
           
            <div
                  key={index}
                  // col col-m-12 col-t-6 col-d-4
                  className=" box-item f-mockup animated  transition-all duration-300 ease-in-out" 
                  data-sr-id={item.id}
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
                      <img src={item.image} alt={item.name}
                      
                      style={resizeImage(342, 228)} />
                    </div>
                  </div>
                  <div className="content-box">
                    <div className="name has-popup">
                      {item.name}
                    </div>
                    <TextToggler text={item.description} charLimit={20} isShowBtn={false} />
                    <div className="service-bts flex-row-g20" >
                      <button onClick={()=>setOpen(true)}className="btn btn_animated has-popup">
                        <span className="circle center_icon">View detail</span>
                      </button>
                      <div
                        className="btn extra contact-btn btn_animated has-popup"
                      >
                        <span className="circle center_icon">Enquiry</span>
                      </div>
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
                <div
                  key={item.id}
                  // col col-m-12 col-t-6 col-d-4
                  className=" box-item f-mockup animated  transition-all duration-300 ease-in-out" 
                  data-sr-id={item.id}
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
                      <img src={item.image} alt={item.name} style={resizeImage(342, 228)} />
                    </div>
                  </div>
                  <div className="content-box">
                    <div className="name has-popup">
                      {item.name}
                    </div>
                    <TextToggler text={item.description} charLimit={200} isShowBtn={false} />
                   
                  </div>
                </div>

                </DialogContent>
            </Dialog>


          </div>
          </Grid>
        ))}
        </Grid>
      {/* </div> */}
      <button
        onClick={handlePrev}
        disabled={startIndex === 0}
        style={{left:'-25px'}}
        className="absolute  top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200 ease-in-out disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        disabled={startIndex >= images.length - getDeviceType()}
        style={{right:'-25px'}}
        className="absolute  top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200 ease-in-out disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ServicesCarousel;
