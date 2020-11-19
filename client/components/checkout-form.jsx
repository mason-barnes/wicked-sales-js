import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      creditCard: null,
      shippingAddress: null
    };
    this.finalize = this.finalize.bind(this);
  }

  finalize(e) {
    this.props.placeOrder(this.state);
    e.preventDefault();
  }

  render() {
    return (
      <div className="checkout">
        <h1>My Cart</h1>
        <p>Order Total: {this.props.getTotal()}</p>
        <form className="form" onSubmit={this.finalize}>
          <p className="name-heading">Name</p>
          <input className="input" type="text" name="user-name" onChange={event => {
            this.setState({
              name: event.target.value
            });
          }}></input>
          <p className="credit-card-heading">Credit Card Number</p>
          <input className="input" type="text" name="credit-card" onChange={event => {
            this.setState({
              creditCard: event.target.value
            });
          }}></input>
          <p className="address-heading">Shipping Address</p>
          <input className="large-input" type="text" name="address" onChange={event => {
            this.setState({
              shippingAddress: event.target.value
            });
          }}></input>
          <div className="space margin-top-10">
            <p className="font-size-10 padding-top-5 catalog-button" onClick={() => {
              this.props.setView('catalog', {});
            }}><b><i className="fas fa-angle-left"></i> Back to Catalog</b></p>
            <button name="place-order-button" className="order-button">Place Order</button>
          </div>
        </form>
      </div>
    );
  }
}
