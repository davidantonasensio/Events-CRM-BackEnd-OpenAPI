/**
 * The TaskController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/TaskService');
const addTask = async (request, response) => {
  await Controller.handleRequest(request, response, service.addTask);
};

const deleteTaskByTaskId = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteTaskByTaskId);
};

const getAllTasks = async (request, response) => {
  await Controller.handleRequest(request, response, service.getAllTasks);
};

const getTasksByEventId = async (request, response) => {
  await Controller.handleRequest(request, response, service.getTasksByEventId);
};

const updateTask = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateTask);
};


module.exports = {
  addTask,
  deleteTaskByTaskId,
  getAllTasks,
  getTasksByEventId,
  updateTask,
};
