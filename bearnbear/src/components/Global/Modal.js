import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

const Modal = ({ innerStyle, children, mode = 'primary', size = 'md', modalHeader, hideModal, clickToClose = true, pressToClose = true}) => {
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27 && pressToClose) {
        hideModal()
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [hideModal, pressToClose])
  return ReactDOM.createPortal(
    <div
      className='dimmer'
      onClick={clickToClose && hideModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onKeyPress={(e) => e.stopPropagation()}
        className={`${mode} modal ${size} ${innerStyle}`}
      >
        <div className='title-group'>
          <div className='modal-title'>{modalHeader}</div>
        </div>
        <div className='modal-inner-content'>
          {children}
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  )
}

Modal.propTypes = {
  mode: PropTypes.oneOf(['primary', 'error']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  modalHeader: PropTypes.string,
  clickToClose: PropTypes.bool,
  pressToClose: PropTypes.bool,
  hideModal: PropTypes.func
}

export default Modal
