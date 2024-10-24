

import React, { useContext, useState } from "react";
import styles from "./styles/profileV2.module.css";
import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import ServiceModal from "../../../components/profile-v2/ServiceModal";
import { ContextAPI } from "../../../contextAPI/ContextProfileV2";
import TextToggler from "@/pages/ProfilePages/TextToggler";
import { Close } from '@mui/icons-material';
import EnquiryForm from "@/components/EnquiryForm/EnquiryForm";
const Offers = ({ item, profileUserId, visitorInfo }) => {

  const [productData, setProductData] = useState(item);
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
  return (
    <>
      <div className={styles.OffersContainer}>
        <h2 className='text-secondary'>Offers</h2>
        {productData?.length > 0 &&
          productData.map((item, index) => (

            <div className={styles.singleServiceContainer}>
              <div className={styles.singleServiceImage}>
                <img src={item?.image} alt={item?.name} />
              </div>
              <div className={styles.singleServiceDetails}>
                <div>
                  <div className={styles.singleServiceTitle}>
                    <h3 className="text-secondary">{item?.name}</h3>
                  </div>
                  <div className={`${styles.singleServiceText} text-secondary`}>
                    <TextToggler text={item?.description} charLimit={280} isShowBtn={false} />
                  </div>
                  <p className="text-secondary">
                    <b>Start Date:</b>{" "}{item.startDate}, {item.startTime}
                    <br />
                    <b>End Date:</b>{" "}{item.endDate}, {item.endTime}                    </p>


                  <div className={styles.singleServiceButtons}>
                    <button
                      className="text-secondary"
                      data-bs-toggle="modal"
                      // data-bs-target="#serviceModal"
                      onClick={() => handleOpen(item)}
                    >
                      View Details
                    </button>
                    <EnquiryForm profileUserId={profileUserId} visitorInfo={visitorInfo} cl='text-secondary' />

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
                          <img src={item?.image} alt="" className="w-full  object-cover rounded-md" />

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
                        <h6 className="text-secondary">
                          Start Date:{" "}{item.startDate}, {item.startTime}
                          <br />
                          {/* </h6> */}
                          {/* <h6 className="text-primary"> */}
                          End Date:{" "}{item.endDate}, {item.endTime}                    </h6>

                      </div>
                    </div>)}

                </DialogContent>
              </Dialog>
            </div>

          ))}
      </div>
    </>
  );
};

export default Offers;
