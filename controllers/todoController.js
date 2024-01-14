const { Todo } = require('../models');
const { authenticateUser } = require('./authController');

const createTodo = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const newTodo = await Todo.create({
            title,
            description,
            status,
            userId: req.user.id,
        });

        res.status(201).json(newTodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.findAll({
            where: { userId: req.user.id },
            attributes: ['title', 'description'],
        });
        res.status(200).json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getDetailTodo = async (req, res) => {
    try {
        const todoId = req.params.id;

        const todo = await Todo.findOne({
            where: { id: todoId, userId: req.user.id },
        });

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateTodo = async (req, res) => {
    try {
        const todoId = req.params.id;
        const { title, description, status } = req.body;

        const todo = await Todo.findOne({
            where: { id: todoId, userId: req.user.id },
        });

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        todo.title = title;
        todo.description = description;
        todo.status = status;

        await todo.save();

        res.status(200).json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id;

        const todo = await Todo.findOne({
            where: { id: todoId, userId: req.user.id },
        });

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        await todo.destroy();

        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteAllTodos = async (req, res) => {
    try {
        await Todo.destroy({
            where: { userId: req.user.id },
        });

        res.status(204).json({ message: 'Todos deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    authenticateUser,
    createTodo,
    getAllTodos,
    getDetailTodo,
    updateTodo,
    deleteTodo,
    deleteAllTodos,
};
