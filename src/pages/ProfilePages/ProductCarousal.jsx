import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, CrossIcon } from 'lucide-react';
import { resizeImage } from './resizeImage';
import TextToggler from './TextToggler';

import "../ProfilePageCss/custom.css";
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Close } from '@mui/icons-material';

const ProductCarousal = ({ images }) => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(images.length - 3, prevIndex + 1));
  };
  const [count, setCount] = useState(true);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2500);

    return () => clearInterval(interval);
  }, []);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false); // Close dialog only when the Cancel button is clicked
};

  const nextSlide = () => {
    setCount(true);
    setTimeout(() => {
      // setCurrentIndex((prevIndex) =>
      //   prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      // );
      setCount(false);
    }, 500); // Delay for animation
  };

  return (
    <div className="relative w-full  mx-auto">
      <div className="flex overflow-hidden" style={{ marginLeft: '25px' }}>
        {images.slice(startIndex, startIndex + 3).map((product, index) => (
          <div key={startIndex + index} className="col col-m-12 col-t-6 col-d-4 p-2 transition-all duration-300 ease-in-out ">
          
            <div
              key={index}
              className=" box-item f-mockup animated "
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
            >
              <div className="image">
                <a href={`#popup-${index}`} className="has-popup">
                  <img
                    src={product?.image}
                    // className="p-in-image-slide"
                    className={`p-in-image-slide2 ${count ? "p-in-slide-out" : "p-in-slide-in"
                      }`}
                    alt={product?.name}
                  />
                </a>
              </div>
              <div className="content-box">
                <a href={`#popup-${index}`} className="name has-popup">
                  {product?.name}
                </a>
                <p>{product?.description}</p>
                <div className="pricing">
                  <i
                    style={{
                      fontSize: '12px',
                      position: 'relative',
                      top: '-8px',
                    }}
                    className="fa fa-inr"
                    aria-hidden="true"
                  ></i>
                  <a href="Javascript:void(0)" className="">
                    {' '}
                    {product?.price}
                  </a>
                  <br />
                  <span className="mrp">M.R.P.: </span>
                  <i
                    style={{
                      fontSize: '10px',
                      position: 'relative',
                      top: '-1px',
                    }}
                    className="fa fa-inr"
                    aria-hidden="true"
                  ></i>
                  <del> {product?.offerPrice}8888--Pend</del>
                </div>
                <a href={product?.websiteLink} className="product-link">
                  {product?.websiteLink}--web link Pend
                </a>
                <div className="service-bts flex-row-g20">
                  <div onClick={()=>setOpen(true)} className="btn btn_animated has-popup">
                    <span className="circle center_icon">
                      View detail
                      </span>
                  </div>
                  {/* <Button onClick={()=>setOpen(true)} className="btn btn_animated has-popup">
                    <span className="circle center_icon">View detail</span>
                  </Button> */}
                  <a
                    href={`#popup-${index}`}
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
              // key={index}
              className=" box-item f-mockup animated "
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
            >
              <div className="image">
                <a href={`#popup-${index}`} className="has-popup">
                  <img
                    src={product?.image}
                    // className="p-in-image-slide"
                    // className={`p-in-image-slide2 ${count ? "p-in-slide-out" : "p-in-slide-in"
                    //   }`}
                    alt={product?.name}
                  />
                </a>
              </div>
              <div className="content-box">
                <a href={`#popup-${index}`} className="name has-popup">
                  {product?.name}
                </a>
                <p>{product?.description}</p>
                <div className="pricing">
                  <i
                    style={{
                      fontSize: '12px',
                      position: 'relative',
                      top: '-8px',
                    }}
                    className="fa fa-inr"
                    aria-hidden="true"
                  ></i>
                  <a href="Javascript:void(0)" className="">
                    {' '}
                    {product?.price}
                  </a>
                  <br />
                  <span className="mrp">M.R.P.: </span>
                  <i
                    style={{
                      fontSize: '10px',
                      position: 'relative',
                      top: '-1px',
                    }}
                    className="fa fa-inr"
                    aria-hidden="true"
                  ></i>
                  <del> {product?.offerPrice}8888--Pend</del>
                </div>
                <a href={product?.websiteLink} className="product-link">
                  {product?.websiteLink}--web link Pend
                </a>
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
        style={{ left: '-25px' }}
        className="absolute  top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200 ease-in-out disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        disabled={startIndex >= images.length - 3}
        style={{ right: '-25px' }}
        className="absolute  top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200 ease-in-out disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-6 h-6" />
      </button>


    </div>
  );
};

export default ProductCarousal;
