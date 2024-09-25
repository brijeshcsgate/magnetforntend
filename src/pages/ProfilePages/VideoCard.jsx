import React from "react";

const VideoCard = ({ popupHref, videoSrc, title, dataSrId }) => {
  return (
    <div
      className="col col-m-12 col-t-6 col-d-4 box-item f-mockup animated"
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
  );
};

export default VideoCard;
