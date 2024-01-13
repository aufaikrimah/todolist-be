const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const todoController = require('../controllers/todoController');

//endpoint auth
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

//endpoint todos
router.post('/new-todos', authController.authenticateUser, todoController.createTodo);
router.get('/all-todos', authController.authenticateUser, todoController.getAllTodos);
router.get('/todo/:id', authController.authenticateUser, todoController.getDetailTodo);
router.put('/edit-todo/:id', authController.authenticateUser, todoController.updateTodo);
router.delete('/delete-todo/:id', authController.authenticateUser, todoController.deleteTodo);
router.delete('/todos', authController.authenticateUser, todoController.deleteAllTodos);

module.exports = router;