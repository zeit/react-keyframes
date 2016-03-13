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

test('return value', (t) => {
  const container = document.createElement('div');
  const component = render(
    <Keyframes>
      <Frame>foo</Frame>
      <Frame delay={100}>bar</Frame>
      <Frame delay={200}>baz</Frame>
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
