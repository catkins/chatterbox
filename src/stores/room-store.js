import AppDispatcher from '../dispatcher/app-dispatcher';
import { EventEmitter } from 'events';

// dummy data for prototype
const _rooms = [
  { name: 'general' },
  { name: 'random'  }
]

class RoomStore extends EventEmitter {

  constructor(rooms) {
    super();
    this.rooms = rooms;
    this.registerWithDispatcher();
  }

  getAllRooms() {
    return this.rooms;
  }

  registerWithDispatcher() {
    this.dispatchToken = AppDispatcher.register((payload) => {

      switch(payload.eventName) {
        default:
          break;
      }

      return true;
    });
  }

}

export default new RoomStore(_rooms);
