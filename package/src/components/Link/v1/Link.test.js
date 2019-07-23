import React from "react"; // auto-add i18n 
import i18n from "../../../utils";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import Link from "./Link";

test("Link component with image snapshot", () => {
  const component = renderer.create((
    <Link href="http://google.com">
      <img src="/reaction-design-system-logo.svg" width="200" height="200" alt="Reaction Design System Logo" />
    </Link>
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Link component with text snapshot", () => {
  const component = renderer.create((
    <Link href="http://google.com">Click here</Link>
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Link component with onClick hander", () => {
  const testClickHandler = jest.fn();
  const component = shallow((
    <Link href="http://google.com" onClick={testClickHandler}>Click here</Link>
  ));

  component.simulate("click");

  expect(testClickHandler).toHaveBeenCalled();
});

test("Link component with onClick hander and no href", () => {
  const testClickHandler = jest.fn();
  const component = shallow((
    <Link onClick={testClickHandler}>Click here</Link>
  ));

  component.simulate("click");

  expect(testClickHandler).toHaveBeenCalled();
});
