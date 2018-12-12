import React from 'react'
import RESSheet from 'ressheet'

const topbarMenuStyles = {
  float: 'right',
  position: 'relative',
  top: -22,
  left: -30
}

const controlsStyles = {
  background: 'transparent',
  border: 'none',
  fontSize: 25,
  color: '#c2c5ca'
}

const menuItemStyles = {
  display: 'inline-block',
  color: 'white',
  textAlign: 'center',
  padding: '14px'
}

export default class Topbar extends React.Component {

  static Menu = class extends React.Component {
    render() {
      // TODO: Make menu overlap and not overflow (x) like reactjs.org
      return (
          <ul style={topbarMenuStyles} id="topbar-menu">
            {
              // Certain that menu exists. No extra definitions required.
              this.props.menu.map((menuItem) => (
                <li style={menuItemStyles} className="topbar-menu-item">
                  <a
                    style={{color: controlsStyles.color}}
                    href={menuItem.link || '/'}
                  >
                    { menuItem.icon && <i className={menuItem.icon} /> || menuItem.text || 'Link'}
                  </a>
                </li>
              ))
            }
          </ul>
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