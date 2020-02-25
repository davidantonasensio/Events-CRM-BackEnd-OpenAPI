const Controller = require('./Controller');

class DefaultController {
  constructor(Service) {
    this.service = Service;
  }

  async getEventById(request, response) {
    await Controller.handleRequest(request, response, this.service.getEventById);
  }

}

module.exports = DefaultController;
