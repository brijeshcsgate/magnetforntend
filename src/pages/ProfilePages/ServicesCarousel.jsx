import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { resizeImage } from './resizeImage';
import TextToggler from './TextToggler';
import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import { Close } from '@mui/icons-material';
import EnquiryInfoForm from './EnquiryInfoForm';
import EnquiryInfoFormOnClick from './EnquiryInfoFormOnClick';

const ServicesCarousel = ({ images,profileUserId,visitorInfo,footer }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [open, setOpen] = React.useState(false);
  
  const [openEf, setOpenEf] = React.useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [selectedItem, setSelectedItem] = useState(null); // Track the selected item for details
  
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
  const handleOpen = (item) => {
    setSelectedItem(item); // Set the clicked item
    setOpen(true); // Open the dialog
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null); // Reset the selected item when dialog is closed
  };
  // Function to determine device type based on width
  const getDeviceType = () => {
    if (width < 768) return 1;
    if (width < 1024) return 2;
    return 3;
  };

//   const handleClose = () => {
//     setOpen(false); // Close dialog only when the Cancel button is clicked
// };
  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(images.length - getDeviceType(), prevIndex + 1));
  };

  return (
    <div className="relative w-full  mx-auto">
      {/* <div className="flex overflow-hidden" style={{marginLeft:'25px'}}> */}
      <Grid container spacing={2} className="overflow-hidden py25px25" >
      
        {images.slice(startIndex, startIndex + getDeviceType()).map((item, index) => (
             <Grid item xs={12} md={6} lg={4}>
          <div key={startIndex + index} 
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
                    <strong> {item.name}</strong>
                    </div>
                    <br/>
                    <TextToggler text={item.description} charLimit={20} isShowBtn={false} />
                    <div className="service-bts flex-row-g20" style={{display:'flex', justifyContent:'space-between',width:'100%'}}>
                  
                  
                      <button onClick={() => handleOpen(item)}className="btn btn_animated has-popup" style={{width:'50%'}}>
                        <span className="circle center_icon">View detail</span>
                      </button>
                     
                      <div
                        className="btn extra contact-btn btn_animated has-popup"style={{width:'50%'}}
                        onClick={()=>setOpenEf(true)}
                      >
                        <span className="circle center_icon">
                    
                        <span
                    className="ink animate"
                    ></span>      Enquiry
                           </span>
                           {/* </div> */}
              
                    </div>
                           <EnquiryInfoFormOnClick openEf={openEf}  setOpenEf={setOpenEf}  profileUserId={profileUserId} visitorInfo={visitorInfo} />
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
                      <img src={selectedItem.image} alt={selectedItem.name} style={resizeImage(342, 228)} />
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


          </div>
          </Grid>
        ))}
        </Grid>
      {/* </div> */}
      <button
        onClick={handlePrev}
        disabled={startIndex === 0}
        // style={{left:'-25px'}}
        className="left25 absolute  top-1/2 transform -translate-y-1/2 lrbtn p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200 ease-in-out disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        disabled={startIndex >= images.length - getDeviceType()}
        // style={{right:'-25px'}}
        className="right25 absolute  top-1/2 transform -translate-y-1/2 lrbtn p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200 ease-in-out disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ServicesCarousel;
