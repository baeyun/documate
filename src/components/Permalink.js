import React from 'react'
import RESSheet from 'ressheet'

export default props => {
  let permalinkStyles = new RESSheet(props, {})

  return (
    <span style={permalinkStyles} {...props} />
  )
}
