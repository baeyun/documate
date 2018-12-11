import React from 'react'
import RESSheet from 'ressheet'

const controlsStyles = {
  background: 'none',
  border: 'none',
  fontSize: 25,
  color: '#c2c5ca'
}

const menuItemStyles = {
  listStyles: 'none',
  float: 'left',
  display: 'inline',
  // fontWeight: 'bold',
  padding: 5,
  margin: 3
}

export default class Topbar extends React.Component {

  static Menu = class extends React.Component {
    render() {
      return (
        <div style={{float: 'right', position: 'relative', top: -18, right: 25}} id="topbar-menu">
          <ul>
            {
              // Certain that menu exists. No extra definitions required.
              this.props.menu.map((menuItem) => (
                <li style={menuItemStyles} className="topbar-menu-item">
                  <a
                    style={{color: '#333'}}
                    href={menuItem.link || '/'}
                  >
                    { menuItem.icon && <i className={menuItem.icon} /> || menuItem.text || 'Link'}
                  </a>
                </li>
              ))
            }
          </ul>
        </div>
      )
    }
  }

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

        {
          this.props.menu && <Topbar.Menu menu={this.props.menu} />
        }
      </div>
    )
  }
}