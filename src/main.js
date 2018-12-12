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
    margin: '15px 0 15px 15px'
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
    // fontFamily: 'SFMono-Regular, Consolas, Menlo, monospace',
    borderRadius: 2,
    backgroundColor: '#f8f8f8'
  }
}

// MDX uses these styled components to replace the default HTML
// elements that would appear. Some of the styles here could be
// inherited from the themeConfig
const overrideComponents = {
  h1: props => <h1 style={{...defaultStyles.header}} {...props} />,
  h2: props => <h2 style={{...defaultStyles.header}} {...props} />,
  h4: props => <h4 style={{...defaultStyles.header}} {...props} />,
  blockquote: props => <blockquote style={{...defaultStyles.blockquote}} {...props} />,
  table: props => <div style={{...defaultStyles.fixedTableLayout}} children={<table {...props} />} />,
  li: props => <li style={{...defaultStyles.listItem}} {...props} />,
  pre: props => <pre children={<code language="js" {...props} />} />
}

ReactDOM.render(
  <MDXProvider id="Index" components={overrideComponents}>
    <Index />
  </MDXProvider>,
  document.getElementById('root')
)
