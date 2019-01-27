const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

let todolist = [];

/* The to do list and the form are displayed */
app.get('/todo', (_req, res) => {
  res.render('todo.ejs', { todolist });
})

/* Adding an item to the to do list */
.post('/todo/add/', urlencodedParser, (req, res) => {
  if (typeof(req.body.newtodo) == 'string' && req.body.newtodo != '') {
    todolist.push(req.body.newtodo);
  }

  res.redirect('/todo');
})

/* Edits an item from the to do list */
.post('/todo/edit/:id', urlencodedParser, (req, res) => {
  const editTodo = req.body.edittodo;
  const id = req.params.id;
  
  if (typeof(editTodo) == 'string' && editTodo != '' && id < todolist.length) {
    todolist[id] = editTodo;
  }

  res.redirect('/todo');
})

/* Deletes an item from the to do list */
.get('/todo/delete/:id', (req, res) => {
  if (req.params.id != '') {
    todolist.splice(req.params.id, 1);
  }

  res.redirect('/todo');
})

/* Redirects to the to do list if the page requested is not found */
.use((_req, res, _next) => {
  res.redirect('/todo');
})

.listen(8080);

module.exports = app;
