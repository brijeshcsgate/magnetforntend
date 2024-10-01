import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { resizeImage } from './resizeImage';
import TextToggler from './TextToggler';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Close } from '@mui/icons-material';

const ServicesCarousel = ({ images }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false); // Close dialog only when the Cancel button is clicked
};
  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(images.length - 3, prevIndex + 1));
  };

  return (
    <div className="relative w-full  mx-auto">
      <div className="flex overflow-hidden" style={{marginLeft:'25px'}}>
        {images.slice(startIndex, startIndex + 3).map((item, index) => (
          <div key={startIndex + index} className=" col col-m-12 col-t-6 col-d-4 p-2 transition-all duration-300 ease-in-out">
           
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
                    <a href='#' className="has-popup">
                      <img src={item.image} alt={item.name} style={resizeImage(342, 228)} />
                    </a>
                  </div>
                  <div className="content-box">
                    <a href='#' className="name has-popup">
                      {item.name}
                    </a>
                    <TextToggler text={item.description} charLimit={20} isShowBtn={false} />
                    <div className="service-bts flex-row-g20" >
                      <button onClick={()=>setOpen(true)}className="btn btn_animated has-popup">
                        <span className="circle center_icon">View detail</span>
                      </button>
                      <a
                        href='#'
                        className="btn extra contact-btn btn_animated has-popup"
                      >
                        <span className="circle center_icon">Enquiry</span>
                      </a>
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
                    <a href='#' className="has-popup">
                      <img src={item.image} alt={item.name} style={resizeImage(342, 228)} />
                    </a>
                  </div>
                  <div className="content-box">
                    <a href='#' className="name has-popup">
                      {item.name}
                    </a>
                    <TextToggler text={item.description} charLimit={200} isShowBtn={false} />
                   
                  </div>
                </div>

                </DialogContent>
            </Dialog>


          </div>
        ))}
      </div>
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
        disabled={startIndex >= images.length - 3}
        style={{right:'-25px'}}
        className="absolute  top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200 ease-in-out disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ServicesCarousel;
