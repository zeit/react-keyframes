import "@testing-library/jest-dom";
import React from "react";
import {
  render
  // fireEvent,
  // screen
} from "@testing-library/react";
import { Keyframes, Frame } from "../packages/react-keyframes/src";

jest.useFakeTimers();

it("should animate", () => {
  const { container } = render(
    <Keyframes>
      <Frame duration={100}>foo</Frame>
      <Frame duration={200}>bar</Frame>
      <Frame>baz</Frame>
    </Keyframes>
  );

  expect(container.childNodes.length).toBe(1);
  expect(container.childNodes[0].textContent).toBe("foo");

  jest.advanceTimersByTime(100);

  expect(container.childNodes.length).toBe(1);
  expect(container.childNodes[0].textContent).toBe("bar");

  jest.advanceTimersByTime(200);

  expect(container.childNodes.length).toBe(1);
  expect(container.childNodes[0].textContent).toBe("baz");
});

it("should render custom component", () => {
  const { container } = render(
    <Keyframes component="pre" className="woot">
      <Frame>foo</Frame>
      <Frame>bar</Frame>
    </Keyframes>
  );

  expect(container.childNodes[0].nodeName).toBe("PRE");
  expect(container.childNodes[0]).toHaveClass("woot");
});
