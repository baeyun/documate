import React from 'react'
import RESSheet from 'ressheet'
import logo from './logo.js'

const itemStyles = {
  display: 'block',
  marginTop: 15,
  fontSize: 16,
  fontWeight: 600
}

const subnavItemStyles = {
  margin: '5px 0',
  listStyle: 'none'
}

export default class Sidebar extends React.Component {
  state = {}

  static Label = class extends React.Component {
    render() {
      return (
        <h4 style={{
          color: '#9696a0',
          fontWeight: 300,
          textTransform: 'uppercase',
          fontSize: 14
        }} {...this.props} />
      )
    }
  }

  static Logo = class extends React.Component {
    render() {
      return (
        <div style={{margin: '15px 0 25px', textAlign: 'center'}}>
          <img src={logo} width={200} />
        </div>
      )
    }
  }
  
  static Item = class extends React.Component {
    state = {
      isCurrentSubnavOpen: false,
      navItemIcon: 'right'
    }

    toggleNavItemSubnav(e) {
      e.preventDefault()
      if (this.state.isCurrentSubnavOpen == false) {
        this.setState({
          isCurrentSubnavOpen: true,
          navItemIcon: 'down'
        })
      } else if (this.state.isCurrentSubnavOpen == true) {
        this.setState({
          isCurrentSubnavOpen: false,
          navItemIcon: 'right'
        })
      }
    }

    render() {
      return (
        <>
          <a onClick={this.toggleNavItemSubnav.bind(this)} href={this.props.href || '/'} style={{...itemStyles}}>
            <i style={{marginRight: 7}} className={'fas fa-angle-' + this.state.navItemIcon} /> {this.props.children}
          </a>
          {
            this.state.isCurrentSubnavOpen && (
              <div className="subnav">
                <ul>
                  {
                    typeof this.props.subnav === 'object' && this.props.subnav.map((subnav, i) => (
                      <li className="subnav-item" style={subnavItemStyles} key={'_subNavItemLink_' + i}>
                        <a href={subnav.link}>{subnav.text}</a>
                      </li>
                    ))
                  }
                </ul>
              </div>
            )
          }
        </>
      )
    }
  }

  componentDidMount() {}

  render() {
    let sidenavStyles = new RESSheet(this.props, {
      default: {
        backgroundColor: '#f9fafc',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: 300,
        height: '100vh',
        padding: 20,
        fontSize: 15
      }
    })
  
    return (
      <aside id="Sidenav" style={sidenavStyles} {...this.props} />
    )
  }
}