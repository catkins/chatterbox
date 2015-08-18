import AppDispatcher from '../dispatcher/app-dispatcher'
import { EventEmitter } from 'events';

// dummy data for prototype
const _messages = {
  general: [
    {
      from: 'gary',
      text: 'Hey mate'
    },
    {
      from: 'tony',
      text: 'Nick off!'
    }
  ],

  random: [
    {
      from: 'murray',
      text: 'Oi paloi'
    }
  ]
}

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

      switch(payload.eventName) {
        case 'create-message':
          let { room, text } = payload.data;
          let user = 'gary';

          this.createMessage(room, text, user);
          break;

        default:
          break;
      }

      return true;
    });
  }

  createMessage(room, text, user) {
    this.messages[room] = this.messages[room] || [];

    this.messages[room].push({
      from: user,
      text: text
    });

    this.emit('change');
  }

}

export default new MessageStore(_messages);
