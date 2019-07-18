import React from "react";
import renderer from "react-test-renderer";
import SelectableItem from "./SelectableItem";

test("basic snapshot with empty props", () => {
  const component = renderer.create(<SelectableItem label={t('Label" detail="Detail" value="detail')} />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
