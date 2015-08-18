import React from 'react';
import { Link } from 'react-router';

const { Component } = React;

class Sidebar extends Component {

  render() {
    const chatrooms = this.props.chatrooms;
    const links = chatrooms.map((room) =>
      <li key={room.name}>
        <Link to="room" params={{room: room.name}}>
          #{room.name}
        </Link>
      </li>
    );

    return (
      <aside className="large-3 columns">
        <ul className="side-nav">
          {links}
        </ul>
      </aside>
    );
  }

}

export default Sidebar;
