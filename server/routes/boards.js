const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Board = require('../models/Board');

// @desc    Get all boards for user
// @route   GET /api/boards
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const boards = await Board.find({ user: req.user._id });
        res.json(boards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create a board
// @route   POST /api/boards
// @access  Private
router.post('/', protect, async (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    try {
        const board = await Board.create({
            user: req.user._id,
            title,
            description,
        });
        res.status(201).json(board);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update a board
// @route   PUT /api/boards/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
    try {
        const board = await Board.findById(req.params.id);

        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }

        // Make sure user owns board
        if (board.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        board.title = req.body.title || board.title;
        board.description = req.body.description || board.description;

        const updatedBoard = await board.save();
        res.json(updatedBoard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Delete a board
// @route   DELETE /api/boards/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const board = await Board.findById(req.params.id);

        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }

        // Make sure user owns board
        if (board.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await board.deleteOne();
        res.json({ message: 'Board removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
