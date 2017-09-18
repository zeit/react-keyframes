import React from 'react'
import PropTypes from 'prop-types'

export default class Frame extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    component: PropTypes.any,
    duration: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
    onRender: PropTypes.func
  };

  static defaultProps = {
    duration: 0,
    onRender: () => {}
  };

  componentDidMount() {
    this.props.onRender()
  }

  componentDidUpdate() {
    this.props.onRender()
  }

  render() {
    const {component} = this.props
    const props = {}
    Object.keys(this.props).forEach(k => {
      if (Frame.propTypes[k]) {
        return
      }
      props[k] = this.props[k]
    })
    return React.createElement(component, props, this.props.children)
  }
}
