/**
 * The CalenderController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/CalenderService');
const addDate = async (request, response) => {
  await Controller.handleRequest(request, response, service.addDate);
};

const deleteDateByDateId = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteDateByDateId);
};

const getAllDates = async (request, response) => {
  await Controller.handleRequest(request, response, service.getAllDates);
};

const getAllDatesByEventId = async (request, response) => {
  await Controller.handleRequest(request, response, service.getAllDatesByEventId);
};

const updateDateByID = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateDateByID);
};


module.exports = {
  addDate,
  deleteDateByDateId,
  getAllDates,
  getAllDatesByEventId,
  updateDateByID,
};
