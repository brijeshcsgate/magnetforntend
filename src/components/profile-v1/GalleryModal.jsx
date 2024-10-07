import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import { ContextAPI } from "../../contextAPI/ContextProfileV2";
const GalleryModal = () => {
  const { galleryModalData, setGalleryModalShow, galleryModalShow } =
    useContext(ContextAPI);
  const handleClose = () => setGalleryModalShow(false);
  return (
    <Modal show={galleryModalShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {galleryModalData.str} {galleryModalData.idx+1}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GalleryModal;
