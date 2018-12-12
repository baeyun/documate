import React from 'react'
import RESSheet from 'ressheet'

export default class Alert extends React.Component {
  state = {
    iconType: 'info-circle',
    iconColor: '#aaa'
  }

  componentWillMount() {
    const _ref = this;

    [
      {alertType: 'primary', icon: 'star', color: '#55a4e8'},
      {alertType: 'success', icon: 'check', color: '#15b91a'},
      {alertType: 'warning', icon: 'exclamation-circle', color: '#ffc107'},
      {alertType: 'danger', icon: 'sad-tear', color: '#d32f2f'}
    ].map((config) => {
      if (_ref.props[config.alertType])
        _ref.setState({
          iconType: config.icon,
          iconColor: config.color
        })
    })
  }

  render() {
    let alertStyles = new RESSheet(this.props, {
      'default': {
        borderRadius: 3,
        margin: '20px 0',
        padding: '20px 15px',
        width: 'fit-content',
        backgroundColor: '#eee',
        borderLeft: '6px solid #ddd'
      },
      'primary': {
        backgroundColor: '#c3ecff',
        borderColor: '#55a4e8'
      },
      'success': {
        backgroundColor: '#99fab3',
        borderColor: '#15b91a'
      },
      'warning': {
        backgroundColor: '#fff49b',
        borderColor: '#ffc107'
      },
      'danger': {
        backgroundColor: '#ffcdd2',
        borderColor: '#d32f2f'
      },
    })

    return (
      <div style={alertStyles} {...this.props} >
        <i
          style={{marginRight: 5, fontSize: 20, color: this.state.iconColor}}
          className={'fas fa-' + this.state.iconType}
        /> {this.props.children}
      </div>
    )
  }
}
