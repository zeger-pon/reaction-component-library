import React from "react"; // auto-add i18n 
import i18n from "../../../utils";
import renderer from "react-test-renderer";
import QuantityInput from "./QuantityInput";

test("basic snapshot", () => {
  const component = renderer.create(<QuantityInput />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
