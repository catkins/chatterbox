import React        from 'react';
import MessageStore from '../stores/message-store';
import UserStore    from '../stores/user-store';
import MessageBox   from './message-box';
import MessageList  from './message-list';
import autobind     from 'autobind-decorator';
import { Map }      from 'immutable';

const { Component, PropTypes } = React;

class Room extends Component {

  static propTypes = {
    params: PropTypes.object,
  }

  componentDidMount() {
    MessageStore.on('change', this._messagesChanged);
  }

  componentWillUnmount() {
    MessageStore.removeListener('change', this._messagesChanged);
  }

  render() {
    const messages = this._getMessages();

    return (
      <div className="room">
        <h4>{messages.size} message{messages.size === 1 ? '' : 's' }</h4>

        <MessageList messages={messages} />
        <MessageBox roomName={this.props.params.room} />
      </div>
    );
  }

  @autobind
  _getMessages() {
    const roomId = this.props.params.room;

    return MessageStore.getMessagesForRoom(roomId).map((msg) => {
      const user = UserStore.findById(msg.get('userId'));

      return new Map({ text: msg.get('text'), handle: `@${user.handle}` });
    });
  }

  @autobind
  _messagesChanged() {
    // TODO: is there a nicer way of doing this?
    this.forceUpdate();
  }

}

export default Room;
