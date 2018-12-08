import React from 'react'
import RESSheet from 'ressheet'

const controlsStyles = {
  background: 'none',
  border: 'none',
  fontSize: 25,
  color: '#c2c5ca'
}

export default class Topbar extends React.Component {
  render() {
    let topbarStyles = new RESSheet(this.props, {
      default: {
        height: 60,
        padding: '15px 20px'
      }
    })

    return (
      <div id="Topbar" style={topbarStyles}>
        <button style={controlsStyles} title="Close side nav">
          <i className="fas fa-angle-left" />
        </button>
        <button style={{fontSize: 20, float: 'right', ...controlsStyles}} title="Search">
          <i className="fas fa-search" />
        </button>
      </div>
    )
  }
}