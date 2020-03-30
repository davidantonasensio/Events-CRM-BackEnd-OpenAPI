/**
 * The MessagesController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/MessagesService');
const addMessageByEventID = async (request, response) => {
  await Controller.handleRequest(request, response, service.addMessageByEventID);
};

const deleteAllMessagesByEventId = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteAllMessagesByEventId);
};

const deleteMessagesByMessagesId = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteMessagesByMessagesId);
};

const getMessagesByEventId = async (request, response) => {
  await Controller.handleRequest(request, response, service.getMessagesByEventId);
};

const getOneMessagesById = async (request, response) => {
  await Controller.handleRequest(request, response, service.getOneMessagesById);
};

const updateMessagesByMessageId = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateMessagesByMessageId);
};


module.exports = {
  addMessageByEventID,
  deleteAllMessagesByEventId,
  deleteMessagesByMessagesId,
  getMessagesByEventId,
  getOneMessagesById,
  updateMessagesByMessageId,
};
