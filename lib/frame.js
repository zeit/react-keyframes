import React, { PropTypes } from 'react';

export default class Frame extends React.Component {
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

Frame.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  component: PropTypes.string,
  delay: PropTypes.number,
  onRender: PropTypes.func
};

Frame.defaultProps = {
  component: null,
  delay: 0,
  onRender: () => {}
};
