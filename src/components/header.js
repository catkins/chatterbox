import React from 'react';

const { Component } = React;

class Header extends Component {

  render() {
    return (
      <nav className="top-bar">
        <ul className="title-area">
          <li className="name">
            <h1><a href="#">Chatterbox</a></h1>
          </li>
        </ul>
      </nav>
    );
  }

}

export default Header;
