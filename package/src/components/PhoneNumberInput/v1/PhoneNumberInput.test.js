import React from "react"; // auto-add i18n 
import i18n from "../../../utils";
import renderer from "react-test-renderer";
import mockComponents from "../../../tests/mockComponents";
import PhoneNumberInput from "./PhoneNumberInput";

test("basic snapshot", () => {
  const component = renderer.create(<PhoneNumberInput components={mockComponents} />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
