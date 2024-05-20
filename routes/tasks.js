const express = require('express')
const auth = require('../middlewares/auth')
const { getAllTasks, getTask, addTask, editTask, markAsDone, markAsNotDone, moveTaskToTrash, restoreTaskFromTrash, deleteTask } = require('../controller/tasks')
const router = express.Router()

router.use(auth)

router.get('/', getAllTasks)
router.get('/:id', getTask)
router.post('/add', addTask)
router.put('/edit/:id', editTask)
router.put('/mark-as-done/:id', markAsDone)
router.put('mark-as-not-done/:id', markAsNotDone)
router.put('/trash/:id', moveTaskToTrash)
router.put('/restore/:id', restoreTaskFromTrash)
router.delete('/delete/:id', deleteTask)

module.exports = router