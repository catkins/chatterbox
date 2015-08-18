import { EventEmitter } from 'events';

const rooms = [
  { name: 'general' },
  { name: 'random'  }
]

class RoomStore extends EventEmitter {
  constructor(rooms) {
    super();
    this.rooms = rooms
  }

  getAllRooms() {
    return this.rooms;
  }
}

export default new RoomStore(rooms);
