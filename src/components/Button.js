import React from 'react'
import RESSheet from 'ressheet'

export default props => {
  let buttonStyles = new RESSheet(props, {
    default: {
      backgroundColor: '#eee',
      color: '#333',
      padding: '8px 12px',
      border: 'none',
      letterSpacing: .5,
      borderRadius: 2,
      outline: 'none',
      fontSize: 15,
      margin: 4
    },
    'primary, success, warning, danger': { color: '#fff' },
    'primary': { backgroundColor: '#42a5f5' },
    'success': { backgroundColor: '#3fb944' },
    'warning': { backgroundColor: '#FFB300' },
    'danger': { backgroundColor: '#dc3131' },
    'pullLeft': { float: 'left' },
    'pullRight': { float: 'right' }
  })

  return (
    <button style={buttonStyles} {...props} />
  )
}
