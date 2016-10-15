import test from 'ava'
import lolex from 'lolex'
import React from 'react'
import {render, findDOMNode} from 'react-dom'
import {Keyframes, Frame} from '../lib'

let clock

test.before(() => {
  clock = lolex.install()
})

test.after(() => {
  clock.uninstall()
})

test('animate', t => {
  const container = document.createElement('div')
  const component = render(
    <Keyframes>
      <Frame duration={100}>foo</Frame>
      <Frame duration={200}>bar</Frame>
      <Frame>baz</Frame>
    </Keyframes>,
    container
  )
  const node = findDOMNode(component)

  t.deepEqual(node.childNodes.length, 1)
  t.deepEqual(node.childNodes[0].textContent, 'foo')

  clock.tick(100)

  t.deepEqual(node.childNodes.length, 1)
  t.deepEqual(node.childNodes[0].textContent, 'bar')

  clock.tick(200)

  t.deepEqual(node.childNodes.length, 1)
  t.deepEqual(node.childNodes[0].textContent, 'baz')
})

test('Keyframes events', t => {
  const container = document.createElement('div')
  const onStart = () => {
    onStart.called = true
  }
  const onEnd = () => {
    onEnd.called = true
  }
  render(
    <Keyframes onStart={onStart} onEnd={onEnd}>
      <Frame duration={100}>foo</Frame>
      <Frame duration={100}>bar</Frame>
    </Keyframes>,
    container
  )

  t.truthy(onStart.called)
  clock.tick(100)
  t.falsy(onEnd.called)
  clock.tick(100)
  t.truthy(onEnd.called)
})

test('Frame event', t => {
  const container = document.createElement('div')
  const onRender = () => {
    onRender.called = true
  }
  render(
    <Keyframes>
      <Frame duration={100}>foo</Frame>
      <Frame duration={100} onRender={onRender}>bar</Frame>
    </Keyframes>,
    container
  )

  t.falsy(onRender.called)
  clock.tick(100)
  t.truthy(onRender.called)
})

test('set component', t => {
  const container = document.createElement('div')
  const component = render(
    // eslint-disable-next-line react/forbid-component-props
    <Keyframes component="pre" className="woot">
      <Frame>foo</Frame>
      <Frame>bar</Frame>
    </Keyframes>,
    container
  )
  const node = findDOMNode(component)
  t.deepEqual(node.tagName, 'PRE')
  t.deepEqual(node.className, 'woot')
})

test('Infinite loop', t => {
  const container = document.createElement('div')
  const onStart = () => {
    onStart.called = true
  }
  const onEnd = () => {
    onEnd.called = true
  }
  render(
    <Keyframes onStart={onStart} onEnd={onEnd} loop>
      <Frame duration={100}>foo</Frame>
      <Frame duration={100}>bar</Frame>
    </Keyframes>,
    container
  )

  t.truthy(onStart.called)
  clock.tick(100)
  t.falsy(onEnd.called)
  clock.tick(200)
  t.falsy(onEnd.called)
})

test('Finite loop', t => {
  const container = document.createElement('div')
  const onStart = () => {
    onStart.called = true
  }
  const onEnd = () => {
    onEnd.called = true
  }
  render(
    <Keyframes onStart={onStart} onEnd={onEnd} loop={3}>
      <Frame duration={100}>foo</Frame>
      <Frame duration={100}>bar</Frame>
    </Keyframes>,
    container
  )

  t.truthy(onStart.called)
  clock.tick(100)
  t.falsy(onEnd.called)
  clock.tick(200)
  t.falsy(onEnd.called)
  clock.tick(300)
  t.truthy(onEnd.called)
})
