'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const _ = require('lodash');
const expect = chai.expect;
const should = chai.should();

const userModel = require('../../src/server/models/models.user');

const user1 = {
  id: 1,
  name: 'John',
  address: '5 Rodney',
  customerType: 'client',
  phoneNumber: '555',
  email: null,
  tag: ['tag1','tag2']
};
const user2 = {
  id: 2,
  name: 'Jim',
  address: '5 Ave',
  customerType: 'vendor',
  phoneNumber: '666',
  email: 'vendor@test.com',
  tag: ['tag3','tag2']
};
const user3 = {
  name: 'Bob',
  address: '5 Road',
  customerType: 'vendor',
  phoneNumber: '666',
  email: 'vendor@test.com',
  tag: ['tag3','tag2']
};

describe('models : user', function() {

  beforeEach((done) => {
    done();
  });

  afterEach((done) => {
    userModel.clear();
    done();
  });

  describe('save()', function() {
    it('should throw an error for no data',function(done){
      expect(userModel.save).to.throw();
      done();
    });
    it('should return a promise with the saved user',function(done){
      var res = userModel.save(user1);
      res.then(data => {
        expect(data.id).to.equal(1);
        expect(data.name).to.equal('John');
        done();
      });
    });
    it('should create a new id for a user passed without an id',function(done){
      var res = userModel.save(user3);
      res.then(data => {
        expect(data.id).to.equal(1);
        expect(data.name).to.equal('Bob');
        done();
      });
    });

  });

  describe('get()', function() {
    it('should return a user when an id is passed',function(done){
      userModel.save(user1);
      userModel.get(1)
        .then((data) => {
          expect(data.id).to.equal(1);
          expect(data.name).to.equal('John');
          done();
        });
    });
  });

  describe('deleteUser()', function() {
    it('should remove a user when an id is passed',function(done){
      //save a user
      userModel.save(user1);
      // check to see it is saved
      userModel.get(1)
        .then((data) => {
          expect(data.id).to.equal(1);
          // delete the user
          userModel.deleteUser(1)
            .then(data => {
              expect(data).to.equal(true);
              userModel.get(1)
                .then(data => {
                  expect(data).to.equal(null);
                  done();
                });
            });
        });
    });
  });

  describe('merge()', function(){
    beforeEach((done) => {
      userModel.save(user1);
      userModel.save(user2);
      done();
    });

    afterEach((done) => {
      userModel.clear();
      done();
    });
    it('should delete the merged users',function(done){
      userModel.merge(1,2)
        .then(data => {
          expect(data[0].id).to.equal(3);
          userModel.get(1)
            .then((data) => {
              expect(data).to.equal(null);
              userModel.get(2)
                .then((data) => {
                  expect(data).to.equal(null);
                  done();
                });
            });
        });
    });
    it('should create a new merged user',function(done){
      userModel.merge(1,2)
        .then(user => {
          expect(user[0].id).to.equal(3);
          userModel.get(3)
            .then((data) => {
              expect(data.email).to.equal('vendor@test.com');
              done();
            });
        });
    });
  });

  describe('clear()',function(){
    beforeEach((done) => {
      userModel.save(user1);
      userModel.save(user2);
      done();
    });

    afterEach((done) => {
      userModel.clear();
      done();
    });
    it('should delete all users',function(done){
      expect(_.values(userModel.store).length).to.equal(2);
      userModel.clear();
      expect(_.values(userModel.store).length).to.equal(0);
      done();
    });
  });

});
