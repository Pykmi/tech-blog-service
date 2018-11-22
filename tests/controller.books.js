var should = require('should'),
    sinon = require('sinon'),
    controller = require('../controllers/books');

describe('Book Controller Tests: ', () => {
  describe('Posts', () => {
    it('should not allow an empty title in post', () => {
      var Book = (book) => this.save() = () => {};

      var req = {
        body: {
          author: 'Jon'
        }
      };

      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      };

      controller().post(req, res);
      res.status.calledWith(400).should.equal(true, `Bad request ${res.status.args[0][0]}`);
      res.send.calledWith('Bad request').should.equal(true);
    });
  });
});
