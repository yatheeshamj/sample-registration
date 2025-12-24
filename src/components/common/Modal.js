import React, { Component } from 'react';
import ReactModal from 'react-modal';

const customStyles = {
  overlay: {
    backgroundColor: 'rgb(51, 51, 51, 0.8)'
  },
  content: {
    top: '50%',
    bottom: 'auto',
    left: '50%',
    right: 'auto',
    maxWidth: '460px',
    marginRight: '-50%',
    height: 'auto',
    padding: 0,
    transform: 'translate(-50%, -50%)',
    minHeight: '10rem',
    maxHeight: '80vh',
    position: 'fixed',
    minWidth: '280px',
    width: '80%'
  }
};

class Modal extends Component {
  render() {
    const { isOpen, onRequestClose } = this.props;

    return (
      <ReactModal
        style={customStyles}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        ariaHideApp={false}
      >
        {this.props.children}
      </ReactModal>
    );
  }
}

export default Modal;
