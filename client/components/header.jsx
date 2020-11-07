import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.cartItemCount === 0 || this.props.cartItemCount > 1) {
      return (
        <header className="header white flex">
          <div>
            <i className="fas fa-dollar-sign padding-right-5"></i>
          Wicked Sales
          </div>
          <div className="padding-right-5 hover">
            {this.props.cartItemCount} Items
            <i className="fas fa-shopping-cart padding-right-5 padding-left-5"></i>
          </div>
        </header>
      );
    } else {
      return (
        <header className="header white flex">
          <div>
            <i className="fas fa-dollar-sign padding-right-5"></i>
          Wicked Sales
          </div>
          <div className="padding-right-5 hover">
            {this.props.cartItemCount} Item
            <i className="fas fa-shopping-cart padding-right-5 padding-left-5"></i>
          </div>
        </header>
      );
    }
  }
}
