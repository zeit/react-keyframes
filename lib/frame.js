import React, { PropTypes } from 'react';

export default class Frame extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    component: PropTypes.any,
    duration: PropTypes.number,
    onRender: PropTypes.func
  };

  static defaultProps = {
    duration: 0,
    onRender: () => {}
  };

  componentDidMount () {
    this.props.onRender();
  }

  componentDidUpdate () {
    this.props.onRender();
  }

  render () {
    const { component } = this.props;
    return React.createElement(component, this.props, this.props.children);
  }
}
