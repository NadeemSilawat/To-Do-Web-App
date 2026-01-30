const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Todo = require('../models/Todo');
const Board = require('../models/Board');

// @desc    Get todos for a board
// @route   GET /api/todos/:boardId
// @access  Private
router.get('/:boardId', protect, async (req, res) => {
    try {
        // Check if board belongs to user
        const board = await Board.findById(req.params.boardId);
        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }
        if (board.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const todos = await Todo.find({ board: req.params.boardId });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create a todo
// @route   POST /api/todos
// @access  Private
router.post('/', protect, async (req, res) => {
    const { content, boardId, status } = req.body;

    if (!content || !boardId) {
        return res.status(400).json({ message: 'Content and Board ID are required' });
    }

    try {
        // Verify board ownership
        const board = await Board.findById(boardId);
        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }
        if (board.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const todo = await Todo.create({
            content,
            board: boardId,
            status: status || 'todo',
        });
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update a todo
// @route   PUT /api/todos/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // Verify board/user ownership through the todo's board
        // We need to populate board to check owner, OR separate query
        // Faster to just check board ownership if we trust the todo->board link
        const board = await Board.findById(todo.board);
        if (!board || board.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        todo.content = req.body.content || todo.content;
        todo.status = req.body.status || todo.status;

        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        const board = await Board.findById(todo.board);
        if (!board || board.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await todo.deleteOne();
        res.json({ message: 'Todo removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
