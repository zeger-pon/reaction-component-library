import React from "react"; // auto-add i18n 
import i18n from "../../../utils";
import renderer from "react-test-renderer";
import CheckoutActionIncomplete from "./CheckoutActionIncomplete";

test("basic snapshot", () => {
  const component = renderer.create((
    <CheckoutActionIncomplete label={t('Shipping information')} stepNumber={2} />
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
