import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

const modalRootRef = document.getElementById('modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    // console.log(
    //   'componentWillUnmount - using for cleaning some listeners etc.',
    // );
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      // 1 - console.log('Enter ESC, should close modal');
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div
        // className={styles.Modal__backdrop}
        className={styles.Overlay}
        onClick={this.handleBackdropClick}
      >
        <div className={styles.Modal}>{this.props.children}</div>
      </div>,
      modalRootRef,
    );
  }
}

export default Modal;
