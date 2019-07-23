import React from "react"; // auto-add i18n 
import i18n from "../../../utils";
import renderer from "react-test-renderer";
import mockComponents from "../../../tests/mockComponents";
import CheckoutActionComplete from "./CheckoutActionComplete";

test("basic snapshot", () => {
  const onClick = () => {};

  const Address = "<div><p>123 Main Street</p><p>Anytown, USA 01776</p></div>";

  const component = renderer.create((
    <CheckoutActionComplete
      components={mockComponents}
      label={t('Shipping address')}
      content={Address}
      onClickChangeButton={onClick}
      stepNumber={2}
    />
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
