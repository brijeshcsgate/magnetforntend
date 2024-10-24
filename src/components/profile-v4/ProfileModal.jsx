import React, { useContext } from "react";
import { ContextAPI } from "@/contextAPI/ContextProfileV2";
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
const ProfileModal = (isOpenModal) => {

  const { productInfo } = useContext(ContextAPI)

  return (
    <div style={{ width: "100%" }}>
      <div
        className={isOpenModal ? "modal fade" : ""}
        id="formModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{productInfo?.name}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <Carousel indicatorLabels={null} indicators={null} draggable={1} nextIcon={null} nextLabel={null} prevIcon={null} prevLabel={null}>
                {productInfo?.image?.map((image, index) => (
                  <Carousel.Item key={index}>
                    <Card.Img variant="top" src={image} />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
            <div className="modal-footer">
              {productInfo?.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
