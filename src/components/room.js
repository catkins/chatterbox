import React     from 'react';
import chatrooms from '../stores/chatroom-store';
import findWhere from 'lodash/collection/findWhere';

const { Component } = React

class Room extends Component {

  renderMessages() {
    const roomId = this.props.params.room;
    const room = findWhere(chatrooms, { name: roomId });
    let messages = room.messages;
    return messages.map((msg, index) =>
      (<li key={index}>{msg.from}: {msg.text}</li>)
    );
  }

  render() {
    const messages = this.renderMessages();

    return (
      <div>
        <h4>{messages.length} messages</h4>
        <ul>
          {messages}
        </ul>
      </div>
    );
  }
});
