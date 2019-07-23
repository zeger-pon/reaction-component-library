import React, { Component } from "react"; // auto-add i18n 
import i18n from "../../../utils";
import PropTypes from "prop-types";
import { ContainerQuery } from "react-container-query";
import styled from "styled-components";
import { withComponents } from "@reactioncommerce/components-context";
import { applyTheme, CustomPropTypes, preventAccidentalDoubleClick } from "../../../utils";

const GridContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const GridItem = styled.div`
  box-sizing: border-box;
  flex-basis: 100%;
  flex-grow: 0;
  margin: 0;
  max-width: 100%;
  padding: 12px;

  ${({ containerParams }) => {
    const { is2PerRowWidth, is3PerRowWidth, is4PerRowWidth } = containerParams;
    if (is2PerRowWidth) {
      return `
        max-width: 50%;
        flex-basis: 50%;
      `;
    } else if (is3PerRowWidth) {
      return `
        max-width: 33.33333%;
        flex-basis: 33.33333%;
      `;
    } else if (is4PerRowWidth) {
      return `
        max-width: 25%;
        flex-basis: 25%;
      `;
    }
    return "";
  }}
`;

class CatalogGrid extends Component {
  static propTypes = {
    /**
     * Labels to use for the various badges. Refer to `BadgeOverlay`'s prop documentation.
     */
    badgeLabels: PropTypes.shape({
      BACKORDER: PropTypes.string,
      BESTSELLER: PropTypes.string,
      LOW_QUANTITY: PropTypes.string,
      SOLD_OUT: PropTypes.string,
      SALE: PropTypes.string
    }),
    /**
     * You can provide a `className` prop that will be applied to the outermost DOM element
     * rendered by this component. We do not recommend using this for styling purposes, but
     * it can be useful as a selector in some situations.
     */
    className: PropTypes.string,
    /**
     * If you've set up a components context using
     * [@reactioncommerce/components-context](https://github.com/reactioncommerce/components-context)
     * (recommended), then this prop will come from there automatically. If you have not
     * set up a components context or you want to override one of the components in a
     * single spot, you can pass in the components prop directly.
     */
    components: PropTypes.shape({
      CatalogGridItem: CustomPropTypes.component.isRequired
    }).isRequired,
    /**
     * Currency code to display the price for. Product must include a pricing object with the code in `product.pricing`
     */
    currencyCode: PropTypes.string,
    /**
     * The inital size the grid should render at. Use to set grid width during SSR.
     */
    initialSize: PropTypes.shape({
      height: PropTypes.number,
      width: PropTypes.number
    }),
    /**
     * Item click handler
     */
    onItemClick: PropTypes.func,
    /**
     * Image to display when product doesn't have a primary image
     */
    placeholderImageURL: PropTypes.string,
    /**
     * Products to display in the grid. Refer to `CatalogGridItem`'s documentation
     */
    products: PropTypes.arrayOf(PropTypes.object)
  };

  static defaultProps = {
    badgeLabels: null,
    currencyCode: "USD",
    initialSize: {
      width: 325
    },
    onItemClick() {},
    placeholderImageURL: "/resources/placeholder.gif",
    products: []
  };

  handleOnClick = preventAccidentalDoubleClick((event, product) => {
    this.props.onItemClick(event, product);
  });

  getContainerQueries() {
    const threePerRowMinWidth = applyTheme("CatalogGrid.threePerRowMinWidth")(this.props);
    const fourPerRowMinWidth = applyTheme("CatalogGrid.fourPerRowMinWidth")(this.props);
    return {
      is2PerRowWidth: {
        minWidth: 450, // Min width that item w/ 2 badges renders appropriately
        maxWidth: threePerRowMinWidth - 1
      },
      is3PerRowWidth: {
        minWidth: threePerRowMinWidth,
        maxWidth: fourPerRowMinWidth - 1
      },
      is4PerRowWidth: {
        minWidth: fourPerRowMinWidth
      }
    };
  }

  render() {
    const {
      badgeLabels,
      className,
      components: { CatalogGridItem },
      currencyCode,
      initialSize,
      onItemClick,
      placeholderImageURL,
      products
    } = this.props;

    const gridItemProps = {
      currencyCode,
      placeholderImageURL,
      onClick: onItemClick
    };

    if (badgeLabels) {
      gridItemProps.badgeLabels = badgeLabels;
    }

    return (
      <ContainerQuery className={className} query={this.getContainerQueries()} initialSize={initialSize}>
        {(params) => (
          <GridContainer>
            {products.map((product, index) => (
              <GridItem containerParams={params} key={`grid-item-${index}`} {...this.props}>
                <CatalogGridItem product={product} {...gridItemProps} />
              </GridItem>
            ))}
          </GridContainer>
        )}
      </ContainerQuery>
    );
  }
}

export default i18n.withTranslation()(withComponents(CatalogGrid)); // auto-add i18n
