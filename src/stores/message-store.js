import AppDispatcher from '../dispatcher/app-dispatcher';
import { EventEmitter } from 'events';
import UserStore from './user-store';
import Immutable from 'immutable';
const { Map, List } = Immutable;

// dummy data for prototype
const _messages = {
  general: [
    {
      userId: 1,
      text: 'Hey mate',
    },
    {
      userId: 2,
      text: 'Nick off!',
    },
  ],

  random: [
    {
      userId: 3,
      text: 'Oi paloi',
    },
  ],
};

class MessageStore extends EventEmitter {

  constructor(messages) {
    super();
    this.messages = Immutable.fromJS(messages);
    this.registerWithDispatcher();
  }

  getMessagesForRoom(roomName) {
    return this.messages.get(roomName) || new List();
  }

  registerWithDispatcher() {
    this.dispatchToken = AppDispatcher.register((payload) => {
      switch (payload.eventName) {
      case 'create-message':
        const { room, text } = payload.data;
        const userId = UserStore.getCurrentUser().id;
        this.createMessage(room, text, userId);
        break;

      default:
        break;
      }

      return true;
    });
  }

  createMessage(roomName, text, userId) {
    const previousMessagesForRoom = this.getMessagesForRoom(roomName);
    const newMessage = new Map({ userId: userId, text: text });
    const newMessagesForRoom = previousMessagesForRoom.push(newMessage);

    this.messages = this.messages.set(roomName, newMessagesForRoom);

    this.emit('change');
  }

}

export default new MessageStore(_messages);
