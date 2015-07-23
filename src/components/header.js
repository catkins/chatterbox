import React from 'react';

const Header = React.createClass({
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
});

export default Header;
