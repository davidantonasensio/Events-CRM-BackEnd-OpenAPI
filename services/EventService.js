/* eslint-disable no-unused-vars */
const Service = require('./Service');
const mongoDB = require('../utils/mongoDBConnect');
const MessagesService = require('./MessagesService');

/**
* Add a new event to the DB
*
* event Event Add Event Object to DB
* returns Event
* */
const addEvent = ({ body }) => new Promise(
  async (resolve, reject) => {
    try {
        await mongoDB.collection.insertOne(body)
        .then(result =>  {
        	//console.log(`return ID: , ${result.insertedId}`)
        	let eventId = result.insertedId;
        	//console.log("eventId 1: ", eventId);
        	resolve(Service.successResponse({response: eventId}));
        })
        .catch(err => {
        	console.error(`Failed to insert item: ${err}`)	 
        	resolve(Service.successResponse({response: 'Error to insert Event in DB'})); 
        });
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Deletes a event
*
* eventID String Event id to delete
* apiUnderscorekey String  (optional)
* no response value expected for this operation
* */
const deleteEventByID = ({ eventID, apiUnderscorekey }) => new Promise(
  async (resolve, reject) => {
    try {
        let itemsDeleted = 0;            
        await mongoDB.collection.deleteOne({_id: mongoDB.mongodb.ObjectID(eventID)})
		    .then(result => {
			  itemsDeleted = (`${result.deletedCount}`);
			}			
		  )
			.catch(err => console.error(`Delete failed with error: ${err}`));

	      /*
	       * If we delete a event, we don't need the messages asociated with it anymore
	       * MessagesService.deleteAllMessagesByEventId send the eventID to the funtion to 
	       * delete all the messages
	       */
        MessagesService.deleteAllMessagesByEventId({'eventOrMessageID': eventID});          
        resolve(Service.successResponse({response: 'Deleted ' + itemsDeleted + ' items'}));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* return all the events
* Multiple status values can be provided with comma separated strings
*
* returns List
* */
const getAllEvents = () => new Promise(
  async (resolve, reject) => {
    try {
      let eventsArray = [];
      eventsArray = await mongoDB.collection.find({}).toArray();
      resolve(Service.successResponse(eventsArray));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Returns a single event given by its ID. Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
*
* eventID String ID of event to return
* returns Event
* */
const getEventById = ({ eventID }) => new Promise(
  async (resolve, reject) => {
    try {
    	//console.log("eventID: ", eventID);
    	let eventByIdArray = [];
    	eventByIdArray = await mongoDB.collection.find({_id: mongoDB.mongodb.ObjectID(eventID)}).toArray();
        resolve(Service.successResponse(eventByIdArray));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Updates an event in the DB
* Update a event given by its ID. Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
*
* eventID String ID of event that needs to be updated
* event Event Updated Event Object in DB
* no response value expected for this operation
* */
const updateEventByID = ({ eventID, body }) => new Promise(
  async (resolve, reject) => {
    try {
    	//console.log("body: ", body);
        await mongoDB.collection.updateOne(
                {
                  _id: mongoDB.mongodb.ObjectID(eventID)
                },
                {$set: body});
              resolve(Service.successResponse({response: 'Event Modified in DB'}));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  addEvent,
  deleteEventByID,
  getAllEvents,
  getEventById,
  updateEventByID,
};
