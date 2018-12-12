import React from 'react'
import ReactDOM from 'react-dom'
import { MDXProvider } from '@mdx-js/tag'
import Index from '../documate/index.mdx'

const defaultStyles = {
  fixedTableLayout: {
    overflowX: 'auto',
    padding: 5
  },
  listItem: {
    position: 'relative',
    left: -50,
    listStyle: 'none',
    lineHeight: 2,
    margin: '10px 0'
  },
  bigHeader: {
    fontWeight: 700,
    fontSize: 35,
    margin: '10px 0',
    display: 'block'
  },
  smallHeader: {
    fontWeight: 300,
    fontSize: 20,
    margin: '30px 0',
    display: 'block'
  },
  header: {
    fontFamily: 'Segoe UI, sans-serif',
    fontWeight: 600,
    margin: '30px 0'
  },
  blockquote: {
    borderLeft: '6px solid #ccc',
    background: '#f2f2f2',
    width: 'fit-content',
    padding: '2px 10px 2px 15px'
  },
  inlineCode: {
    backgroundColor: '#E1F5FE',
    color: '#1E88E5',
    fontFamily: 'monospace'
  },
  editor: {
    backgroundColor: '#282c34',
    width: '100%',
    padding: '10px 5px',
    borderRadius: 3,
    lineHeight: 1.5,
    overflow: 'auto'
  }
}

// MDX uses these styled components to replace the default HTML
// elements that would appear. Some of the styles here could be
// inherited from the themeConfig
const overrideComponents = {
  h1: props => <span style={defaultStyles.bigHeader} {...props} />,
  h2: props => <h2 style={{...defaultStyles.header}} {...props} />,
  // h3 - Thin sub-headers
  h3: props => <span style={{...defaultStyles.smallHeader}} {...props} />,
  h4: props => <h4 style={{...defaultStyles.header}} {...props} />,
  blockquote: props => <blockquote style={{...defaultStyles.blockquote}} {...props} />,
  table: props => <div style={{...defaultStyles.fixedTableLayout}} children={<table {...props} />} />,
  li: props => (
    <li style={{...defaultStyles.listItem}}>
      <i style={{color: '#05a1e2', margin: 10, float: 'left'}} className="fas fa-dot-circle" /> {props.children}
    </li>
  ),
  pre: props => <pre style={defaultStyles.editor} children={<code language="js" {...props} />} />
}

ReactDOM.render(
  <MDXProvider id="Index" components={overrideComponents}>
    <Index />
  </MDXProvider>,
  document.getElementById('root')
)
