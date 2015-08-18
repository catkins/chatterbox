import {
  run,
  Route,
  HashLocation
} from 'react-router';

import React     from 'react';

import App       from './components/app';
import Room      from './components/room';

const routes = (
  <Route handler={App} path="/">
    <Route path=":room" name="room" handler={Room} />
  </Route>
);

run(routes, HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
