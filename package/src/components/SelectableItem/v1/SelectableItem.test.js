import React from "react"; // auto-add i18n 
import i18n from "../../../utils";
import renderer from "react-test-renderer";
import SelectableItem from "./SelectableItem";

test("basic snapshot with empty props", () => {
  const component = renderer.create(<SelectableItem label={t('Label" detail="Detail" value="detail')} />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
