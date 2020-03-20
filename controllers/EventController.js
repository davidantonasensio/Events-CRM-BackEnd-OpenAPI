const Controller = require('./Controller');

class EventController {
  constructor(Service) {
    this.service = Service;
  }

  async getAllEvents(request, response) {
		//console.log("COTROLER");
	    await Controller.handleRequest(request, response, this.service.getAllEvents);
  }
  
  async getEventById(request, response) {	    
	    await Controller.handleRequest(request, response, this.service.getEventById);
  }
  
  async addEvent(request, response) {
    await Controller.handleRequest(request, response, this.service.addEvent);
  }

  async deleteEventByID(request, response) {
    await Controller.handleRequest(request, response, this.service.deleteEventByID);
  }

  async updateEventByID(request, response) {
    await Controller.handleRequest(request, response, this.service.updateEventByID);
  }

}

module.exports = EventController;
