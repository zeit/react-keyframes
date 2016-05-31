import test from 'ava';
import lolex from 'lolex';
import React from 'react';
import { render, findDOMNode } from 'react-dom';
import { Keyframes, Frame } from '../lib';

let clock;

test.before((t) => {
  clock = lolex.install();
});

test.after((t) => {
  clock.uninstall();
});

test('animate', (t) => {
  const container = document.createElement('div');
  const component = render(
    <Keyframes>
      <Frame duration={100}>foo</Frame>
      <Frame duration={200}>bar</Frame>
      <Frame>baz</Frame>
    </Keyframes>,
    container
  );
  const node = findDOMNode(component);

  t.same(node.childNodes.length, 1);
  t.same(node.childNodes[0].textContent, 'foo');

  clock.tick(100);

  t.same(node.childNodes.length, 1);
  t.same(node.childNodes[0].textContent, 'bar');

  clock.tick(200);

  t.same(node.childNodes.length, 1);
  t.same(node.childNodes[0].textContent, 'baz');
});

test('Keyframes events', (t) => {
  const container = document.createElement('div');
  const onStart = () => onStart.called = true;
  const onEnd = () => onEnd.called = true;
  render(
    <Keyframes onStart={onStart} onEnd={onEnd}>
      <Frame duration={100}>foo</Frame>
      <Frame duration={100}>bar</Frame>
    </Keyframes>,
    container
  );

  t.ok(onStart.called);
  clock.tick(100);
  t.notOk(onEnd.called);
  clock.tick(100);
  t.ok(onEnd.called);
});

test('Frame event', (t) => {
  const container = document.createElement('div');
  const onRender = () => onRender.called = true;
  render(
    <Keyframes>
      <Frame duration={100}>foo</Frame>
      <Frame duration={100} onRender={onRender}>bar</Frame>
    </Keyframes>,
    container
  );

  t.notOk(onRender.called);
  clock.tick(100);
  t.ok(onRender.called);
});

test('set component', (t) => {
  const container = document.createElement('div');
  const component = render(
    <Keyframes component="pre" className="woot">
      <Frame>foo</Frame>
      <Frame>bar</Frame>
    </Keyframes>,
    container
  );
  const node = findDOMNode(component);
  t.same(node.tagName, 'PRE');
  t.same(node.className, 'woot');
});

test('Infinite loop', (t) => {
  const container = document.createElement('div');
  const onStart = () => onStart.called = true;
  const onEnd = () => onEnd.called = true;
  render(
    <Keyframes onStart={onStart} onEnd={onEnd} loop={true}>
      <Frame duration={100}>foo</Frame>
      <Frame duration={100}>bar</Frame>
    </Keyframes>,
    container
  );

  t.ok(onStart.called);
  clock.tick(100);
  t.notOk(onEnd.called);
  clock.tick(200);
  t.notOk(onEnd.called);
});
