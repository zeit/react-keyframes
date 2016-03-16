import React, { PropTypes } from 'react';

export default class Frame extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    component: PropTypes.string,
    duration: PropTypes.number,
    onRender: PropTypes.func
  };

  static defaultProps = {
    component: null,
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
    return React.createElement(component, null, this.props.children);
  }
}
