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

//new
const deleteTaskByEventId = async (request, response) => {
	  await Controller.handleRequest(request, response, service.deleteTaskByEventId);
};

//new
const getAllTasks = async (request, response) => {
  await Controller.handleRequest(request, response, service.getAllTasks);
};

// modified
const getOneTaskByTaskId = async (request, response) => {
	  await Controller.handleRequest(request, response, service.getOneTaskByTaskId);
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
  deleteTaskByEventId,
  getTasksByEventId,
  getAllTasks,
  getOneTaskByTaskId,
  updateTask,
};
