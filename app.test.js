var chai = require('chai');
var chaiHttp = require('chai-http');
var parametrize = require('js-parametrize');
var app = require('./app');

chai.use(chaiHttp);
chai.should();

describe('my todo app', () => {
  beforeEach(() => {
    chai.request(app)
      .post('/todo/add')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ newtodo: 'testing todo'  })
      .end();
  })

  afterEach(() => {
    chai.request(app)
      .get('/todo/delete/0')
      .end();
  })

  describe('index endpoint', () => {
    it('should render the html when calling /todo', (done) => {
      chai.request(app)
        .get('/todo')
        .end((err, res) => {
          res.redirects.length.should.equal(0);
          res.status.should.equal(200);
          res.type.should.equal('text/html');
          res.text.should.contain('<title>My todolist</title>');
          chai.assert.isNull(err);
          done();
        });
    });

    it('should render the html file when calling a random unknown endpoint', (done) => {
      chai.request(app)
        .get('/hello')
        .end((err, res) => {
          res.redirects.length.should.equal(1);
          res.status.should.equal(200);
          res.type.should.equal('text/html');
          res.text.should.contain('<title>My todolist</title>');
          chai.assert.isNull(err);
          done();
        });
    });
  });

  describe('add todo endpoint', () => {
    afterEach(() => {
      chai.request(app)
        .get('/todo/delete/0')
        .end();
    })

    it('should add a valid todo when calling /todo/add', (done) => {
      chai.request(app)
        .post('/todo/add')
        .set('content-type', 'application/x-www-form-urlencoded')
        // when given a valid string
        .send({ newtodo: 'i am a new todo'  })
        .end((err, res) => {
          // should render html with new todo
          res.redirects.length.should.equal(1);
          res.status.should.equal(200);
          res.type.should.equal('text/html');
          res.text.should.contain('<b>i am a new todo</b>');
          chai.assert.isNull(err);
          done();
        });
    });

    parametrize([
      [''],
      [null],
      [undefined],
    ], (todo) => {
      it('should add nothing when the todo is invalid', (done) => {
        chai.request(app)
          .post('/todo/add')
          .set('content-type', 'application/x-www-form-urlencoded')
          // when given an invalid string
          .send({ newtodo: todo  })
          .end((err, res) => {
            // should render html without a new todo
            res.redirects.length.should.equal(1);
            res.status.should.equal(200);
            res.type.should.equal('text/html');
            res.text.should.not.contain('<a href="/todo/delete/1">✘</a>');
            chai.assert.isNull(err);
            done();
          });
      });
    });
  });

  describe('edit todo endpoint', () => {
    it('should edit a valid todo when calling /todo/edit', (done) => {
      chai.request(app)
        .post('/todo/edit/0')
        .set('content-type', 'application/x-www-form-urlencoded')
        // when given a valid string
        .send({ edittodo: 'i just edited the todo'  })
        .end((err, res) => {
          // should render html with edited todo
          res.redirects.length.should.equal(1);
          res.status.should.equal(200);
          res.type.should.equal('text/html');
          res.text.should.contain('<b>i just edited the todo</b>');
          chai.assert.isNull(err);
          done();
        });
    });

    parametrize([
      ['', 0],
      [null, 0],
      [undefined, 0],
      ['valid text', 5],
    ], (todo, index) => {
      it('should edit nothing when the todo is invalid', (done) => {
        chai.request(app)
          .post('/todo/edit/' + index)
          .set('content-type', 'application/x-www-form-urlencoded')
          // when given an invalid string index combonation
          .send({ edittodo: todo  })
          .end((err, res) => {
            // should render html with old todo unchanged
            res.redirects.length.should.equal(1);
            res.status.should.equal(200);
            res.type.should.equal('text/html');
            res.text.should.contain('<b>testing todo</b>');
            res.text.should.not.contain('<b>' + todo + '</b>')
            chai.assert.isNull(err);
            done();
          });
      });
    });
  });

  describe('delete todo endpoint', () => {
    it('should delete an existing todo when calling /todo/delete', (done) => {
      chai.request(app)
        // when given a valid index to delete
        .get('/todo/delete/0')
        .end((err, res) => {
          // should render html without the todo
          res.redirects.length.should.equal(1);
          res.status.should.equal(200);
          res.type.should.equal('text/html');
          res.text.should.not.contain('<b>testing todo</b>');
          chai.assert.isNull(err);
          done();
        });
    });

    parametrize([
      [''],
      [null],
      [undefined],
      [5],
    ], (index) => {
      it('should delete nothing when the index is invalid', (done) => {
        chai.request(app)
          // when given an invalid index
          .post('/todo/delete/' + index)
          .end((err, res) => {
            // should render html with old todo unchanged
            res.redirects.length.should.equal(1);
            res.status.should.equal(200);
            res.type.should.equal('text/html');
            res.text.should.contain('<b>testing todo</b>');
            chai.assert.isNull(err);
            done();
          });
      });
    });
  });
});
