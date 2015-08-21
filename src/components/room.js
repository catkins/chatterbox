import React         from 'react';
import MessageStore  from '../stores/message-store';
import UserStore     from '../stores/user-store';
import MessageBox    from './message-box';

const { Component } = React;

class Room extends Component {

  static propTypes = {
    params: PropTypes.object,
  }

  componentDidMount() {
    MessageStore.on('change', ::this._messagesChanged);
  }

  componentWillUnmount() {
    MessageStore.removeListener('change', ::this._messagesChanged);
  }

  render() {
    const messages = this._renderMessages();

    return (
      <div className="room">
        <h4>{messages.length} message{messages.length === 1 ? '' : 's' }</h4>

        <ul className="messages">
          {this._renderMessages()}
        </ul>
        <MessageBox roomName={this.props.params.room} />
      </div>
    );
  }

  _renderMessages() {
    const roomId = this.props.params.room;

    const messages = MessageStore.getMessagesForRoom(roomId);

    return messages.map((msg, index) => this._renderMessage(msg, index));
  }

  _renderMessage(msg, index) {
    const user = UserStore.findById(msg.userId);

    return <li className="message" key={index}>@{user.handle}: {msg.text}</li>;
  }

  _messagesChanged() {
    // TODO: is there a nicer way of doing this?
    this.forceUpdate();
  }

}

export default Room;
