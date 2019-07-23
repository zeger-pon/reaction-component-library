import React from "react"; // auto-add i18n 
import i18n from "../../../utils";
import renderer from "react-test-renderer";
import ProgressiveImage from "./ProgressiveImage";

test("Basic ProgressiveImage snapshot", () => {
  const component = renderer.create((
    <ProgressiveImage src="/reaction-design-system-logo.svg" alt="Reaction Design System Logo" />
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("ProgressiveImage with progressive loading snapshot", () => {
  const component = renderer.create((
    <ProgressiveImage
      src="/images/sticker/medium.jpg"
      presrc="/images/sticker/small.png"
    />
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Responsive ProgressiveImage with progressive loading snapshot", () => {
  const component = renderer.create((
    <ProgressiveImage
      presrc="/images/sticker/small.png"
      srcs={{
        large: "/images/sticker/large.jpg",
        medium: "/images/sticker/medium.jpg",
        small: "/images/sticker/small.png"
      }}
    />
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Responsive ProgressiveImage with 'cover' fit and progressive loading snapshot", () => {
  const component = renderer.create((
    <ProgressiveImage
      fit="cover"
      presrc="/images/sticker/small.png"
      srcs={{
        large: "/images/sticker/large.jpg",
        medium: "/images/sticker/medium.jpg",
        small: "/images/sticker/small.png"
      }}
    />
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
