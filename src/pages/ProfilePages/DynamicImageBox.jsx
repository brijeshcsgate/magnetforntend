import React from 'react';

const DynamicImageBox = ({ imgSrc, popupHref, name, dataSrId, customStyles, setOpen }) => {
  return (
    <div
      className=" box-item f-mockup animated"
      data-sr-id={dataSrId}
      style={{
        visibility: "visible",
        opacity: "1",
        ...customStyles, // Custom dynamic styles passed as props
      }}
      onClick={() => setOpen(true)}
    >
      <div className="image">
        <div className="has-popup">
          <img src={imgSrc} alt="" />
        </div>
      </div>
      <div className="content-box">
        <div className="name has-popup">
          {name}
        </div>
      </div>
    </div>
  );
};

export default DynamicImageBox;
