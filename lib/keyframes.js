import React, { PropTypes } from 'react';

const noop = () => {};

export default class Keyframes extends React.Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    component: PropTypes.any,
    delay: PropTypes.number,
    onStart: PropTypes.func,
    onEnd: PropTypes.func
  };

  static defaultProps = {
    component: 'span',
    delay: 0,
    onStart: noop,
    onEnd: noop
  };

  constructor (props) {
    super(props);
    this.state = { frameNum: this.props.delay ? -1 : 0 };
    this.timer = null;
  }

  shouldComponentUpdate (nextProps, nextState) {
    const { frameNum } = nextState;
    if (this.state.frameNum === frameNum) return false;
    return 0 <= frameNum && frameNum < this.props.children.length;
  }

  componentWillMount () {
    if (0 === this.state.frameNum) {
      this.props.onStart();
    }
  }

  componentWillUpdate () {
    if (0 === this.state.frameNum) {
      this.props.onStart();
    }
  }

  componentDidMount () {
    this.requestNextFrame();
  }

  componentDidUpdate () {
    this.requestNextFrame();
  }

  componentWillUnmount () {
    clearTimeout(this.timer);
  }

  render () {
    const frame = this.getFrame();
    if (!frame) return null;

    return React.createElement(
      this.props.component,
      this.props,
      frame.props.children
    );
  }

  requestNextFrame () {
    this.waitForDelay(() => {
      const frameNum = this.state.frameNum + 1;
      if (this.props.children.length <= frameNum) {
        this.props.onEnd();
        return;
      }

      this.setState({ frameNum });
    });
  }

  waitForDelay (fn) {
    const currentFrame = this.getFrame();
    const delay = currentFrame ? currentFrame.props.duration : this.props.delay;
    clearTimeout(this.timer);
    this.timer = setTimeout(fn, delay);
  }

  getFrame () {
    return this.props.children[this.state.frameNum];
  }
}
