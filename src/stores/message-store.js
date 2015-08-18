import { EventEmitter } from 'events';

const messages = {
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
      from: 'murry',
      text: 'Oi paloi'
    }
  ]
}

class MessageStore extends EventEmitter {

  getMessagesForRoom(roomName) {
    return messages[roomName] || [];
  }

}

export default new MessageStore();
