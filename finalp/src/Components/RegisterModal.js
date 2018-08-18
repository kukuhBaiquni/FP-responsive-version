import React from 'react';
import Modal from 'react-responsive-modal';
import './RegisterModal.css';
import ModalContent from './ModalContent'

export default class RegisterModal extends React.Component {
  state = {
    open: false,
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div className="example">
        <button className="btn btn-action" onClick={this.onOpenModal}>
          Open
        </button>{' '}
        <Modal
          open={open}
          onClose={this.onCloseModal}
          center
          classNames={{
            transitionEnter: 'transition-enter',
            transitionEnterActive: 'transition-enter-active',
            transitionExit: 'transition-exit-active',
            transitionExitActive: 'transition-exit-active',
          }}
          animationDuration={250}
        >
          <ModalContent />
        </Modal>
      </div>
    );
  }
}
