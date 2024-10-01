import { Close } from "@mui/icons-material";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

const VideoCard = ({ popupHref, videoSrc, title, dataSrId }) => {
  const [open, setOpen] = React.useState(false);


  const handleClose = () => {
    setOpen(false); // Close dialog only when the Cancel button is clicked
  };
  return (
    <React.Fragment>
      <div
        className=" box-item f-mockup animated"
        data-sr-id={dataSrId}
        style={{
          visibility: "visible",
          transform: "translateY(0px) scale(1)",
          opacity: "1",
          transition:
            "all 0.5s cubic-bezier(0.6, 0.2, 0.1, 1), transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1), opacity 0.5s cubic-bezier(0.6, 0.2, 0.1, 1)",
          left: "0%",
          top: "0px",
        }}
      >
        <div className="image">
          <a href={popupHref} className="has-popup">
            <iframe
              className="vedioCard"
              src={videoSrc}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </a>
        </div>
        <div className="content-box">
          <a href={popupHref} className="name has-popup">
            {title}
          </a>
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
        <DialogTitle style={{ fontSize: '16px', fontWeight: '700', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

          <span></span><span onClick={handleClose}><Close /></span>
        </DialogTitle>
        <DialogContent>

          <div
            className=" box-item f-mockup animated"
            data-sr-id={dataSrId}
            style={{
              visibility: "visible",
              transform: "translateY(0px) scale(1)",
              opacity: "1",
              transition:
                "all 0.5s cubic-bezier(0.6, 0.2, 0.1, 1), transform 0.5s cubic-bezier(0.6, 0.2, 0.1, 1), opacity 0.5s cubic-bezier(0.6, 0.2, 0.1, 1)",
              left: "0%",
              top: "0px",
            }}
          >
            <div className="image">
              <a href={popupHref} className="has-popup">
                <iframe
                  className="vedioCard"
                  src={videoSrc}
                  title={title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </a>
            </div>
            <div className="content-box">
              <a href={popupHref} className="name has-popup">
                {title}
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </React.Fragment>
  );
};

export default VideoCard;
