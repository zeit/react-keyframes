# React Keyframes

[![Build Status](https://travis-ci.org/zeit/react-keyframes.svg?branch=master)](https://travis-ci.org/zeit/react-keyframes)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

A React component for creating frame-based animations.

![Demo](https://cloud.githubusercontent.com/assets/775227/14613178/24789406-05d6-11e6-8411-6ee929ae3f3e.gif)

## Example

The following example will render contents in `Frame` one at a time every 500 ms.

```js
import { render } from 'react-dom';
import { Keyframes, Frame } from 'react-keyframes';

render(
  <Keyframes>
    <Frame duration={500}>This</Frame>
    <Frame duration={500}>This is</Frame>
    <Frame duration={500}>This is <em>animated</em>.</Frame>
  </Keyframes>,
  document.getElementById('container')
);
```

## Usage

Firstly, install the package:

```js
$ npm install --save react-keyframes
```

## API

### Keyframes
**`<Keyframes { component = 'span', delay = 0, loop = 1, onStart, onEnd } />`**

- Use `import { Keyframes } from 'react-keyframes'` or `require('react-keyframes').Keyframes`.
- The `component` prop specifies what component `Keyframes` renders as.
- The `delay` prop specifies when the animation should start (millisecond).
- The `loop` prop specifies the number of times an animation cycle should be played. Set `true` to repeat forever.
- The `onStart` function is invoked upon animation start
- The `onEnd` function is invoked upon animation end
- Any additional, user-defined properties will become properties of the rendered component.
- It must have only `Frame` as children.
- Example:

  ```js
  import { Component } from 'react';
  import { Keyframes, Frame } from 'react-keyframes';

  class extends Component {
    render () {
      return <Keyframes component="pre" delay={300} className="animation-test">
        <Frame>foo</Frame>
        <Frame>bar</Frame>
      </Keyframes>;
    }
  }
  ```

### Frame

**`<Frame { duration = 0 } />`**

- Use `import { Frame } from 'react-keyframes'` or `require('react-keyframes').Frame`.
- The `duration` prop specifies the length of time that a frame should show (millisecond).
- You have to put `Frame` in the order you want them animated.
- Example:

  ```js
  import { Component } from 'react';
  import { Keyframes, Frame } from 'react-keyframes';

  class extends Component {
    render () {
      return <Keyframes>
        <Frame duration={100}>foo</Frame>
        <Frame duration={200}>bar</Frame>
      </Keyframes>;
    }
  }
  ```

## Contributing

- Run `npm run build` to transpile the source code
- Before submitting a PR, please run `npm test`
- Please [be welcoming](http://contributor-covenant.org/)

## Author

Naoyuki Kanezawa ([@nkzawa](https://twitter.com/nkzawa)) - [▲ZEIT](https://zeit.co)
