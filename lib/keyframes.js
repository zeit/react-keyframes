import React from 'react'
import PropTypes from 'prop-types'
import Frame from './frame'

const noop = () => {}

export default class Keyframes extends React.Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    component: PropTypes.any, // eslint-disable-line react/no-unused-prop-types
    delay: PropTypes.number,
    loop: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.bool
    ]),
    onStart: PropTypes.func,
    onEnd: PropTypes.func
  };

  static defaultProps = {
    component: 'span',
    delay: 0,
    loop: 1,
    onStart: noop,
    onEnd: noop
  };

  constructor(props) {
    super(props)
    this.state = {
      frameNum: this.props.delay ? -1 : 0,
      loopNum: 0
    }
    this.timer = null
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {frameNum} = nextState
    if (this.state.frameNum === frameNum) {
      return false
    }
    return frameNum >= 0 && frameNum < this.props.children.length
  }

  componentWillMount() {
    if (this.state.frameNum === 0) {
      this.props.onStart()
    }
  }

  componentWillUpdate() {
    if (this.state.frameNum === 0) {
      this.props.onStart()
    }
  }

  componentDidMount() {
    this.requestNextFrame()
  }

  componentDidUpdate() {
    this.requestNextFrame()
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  render() {
    const frame = this.getFrame()
    if (!frame) {
      return null
    }

    const props = {}
    Object.keys(this.props).forEach(k => {
      // don't pass props which exist only on Keyframes
      if (Keyframes.propTypes[k] && !Frame.propTypes[k]) {
        return
      }

      props[k] = this.props[k]
    })

    return React.cloneElement(frame, {...props, ...frame.props})
  }

  requestNextFrame() {
    this.waitForDelay(() => {
      const frameNum = this.state.frameNum + 1
      const loopNum = this.state.loopNum + 1
      if (this.props.children.length <= frameNum) {
        if (this.props.loop === true || this.props.loop === 'infinite' || loopNum < this.props.loop) {
          this.setState({
            frameNum: 0,
            loopNum
          })
          this.requestNextFrame()
          return
        }
        this.props.onEnd()
        return
      }

      this.setState({frameNum})
    })
  }

  waitForDelay(fn) {
    const currentFrame = this.getFrame()
    const delay = currentFrame ? currentFrame.props.duration : this.props.delay
    clearTimeout(this.timer)
    this.timer = setTimeout(fn, delay)
  }

  getFrame() {
    return this.props.children[this.state.frameNum]
  }
}
