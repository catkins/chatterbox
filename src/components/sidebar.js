import React from 'react';
import { Link } from 'react-router';
import RoomStore from '../stores/room-store';

const { Component } = React;

class Sidebar extends Component {

  componentDidMount() {
    RoomStore.on('change', ::this._roomsChanged);
  }

  componentWillUnmount() {
    RoomStore.removeListener('change', ::this._roomsChanged);
  }

  getRooms() {
    return RoomStore.getAllRooms();
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

  render() {
    return (
      <aside className="large-3 columns sidebar">
        <div className="heading">Rooms</div>
        <ul className="side-nav">
          {this.renderLinks()}
        </ul>
      </aside>
    );
  }

  _roomsChanged() {
    this.forceUpdate();
  }

}

export default Sidebar;
