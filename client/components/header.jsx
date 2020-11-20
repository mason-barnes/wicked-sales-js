import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.cartView = this.cartView.bind(this);
  }

  cartView() {
    this.props.setView('cart', {});
  }

  render() {
    if (this.props.cartItemCount === 0 || this.props.cartItemCount > 1) {
      return (
        <header className="header white flex">
          <div>
            <i className="fas fa-dollar-sign padding-right-5"></i>
          All Guitars, No Sitars
          </div>
          <p className="font-size-12">This site is a demo only! Do not enter personal info!</p>
          <div className="padding-right-5 hover" onClick={this.cartView}>
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
          All Guitars, No Sitars
          </div>
          <p className="font-size-12">This site is a demo only! Do not enter personal info!</p>
          <div className="padding-right-5 hover" onClick={this.cartView}>
            {this.props.cartItemCount} Item
            <i className="fas fa-shopping-cart padding-right-5 padding-left-5"></i>
          </div>
        </header>
      );
    }
  }
}
