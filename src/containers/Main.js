import React from 'react'
import RESSheet from 'ressheet'
import Topbar from './Topbar'

const contentStyles = {
  maxWidth: '60%',
  margin: '0 auto',
  height: '100vh',
  padding: '0 0 30px'
}

export default class Main extends React.Component {
  render() {
    let mainStyles = new RESSheet(this.props, {
      default: {
        width: 'calc(100% - 300px)',
        height: '100vh',
        float: 'right',
      }
    })
  
    return (
      <main id="Main" style={mainStyles}>
        { this.props.topbar === true && <Topbar menu={this.props.menu || false} /> }
        <div id="content" style={{...contentStyles}}>{this.props.children}</div>
      </main>
    )
  }
}