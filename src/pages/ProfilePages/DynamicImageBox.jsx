import React from 'react';

const DynamicImageBox = ({ imgSrc, popupHref, name, dataSrId, customStyles, setOpen }) => {
  return (
    <div
      className="col col-m-12 col-t-6 col-d-4 box-item f-mockup animated"
      data-sr-id={dataSrId}
      style={{
        visibility: "visible",
        opacity: "1",
        ...customStyles, // Custom dynamic styles passed as props
      }}
      onClick={() => setOpen(true)}
    >
      <div className="image">
        <a href={popupHref} className="has-popup">
          <img src={imgSrc} alt="" />
        </a>
      </div>
      <div className="content-box">
        <a href={popupHref} className="name has-popup">
          {name}
        </a>
      </div>
    </div>
  );
};

export default DynamicImageBox;
