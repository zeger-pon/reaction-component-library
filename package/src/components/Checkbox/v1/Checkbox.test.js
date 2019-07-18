import React from "react";
import renderer from "react-test-renderer";
import Checkbox from "./Checkbox";

test("renders with props", () => {
  const component = renderer.create(<Checkbox label={t('Label')} />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders disabled", () => {
  const component = renderer.create(<Checkbox label={t('Disabled')} isReadOnly />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
