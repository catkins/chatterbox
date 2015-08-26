import React    from 'react/addons';
import { List } from 'immutable';
import shallowEqual from 'react/lib/shallowEqual';

const { Component, PropTypes } = React;

class MessageList extends Component {

  static propTypes = {
    messages: PropTypes.instanceOf(List),
  }

  shouldComponentUpdate(nextProps, nextState) {
    return ! (shallowEqual(this.props, nextProps) && shallowEqual(this.state, nextState));
  }

  render() {
    return (
      <ul className="messages">
        {this.props.messages.map(this._renderMessage)}
      </ul>
    );
  }

  _renderMessage(message, index) {
    return <li key={index}>{message.get('handle')}: {message.get('text')}</li>;
  }
}

export default MessageList;
