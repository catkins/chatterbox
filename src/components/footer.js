import React from 'react';

const { Component } = React;

class Footer extends Component {

  render() {
    return (
      <footer className="row">
        <div className="large-12 columns">
          <div className="right">Chatterbox {new Date().getFullYear()}</div>
        </div>
      </footer>
    );
  }

}

export default Footer;
