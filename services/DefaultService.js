/* eslint-disable no-unused-vars */
const Service = require('./Service');

class DefaultService {

  /**
   * Returns a single event
   *
   * eventID List ID of event to return
   * returns Event
   **/
  static getEventById({ eventID }) {
    return new Promise(
      async (resolve) => {
        try {
          resolve(Service.successResponse(''));
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

}

module.exports = DefaultService;
