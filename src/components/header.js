import React from 'react';
import UserStore from '../stores/user-store';

const { Component } = React;

class Header extends Component {

  render() {
    return (
      <nav className="top-bar">
        <ul className="title-area">
          <li className="name">
            <h1><a>Chatterbox</a></h1>
          </li>
        </ul>

        <section className="top-bar-section">
          <ul className="right">
            <li className="active">
            <a>{this._getCurrentUserHandle()}</a></li>
          </ul>
        </section>
      </nav>
    );
  }

  _getCurrentUserHandle() {
    return `@${UserStore.getCurrentUser().handle}`;
  }

}

export default Header;
