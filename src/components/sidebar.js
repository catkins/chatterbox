import React from 'react';
import { Link } from 'react-router';
import RoomStore from '../stores/room-store';

const { Component } = React;

class Sidebar extends Component {

  render() {
    return (
      <aside className="large-3 columns">
        <ul className="side-nav">
          {this.renderLinks()}
        </ul>
      </aside>
    );
  }

  renderLinks() {
    return this.getRooms().map((room) =>
      <li key={room.name}>
        <Link to="room" params={{room: room.name}}>
          #{room.name}
        </Link>
      </li>
    );
  }

  getRooms() {
    return RoomStore.getAllRooms();
  }

  componentDidMount() {
    RoomStore.on('change', this._roomsChanged)
  }

  componentWillUnmount() {
    RoomStore.removeListener('change', this._roomsChanged)
  }

  _roomsChanged = () => {
    this.forceUpdate();
  }

}

export default Sidebar;
