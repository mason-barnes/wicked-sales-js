import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <header className="header white"><i className="fas fa-dollar-sign"></i> Wicked Sales</header>
    );
  }
}
