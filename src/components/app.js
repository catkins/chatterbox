import React            from 'react';
import { RouteHandler } from 'react-router';
import Header           from './header';
import Sidebar          from './sidebar';

const { Component } = React;

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <div className="row">
          <Sidebar/>
          <div className="large-9 columns">
            <RouteHandler/>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
