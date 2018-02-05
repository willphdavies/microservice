'use strict';

const bb = require('bluebird');
const _ = require('lodash');

const schema = {
  id: null,
  name: null,
  company: null,
  address: null,
  customerType: null,
  phoneNumber: null,
  email: null,
  tags: [],
  created: null,
  updated: null
};

let User = {
  data: {},
  store: {},
  save: (data) => {
    if (data) {
      if (!data.id) {
        data.created = new Date();
        data.id = _.values(User.store).length + 1;
      }
      data.updated = new Date();
      User.data = data;
      User.store['user' + User.data.id] = _.merge(User.store['user' + User.data.id], User.data);
      return bb.resolve(User.store['user' + User.data.id]);
    } else {
      throw new Error('No data provided');
    }
  },
  get: (id) => {
    if (id) {
      if (User.store['user' + id]) {
        return bb.resolve(_.merge(schema, User.store['user' + id]));
      } else {
        return bb.resolve(null);
      }
    } else {
      return bb.resolve(_.values(User.store));
    }
  },
  deleteUser: (id) => {
    delete User.store['user' + id];
    return bb.resolve(true);
  },
  merge: (id1,id2) => {
    return bb.all([
      User.get(id1),
      User.get(id2)
    ]).spread((user1,user2) => {
      if (user1 && user2) {
        let newUser = _.merge(user1,user2);
        delete newUser.id;
        return bb.all([
          User.save(newUser),
          User.deleteUser(id1),
          User.deleteUser(id2)
          ]);
      }
    });
  },
  clear: () => {
    User.store = {};
  }
};

module.exports = User;
