import React from 'react'
import RESSheet from 'ressheet'

export default props => {
  let codeStyles = new RESSheet(props, {})

  if (!props.language)
    return

  return (
    <pre className={'language-' + props.language} style={codeStyles} children={props.children} />
  )
}
