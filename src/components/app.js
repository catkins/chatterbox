import React            from 'react';
import { RouteHandler } from 'react-router';
import Header           from './header';
import Footer           from './footer';
import Sidebar          from './sidebar';
import chatrooms        from '../stores/chatroom-store';

const { Component } = React;

class App extends Component {

  render() {
    return (
      <div>
        <Header />

        <div className="row">
          <Sidebar chatrooms={chatrooms}/>

          <div className="large-9 columns">
            <RouteHandler/>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

};

export default App;
