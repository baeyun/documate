import React from 'react'
import RESSheet from 'ressheet'

export default props => {
  let breadcrumbStyles = new RESSheet(props, {
    default: {
      backgroundColor: '#E1F5FE',
      width: 'fit-content',
      borderRadius: 2,
      padding: '5px 10px'
    }
  })

  if (!props.slugs)
    throw Error('The [slug] prop was not defined.')

  return (
    <div style={breadcrumbStyles}>
      {
        props.slugs.map((slug, i) => (
          <>
            <a style={{color: '#1E88E5'}} href={slug.link} key={'_slugLink_' + i} children={slug.text} />
            <span style={{color: '#1E88E5'}}> / </span>
          </>
        ))
      }
    </div>
  )
}