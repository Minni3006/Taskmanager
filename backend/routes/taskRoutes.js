const express = require('express');
const { body } = require('express-validator');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

const taskValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
];

router.use(protect);

router.route('/').get(getTasks).post(taskValidation, createTask);
router.route('/:id').put(updateTask).delete(deleteTask);

module.exports = router;
