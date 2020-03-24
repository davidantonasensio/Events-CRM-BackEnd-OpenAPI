/* eslint-disable no-unused-vars */
const Service = require('./Service');
const mongoDB = require('../utils/mongoDBConnect');
const MessagesService = require('./MessagesService');

class EventService {

  /**
   * Add a new event to the DB
   *
   * body Event		Event object that needs to be updated or added to the DB
   * 
   * no response value expected for this operation
   **/
  static addEvent({ body }) {
    return new Promise(
      async (resolve) => {
        try {
          await mongoDB.collection.insertOne(body);
          resolve(Service.successResponse({response: 'Event inserted in DB'}));          
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  /**
   * Deletes a event and all the message of that event
   *
   * eventID String Event id to delete
   * apiUnderscorekey String  (optional)
   * no response value expected for this operation
   **/
  static deleteEventByID({ eventID, apiUnderscorekey }) {
    return new Promise(
      async (resolve) => {
        try {
          let itemsDeleted = 0;            
          await mongoDB.collection.deleteOne({_id: mongoDB.mongodb.ObjectID(eventID)})
		    .then(result => {
			  itemsDeleted = (`${result.deletedCount}`);
			}			
		  )
			.catch(err => console.error(`Delete failed with error: ${err}`));

	      /*
	       * If we are delete a event, we don't need the messages asociated with it anymore
	       * MessagesService.deleteAllMessagesByEventId send the eventID to the funtion to 
	       * delete all the messages
	       */
          MessagesService.deleteAllMessagesByEventId({'eventOrMessageID': eventID});          
          resolve(Service.successResponse({response: 'Deleted ' + itemsDeleted + ' items'}));
          
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  /**
   * return all the events
   * Multiple status values can be provided with comma separated strings
   *
   * returns List
   **/
  static getAllEvents() {
    return new Promise(
      async (resolve) => {
        try {        	
	      let eventsArray = [];
	      console.log("resolve: "+resolve);
	      eventsArray = await mongoDB.collection.find({}).toArray();
          resolve(Service.successResponse(eventsArray));
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }
  
  /**
   * Get event by event
   *
   * eventID String Event id to get
   * apiUnderscorekey String  (optional)
   * no response value expected for this operation
   **/
  static getEventById({ eventID, apiUnderscorekey }) {
    return new Promise(
      async (resolve) => {
        try {
        	let eventByIdArray = [];
        	eventByIdArray = await mongoDB.collection.find({_id: mongoDB.mongodb.ObjectID(eventID)}).toArray();
            resolve(Service.successResponse(eventByIdArray));
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  /**
   * Updates an event in the DB
   *
   * eventID 	String 	ID of event that needs to be updated
   * body 		Event	Object JSON Object with all the event Information
   * no response value expected for this operation
   **/
  static updateEventByID({ eventID, body }) {
    return new Promise(
      async (resolve) => {
        try {
          await mongoDB.collection.updateOne(
            {
              _id: mongoDB.mongodb.ObjectID(eventID)
            },
            {$set: body});
          resolve(Service.successResponse({response: 'Event Modified in DB'}));
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

module.exports = EventService;

