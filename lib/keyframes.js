import React, { PropTypes } from 'react';

const noop = () => {};

export default class Keyframes extends React.Component {
  constructor (props) {
    super(props);
    this.state = { frameNum: -1 };
    this.delayTimer = null;
  }

  shouldComponentUpdate (nextProps, nextState) {
    const { frameNum } = nextState;
    if (this.state.frameNum === frameNum) return false;
    return 0 <= frameNum && frameNum < this.props.children.length;
  }

  componentWillMount () {
    const frameNum = this.state.frameNum + 1;
    const frame = this.getFrame(frameNum);

    // render the first frame if it has no delay
    if (frame && !frame.props.delay) {
      this.setState({ frameNum });
    }
  }

  componentDidMount () {
    this.requestNextFrame();
  }

  componentDidUpdate () {
    this.requestNextFrame();
  }

  componentWillUnmount () {
    clearTimeout(this.delayTimer);
  }

  render () {
    const frame = this.getFrame();
    if (!frame) return null;

    const component = frame.props.component || this.props.component;
    return React.cloneElement(frame, { component });
  }

  requestNextFrame () {
    const frameNum = this.state.frameNum + 1;
    const frame = this.getFrame(frameNum);
    if (!frame) {
      this.props.onEnd();
      return;
    }

    const { delay } = frame.props;

    clearTimeout(this.delayTimer);
    this.delayTimer = setTimeout(() => {
      if (0 === frameNum) {
        this.props.onStart();
      }
      this.setState({ frameNum });
    }, delay);
  }

  getFrame (frameNum = this.state.frameNum) {
    return this.props.children[frameNum];
  }
}

Keyframes.propTypes = {
  children: PropTypes.element.isRequired,
  component: PropTypes.string,
  onStart: PropTypes.func,
  onEnd: PropTypes.func
};

Keyframes.defaultProps = {
  component: 'span',
  onStart: noop,
  onEnd: noop
};
