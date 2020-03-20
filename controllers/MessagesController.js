const Controller = require('./Controller');

class MessagesController {
  constructor(Service) {
    this.service = Service;
  }

  async addMessageByEventID(request, response) {
    await Controller.handleRequest(request, response, this.service.addMessageByEventID);
  }
  
  async updateMessagesByMessageId(request, response) {
	    await Controller.handleRequest(request, response, this.service.updateMessagesByMessageId);
  }

  async deleteMessagesByMessagesId(request, response) {
    await Controller.handleRequest(request, response, this.service.deleteMessagesByMessagesId);
  }
  
  async deleteAllMessagesByEventId(request, response) {
	    await Controller.handleRequest(request, response, this.service.deleteAllMessagesByEventId);
  }

  async getMessagesByEventId(request, response) {
    await Controller.handleRequest(request, response, this.service.getMessagesByEventId);
  }
  
  async getOneMessagesById(request, response) {
	    await Controller.handleRequest(request, response, this.service.getOneMessagesById);
	  }

}

module.exports = MessagesController;
