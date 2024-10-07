import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ContextAPI } from '../../contextAPI/ContextProfileV2';

function EnquiryModal() {

    const {showEnquiryFormModal,setShowEnquiryFormModal}=useContext(ContextAPI)
    const handleClose = () => setShowEnquiryFormModal(false);
  return (
    <>
      <Modal show={showEnquiryFormModal} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EnquiryModal;