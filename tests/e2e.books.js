var should = require('should'),
    request = require('supertest'),
    app = require('../app'),
    mongoose = require('mongoose'),
    book = mongoose.model('book'),
    agent = request.agent(app);

describe('Book Crud Test', () => {
  it('Should allow a book to be posted', (done) => {
    const data = {
      title: 'The Sunless Citadel',
      author: 'Bruce R Cordell',
      genre: 'Roleplaying Games'
    };

    agent.post('/api/books')
      .send(data)
      .end((err, res) => {
        res.statusCode.should.equal(201);
        done();
      });
    
    afterEach((done) => {
      book.deleteOne().exec();
      done();
    });
  });
});