/**
 * The EventController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/EventService');
const addEvent = async (request, response) => {
  await Controller.handleRequest(request, response, service.addEvent);
};

const deleteEventByID = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteEventByID);
};

const getAllEvents = async (request, response) => {
  await Controller.handleRequest(request, response, service.getAllEvents);
};

const getEventById = async (request, response) => {
  await Controller.handleRequest(request, response, service.getEventById);
};

const updateEventByID = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateEventByID);
};


module.exports = {
  addEvent,
  deleteEventByID,
  getAllEvents,
  getEventById,
  updateEventByID,
};
