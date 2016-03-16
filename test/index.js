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
