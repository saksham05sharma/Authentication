const express = require('express')
const Task = require('../models/Task')

const getAllTasks = async (req,res) => {
    try {
        const allTasks = await Task.find({ user: req.user.id }).sort({
            date: -1,
        });
        return res.status(200).json({ allTasks : allTasks })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message : "Server Error" })
    }
};

const getTask = async (req,res) => {
    const id = req.params.id
    try {
        const foundTask = await Task.findById(id)
        if(!foundTask) {
            return res.status(404).json({ message : "Task Not Found" })
        }
        if(foundTask.user.toString()!==req.user.id) {
            return res.status(404).json({ message : "User is not authorized" })
        }
        return res.status(200).json({ foundTask : foundTask })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message : "Server Error" })
    }
};

const addTask = async (req,res) => {
    const { title, discription, date, time } = req.body
    if( !title || !discription ) {
        return res.status(400).json({ message : "Invalid Data" })
    }
    try {
        const newTask = new Task({
            user: req.user.id,
            title,
            discription,
            date, 
            time,
            done: false,
            trashed: false
        })
        const task = await newTask.save()
        return res.status(200).json({ newTask : task, message : "Task added successfully" })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message : "Server Error" })
    }
};

const editTask = async (req,res) => {};

const markAsDone = async (req,res) => {};

const markAsNotDone = async (req,res) => {};

const moveTaskToTrash = async (req,res) => {};

const restoreTaskFromTrash = async (req,res) => {};

const deleteTask = async (req,res) => {};

module.exports = { getAllTasks, getTask, addTask, editTask, markAsDone, markAsNotDone, moveTaskToTrash, restoreTaskFromTrash, deleteTask }