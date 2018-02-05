process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const User = require('../../src/server/models/models.user');
chai.use(chaiHttp);

const server = require('../../src/server/app');

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

describe('routes : users', () => {

  beforeEach((done) => {
    User.save(user1);
    User.save(user2);
    done();
  });

  afterEach((done) => {
    User.clear();
    done();
  });

  describe('GET /api/v1/users', () => {
    it('should respond with all users', (done) => {
      chai.request(server)
        .get('/api/v1/users')
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the JSON response body should have a
          // key-value pair of {"data": [2 user objects]}
          res.body.data.length.should.eql(2);
          // the first object in the data array should
          // have the right keys
          res.body.data[0].name.should.eql('John');
          res.body.data[0].address.should.eql('5 Rodney');
          done();
        });
    });
    it('should respond with a user', (done) => {
      chai.request(server)
        .get('/api/v1/users/2')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          res.body.data.name.should.eql('Jim');
          res.body.data.address.should.eql('5 Ave');
          done();
        });
    });

  });

  describe('POST /api/v1/users', () => {
    it('should save a user', (done) => {
      chai.request(server)
        .post('/api/v1/users')
        .send(user3)
        .end((err, res) => {

          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          res.body.data.id.should.eql(3);
          res.body.data.name.should.eql('Bob');

          chai.request(server)
            .get('/api/v1/users/3')
            .end((err, res) => {
              should.not.exist(err);
              res.status.should.equal(200);
              res.type.should.equal('application/json');
              res.body.status.should.eql('success');
              res.body.data.name.should.eql('Bob');
              res.body.data.address.should.eql('5 Road');
              done();
            });

        });
    });
  });

  describe('DELETE /api/v1/users/:id', () => {
    it('should delete a user', (done) => {
      chai.request(server)
        .delete('/api/v1/users/1')
        .end((err, res) => {

          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          res.body.data.should.eql(true);

          chai.request(server)
            .get('/api/v1/users/1')
            .end((err, res) => {
              should.not.exist(err);
              res.status.should.equal(200);
              res.type.should.equal('application/json');
              res.body.status.should.eql('success');
              should.not.exist(res.body.data);
              done();
            });

        });
    });
  });

  describe('GET /api/v1/users/merge/:user1/:user2', () => {
    it('should merge 2 users', (done) => {
      chai.request(server)
        .get('/api/v1/users/merge/1/2')
        .end((err, res) => {

          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          res.body.data.id.should.eql(3);
          res.body.data.name.should.eql('Jim');
          res.body.data.email.should.eql('vendor@test.com');

          chai.request(server)
            .get('/api/v1/users/' + res.body.data)
            .end((err, res) => {
              should.not.exist(err);
              res.status.should.equal(200);
              res.type.should.equal('application/json');
              res.body.status.should.eql('success');
              should.not.exist(res.body.data);
              done();
            });

        });
    });
  });
});

