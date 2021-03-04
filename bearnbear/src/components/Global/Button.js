import React from 'react'
import '../../assets/scss/style.scss'
import PropTypes from 'prop-types'

const Button = ({ mode, size, loading, disabled, customClass, float, children, fluid, ...props }) => {
  return (
    <button className={`btn ${mode === 'default' ? '' : mode} ${size} ${customClass} ${fluid && 'fluid'}`} {...props} disabled={disabled} style={{ float: float }}>
      {loading ? <div className='loading'></div> : children}
    </button>
  )
}

Button.propTypes = {
  mode: PropTypes.oneOf(['primary', 'secondary', 'default', 'white']),
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
  /**
   * Loading
   */
  loading: PropTypes.bool,
  float: PropTypes.oneOf(['left', 'right'])
}

export default Button
