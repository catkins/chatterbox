import AppDispatcher from '../dispatcher/app-dispatcher';
import { EventEmitter } from 'events';
import values from 'lodash/object/values';


// dummy data for prototype
const _users = {
  1: { id: 1, handle: 'gary'   },
  2: { id: 2, handle: 'tony'   },
  3: { id: 3, handle: 'murray' }
}

class UserStore extends EventEmitter {

  constructor(users) {
    super();
    this.users = users;
    this.registerWithDispatcher();
  }

  getAllUsers() {
    return values(this.users);
  }

  findById(userId) {
    return this.users[userId];
  }

  getCurrentUser() {
    // arbitrarily 'Gary' for the moment
    return this.findById(1);
  }

  registerWithDispatcher() {
    this.dispatchToken = AppDispatcher.register((payload) => {

      switch(payload.eventName) {
        default:
          break;
      }

      return true;
    });
  }

}

export default new UserStore(_users);
