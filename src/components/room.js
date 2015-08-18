import React         from 'react';
import MessageStore  from '../stores/message-store';
import AppDispatcher from '../dispatcher/app-dispatcher';

const { Component } = React

class Room extends Component {

  constructor(props) {
    super(props);
    this.state = { newMessage: '' };
  }

  componentDidMount() {
    MessageStore.on('change', this._messagesChanged)
  }

  componentWillUnmount() {
    MessageStore.removeListener('change', this._messagesChanged)
  }

  render() {
    const messages = this._renderMessages();

    return (
      <div>
        <h4>{messages.length} message{messages.length == 1 ? '' : 's' }</h4>

        <ul>
          {this._renderMessages()}
        </ul>

        {this._renderNewMessageBox()}

      </div>
    );
  }

  _renderMessages() {
    const roomId = this.props.params.room;

    let messages = MessageStore.getMessagesForRoom(roomId);

    return messages.map((msg, index) =>
      (<li key={index}>@{msg.from}: {msg.text}</li>)
    );
  }

  _renderNewMessageBox() {
    return (
      <div className="row collapse">
        <div className="small large-10 columns">
          <input type="text" value={this.state.newMessage} onChange={this._newMessageChanged} />
        </div>
        <div className="small large-2 columns">
          <button className="button postfix" onClick={this._sendMessage}>Send</button>
          </div>
      </div>
    );
  }

  _messagesChanged = () => {
    // TODO: is there a nicer way of doing this?
    this.forceUpdate();
  }

  _newMessageChanged = (event) => {
    this.setState({ newMessage: event.target.value });
  }

  _sendMessage = (event) => {
    let newMessage = this.state.newMessage;
    this.setState({ newMessage: '' });

    AppDispatcher.dispatch({
      eventName: 'create-message',
      data: {
        text: newMessage,
        room: this.props.params.room
      }
    });
  }
}

export default Room;
