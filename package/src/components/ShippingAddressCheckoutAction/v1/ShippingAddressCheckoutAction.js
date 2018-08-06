import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withComponents } from "@reactioncommerce/components-context";
import { CustomPropTypes } from "../../../utils";

const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
`;

class ShippingAddressCheckoutAction extends Component {
  static propTypes = {
    /**
     * If you've set up a components context using @reactioncommerce/components-context
     * (recommended), then this prop will come from there automatically. If you have not
     * set up a components context or you want to override one of the components in a
     * single spot, you can pass in the components prop directly.
     */
    components: PropTypes.shape({
      /**
       * Pass either the Reaction AddressForm component or your own component that
       * accepts compatible props.
       */
      AddressForm: CustomPropTypes.component.isRequired,
      Button: CustomPropTypes.component.isRequired,
      CheckoutAction: CustomPropTypes.component.isRequired,
      CheckoutActionComplete: CustomPropTypes.component.isRequired,
      CheckoutActionIncomplete: CustomPropTypes.component.isRequired
    }).isRequired,
    fullfillmentGroup: PropTypes.shape({
      data: PropTypes.shape({
        shippingAddress: PropTypes.object
      })
    }).isRequired,
    isSaving: PropTypes.bool,
    onReadyForSaveChange: PropTypes.func,
    status: PropTypes.oneOf(["active", "complete", "incomplete"])
  };

  static defaultProps = {
    onReadyForSaveChange() {}
  };

  state = {
    // eslint-disable-next-line
    actionStatus: this.props.status
      ? this.props.status
      : this.props.fullfillmentGroup.data.shippingAddress ? "complete" : "incomplete",
    activeAddress: this.props.fullfillmentGroup.data.shippingAddress,
    activeCountry: "US",
    countries: [
      { value: "US", label: "United States" },
      { value: "DE", label: "Germany" },
      { value: "NU", label: "Nigeria" }
    ],
    regions: {
      US: [{ value: "LA", label: "Louisiana" }, { value: "CA", label: "California" }]
    }
  };

  componentDidMount() {
    const { onReadyForSaveChange } = this.props;
    onReadyForSaveChange(true);
  }

  _addressForm = null;

  changeStatus = () => {
    const { actionStatus, activeAddress } = this.state;
    if (actionStatus === "active" && activeAddress) {
      this.setState({ actionStatus: "complete" });
    } else if (actionStatus === "active" && !activeAddress) {
      this.setState({ actionStatus: "incomplete" });
    } else {
      this.setState({ actionStatus: "complete" });
    }
  };

  getFullfillmentData = (address) => {
    // eslint-disable-next-line
    console.log("submited shipping address", address);
  };

  handleCountryChange(country) {
    const activeCountry = this.state.countries.find((cnty) => cnty.value === country);

    if (activeCountry) {
      this.setState({
        activeCountry: activeCountry.value
      });
    }
  }

  renderActive() {
    const { components: { AddressForm, Button }, fullfillmentGroup: { data: { shippingAddress } } } = this.props;
    return (
      <Fragment>
        <AddressForm
          ref={(formEl) => {
            this._addressForm = formEl;
          }}
          countries={this.state.countries}
          regions={this.state.regions[this.state.activeCountry]}
          onCountryChange={(value) => this.handleCountryChange(value)}
          onSubmit={this.getFullfillmentData}
          value={shippingAddress}
        />
        <FormActions>
          <Button actionType="secondary" isTextOnly isShortHeight onClick={this.changeStatus}>
            Cancel
          </Button>
          <Button actionType="important" isShortHeight onClick={() => this._addressForm.submit()}>
            Save and continue
          </Button>
        </FormActions>
      </Fragment>
    );
  }

  renderComplete() {
    const { components: { CheckoutActionComplete }, fullfillmentGroup: { data: { shippingAddress } } } = this.props;
    if (shippingAddress === null) return "";
    const addressEl = (
      <address>
        {shippingAddress.firstName} {shippingAddress.lastName}
        <br />
        {shippingAddress.address1}
        <br />
        {shippingAddress.address2 !== "" ? `${shippingAddress.address2}${<br />}` : ""}
        {shippingAddress.city}, {shippingAddress.country} {shippingAddress.postal}
      </address>
    );
    return <CheckoutActionComplete content={addressEl} onClickChangeButton={this.changeStatus} />;
  }

  renderIncomplete() {
    const { components: { CheckoutActionIncomplete } } = this.props;
    return <CheckoutActionIncomplete />;
  }

  render() {
    const { components: { CheckoutAction } } = this.props;
    const { actionStatus } = this.state;
    return (
      <CheckoutAction
        status={actionStatus}
        label="Shipping Information"
        stepNumber={2}
        activeStepElement={this.renderActive()}
        completeStepElement={this.renderComplete()}
        incompleteStepElement={this.renderIncomplete()}
      />
    );
  }
}

export default withComponents(ShippingAddressCheckoutAction);
