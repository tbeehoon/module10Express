const express = require('express');
const router = express.Router();
const store = require('../db');

// List
router.get('/', (req, res) => {
  const todos = store.allTodos();
  res.render('todos/index', { title: 'Todos', todos });
});

// Show edit form
router.get('/:id/edit', (req, res) => {
  const id = Number(req.params.id);
  const todo = store.allTodos().find(t => t.id === id);
  if (!todo) return res.redirect('/todos');
  res.render('todos/edit', { title: 'Edit Todo', todo });
});

// Update
router.post('/:id/edit', (req, res) => {
  const id = Number(req.params.id);
  const text = (req.body.text || '').trim();
  if (!Number.isNaN(id) && text) store.updateTodo(id, text);
  res.redirect('/todos');
});

// Create
router.post('/', (req, res) => {
  const text = (req.body.text || '').trim();
  if (text) store.addTodo(text);
  res.redirect('/todos');
});

// Delete
router.post('/:id/delete', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isNaN(id)) store.deleteTodo(id);
  res.redirect('/todos');
});

module.exports = router;
