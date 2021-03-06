import React         from 'react';
import AppDispatcher from '../dispatcher/app-dispatcher';
import autobind      from 'autobind-decorator';

const { Component, PropTypes } = React;

class MessageBox extends Component {

  static propTypes = {
    roomName: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      newMessage: '',
    };
  }

  render() {
    return (
      <form onSubmit={this._sendMessage}>
        <div className="row collapse">

          <div className="small large-10 columns">
            <input type="text" value={this.state.newMessage} onChange={this._newMessageChanged} />
          </div>

          <div className="small large-2 columns">
            <input type="submit" className="button postfix" value="Send" disabled={!this.state.newMessage} />
          </div>
        </div>
      </form>
    );
  }

  @autobind
  _newMessageChanged(event) {
    this.setState({ newMessage: event.target.value });
  }

  @autobind
  _sendMessage() {
    const newMessage = this.state.newMessage;
    this.setState({ newMessage: '' });

    AppDispatcher.dispatch({
      eventName: 'create-message',
      data: {
        text: newMessage,
        room: this.props.roomName,
      },
    });
  }
}

export default MessageBox;
