import React        from 'react';
import MessageStore from '../stores/message-store';

const { Component } = React

class Room extends Component {

  renderMessages() {
    const roomId = this.props.params.room;

    let messages = MessageStore.getMessagesForRoom(roomId);

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
}

export default Room;
