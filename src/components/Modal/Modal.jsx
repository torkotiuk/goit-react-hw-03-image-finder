import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

const modalRootRef = document.getElementById('modal-root');

class Modal extends Component {
  componentDidMount() {
    // console.log('Mount modal');

    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    console.log(
      'componentWillUnmount - using for cleaning some listeners etc.',
    );
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      // 1 - console.log('Enter ESC, should close modal');
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    // console.log('Click to backrop');
    // console.log('target', e.target);
    // console.log('currentTarget', e.currentTarget);
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div
        className={styles.Modal__backdrop}
        onClick={this.handleBackdropClick}
      >
        <div className={styles.Modal__content}>{this.props.children}</div>
      </div>,
      modalRootRef,
    );
  }
}

export default Modal;
