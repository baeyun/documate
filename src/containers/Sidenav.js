import React from 'react'
import RESSheet from 'ressheet'
import logo from '../components/logo'

const itemStyles = {
  display: 'block',
  marginTop: 5,
  fontSize: 16,
  fontWeight: 600
}

const subnavItemStyles = {
  position: 'relative',
  left: -25,
  listStyle: 'none'
}

const subnavDotStyles = {
  width: 8,
  height: 8,
  background: '#05a1e2',
  position: 'relative',
  left: -13,
  bottom: -18,
  float: 'left',
  borderRadius: '50%'
}

export default class Sidebar extends React.Component {
  state = {}

  static Label = class extends React.Component {
    render() {
      return (
        <h4 style={{
          color: '#ccc',
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
          <a style={{backgroundColor: 'transparent'}} href={this.props.link || '/'}>
            <img src={logo} width={100} title="Documate Homepage" />
          </a>
        </div>
      )
    }
  }
  
  static Item = class extends React.Component {
    state = {
      isSubnav: false,
      isCurrentSubnavOpen: false,
      navItemIcon: 'right',
      shouldAnimate: false
    }

    componentWillMount() {
      if (this.props.subnav)
        this.setState({
          isSubnav: true
        })
    }
    
    toggleNavItemSubnav(e) {
      e.preventDefault()
      if (this.state.isCurrentSubnavOpen == false) {
        this.setState({
          isCurrentSubnavOpen: true,
          navItemIcon: 'down',
          shouldAnimate: true
        })
      } else if (this.state.isCurrentSubnavOpen == true) {
        e.target.nextElementSibling.classList.remove('subnav-item-animate')

        this.setState({
          isCurrentSubnavOpen: false,
          navItemIcon: 'right',
          shouldAnimate: false
        })
      }
    }

    render() {
      return (
        <>
          {
            this.state.isSubnav && <span style={subnavDotStyles} />
          }
          <a onClick={this.toggleNavItemSubnav.bind(this)} href={this.props.href || '/'} style={{...itemStyles}}>
            {this.props.children}
          </a>
          {
            this.state.isCurrentSubnavOpen && (
              <div className={'subnav' + this.state.shouldAnimate ? 'subnav-item-animate' : ''}>
                <ul style={{listStylePosition: 'outside'}}>
                  {
                    typeof this.props.subnav === 'object' && this.props.subnav.map((subnav, i) => (
                      <>
                        <li className="subnav-item" style={subnavItemStyles} key={'_subNavItemLink_' + i}>
                          <a href={subnav.link}>{subnav.text}</a>
                        </li>
                      </>
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

  render() {
    let sidenavStyles = new RESSheet(this.props, {
      default: {
        backgroundColor: '#222831',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: 300,
        height: '100vh',
        padding: 20,
        fontSize: 15,
        overflowY: 'auto'
      }
    })
  
    return (
      <aside id="Sidenav" style={sidenavStyles} {...this.props} />
    )
  }
}