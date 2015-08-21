import React from 'react';

const { Component, PropTypes } = React;

class MessageList extends Component {

  static propTypes = {
    messages: PropTypes.array,
  }

  render() {
    return (
      <ul className="messages">
        {this.props.messages.map(this._renderMessage)}
      </ul>
    );
  }

  _renderMessage(message, index) {
    return <li key={index}>{message.handle}: {message.text}</li>;
  }
}

export default MessageList;
