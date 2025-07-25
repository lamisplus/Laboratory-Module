import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const ConfirmDialog = ({ title, subTitle, isOpen, onConfirm, onClose }) => {
  return (
    <Modal isOpen={isOpen} toggle={onClose} centered>
      <ModalHeader toggle={onClose}>
        {title || 'Confirm Action'}
      </ModalHeader>
      <ModalBody>
        {subTitle || 'Are you sure you want to proceed?'}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button color="danger" onClick={onConfirm}>
          Confirm
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmDialog; 