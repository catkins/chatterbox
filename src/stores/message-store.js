import AppDispatcher from '../dispatcher/app-dispatcher';
import { EventEmitter } from 'events';
import UserStore from './user-store';

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
    this.messages = messages;
    this.registerWithDispatcher();
  }

  getMessagesForRoom(roomName) {
    return this.messages[roomName] || [];
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

  createMessage(room, text, userId) {
    this.messages[room] = this.messages[room] || [];

    this.messages[room].push({
      userId: userId,
      text: text,
    });

    this.emit('change');
  }

}

export default new MessageStore(_messages);
