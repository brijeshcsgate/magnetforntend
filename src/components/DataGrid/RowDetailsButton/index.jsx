import React, { useState } from 'react';

const RowDetailsButton = ({ imgUrl, imgAlt, options }) => {
  const [isShowOption, setShowOption] = useState(false);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [handleDelete, setHandleDelete] = useState(null);
  // const [title, setTitle] = useState("");

  // const handleClick = (item) => {
  //   setShowDeleteModal(true);
  //   setHandleDelete(item);
  //   setTitle(item?.subTitle);
  // };

  return (
    <button
      className="row-details-button "
      onBlur={() => setShowOption(!isShowOption)}
    >
      <img
        src={imgUrl}
        alt={imgAlt}
        style={{ width: '39px', height: '30px', cursor: 'pointer' }}
        onClick={() => setShowOption(!isShowOption)}
      />
      {isShowOption && options && (
        <div className="row-details-option-container z-50">
          {options.map((item, index) => (
            <div
              className="row-details-option"
              onClick={() => {
                item?.onClick();
              }}
              key={index}
            >
              <div className="row-details-title">{item.title}</div>
              <div className="row-details-icon">{item.icon}</div>
            </div>
          ))}
        </div>
      )}
    </button>
  );
};

export default RowDetailsButton;
