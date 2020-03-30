/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Add a new task to the DB
*
* task Task Add Task Object to DB
* returns Task
* */
const addTask = ({ task }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        task,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Delete task by Task ID
* Delete task by task ID. Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
*
* eventOrTaskID String ID of the task that needs to be deleted from the DB
* returns inline_response_200
* */
const deleteTaskByTaskId = ({ eventOrTaskID }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        eventOrTaskID,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get all Tasks
* Get all existing tasks in DB
*
* returns List
* */
const getAllTasks = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Find Tasks by eventID
* get all the tasks for the given Event ID. The Id is the event _id. Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
*
* eventOrTaskID String ID of Event DB
* returns Task
* */
const getTasksByEventId = ({ eventOrTaskID }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        eventOrTaskID,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Add a new task to the DB
* Update task for the given task ID. The Id is the event _id. Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
*
* eventOrTaskID String ID of the event that needs to be updated
* task Task 
* returns Task
* */
const updateTask = ({ eventOrTaskID, task }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        eventOrTaskID,
        task,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  addTask,
  deleteTaskByTaskId,
  getAllTasks,
  getTasksByEventId,
  updateTask,
};
