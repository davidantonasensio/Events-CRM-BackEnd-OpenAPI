/* eslint-disable no-unused-vars */
const Service = require('./Service');
const mongoDB = require('../utils/mongoDBConnect');

/**
* Place a message from a customer
* Add a nuw message to an event given by its ID.
*
* message Message Write a new Message for event in DB
* returns Message
* */
const addMessageByEventID = ({ body }) => new Promise(
  async (resolve, reject) => {
    try {
        const eventsBody = await mongoDB.collectionmessages.insertOne(body);
        resolve(Service.successResponse({response: 'Message inserted in DB'}));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Delete messages by MessagesID
* Delete All the messages from a given eventID. Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
*
* eventOrMessageID String ID of the Event that needs to be deleted
* returns inline_response_200_2
* */
const deleteAllMessagesByEventId = ({ eventOrMessageID }) => new Promise(
  async (resolve, reject) => {
    try {
	      let itemsDeleted = 0;	      
	      await mongoDB.collectionmessages.deleteMany({eventId: eventOrMessageID})
			.then(result => {
		 	  itemsDeleted = (`${result.deletedCount}`);
			}			
	      )
		    .catch(err => console.error(`Delete failed with error: ${err}`))
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
* Delete messages by MessagesID
* Delete message by MessageID. Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
*
* eventOrMessageID String ID of the message that needs to be deleted from the DB
* returns inline_response_200_1
* */
const deleteMessagesByMessagesId = ({ eventOrMessageID }) => new Promise(
  async (resolve, reject) => {
    try {
	      let itemsDeleted = 0;
	      await mongoDB.collectionmessages.deleteOne({_id: mongoDB.mongodb.ObjectID(eventOrMessageID)})
			.then(result => {
		 	  itemsDeleted = (`${result.deletedCount}`);
			}
	      )
		    .catch(err => console.error(`Delete failed with error: ${err}`))
		
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
* Find messages by eventID
* get all the messages for the given Event ID. The Id is the event _id. Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
*
* eventOrMessageID String ID of event DB
* returns Message
* */
const getMessagesByEventId = ({ eventOrMessageID }) => new Promise(
  async (resolve, reject) => {
    try {
        const eventByIdArray = await mongoDB.collectionmessages.find({eventId: eventOrMessageID}).toArray();        	
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
* Delete messages by MessagesID
* Get just one message from a given Message ID. Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
*
* eventOrMessageID String ID of the Message
* returns Message
* */
const getOneMessagesById = ({ eventOrMessageID }) => new Promise(
  async (resolve, reject) => {
    try {
	      let messageById = [];
	      messageById = await mongoDB.collectionmessages.find({_id: mongoDB.mongodb.ObjectID(eventOrMessageID)}).toArray();
	      resolve(Service.successResponse(messageById));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Update messages by MessagesID
* Update one message of one event. Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
*
* eventOrMessageID String ID of the event that needs to be updated
* message Message  (optional)
* no response value expected for this operation
* */
const updateMessagesByMessageId = ({ eventOrMessageID, body }) => new Promise(
  async (resolve, reject) => {
    try {
    	//console.log("TEST", eventOrMessageID);
    	//console.log("body", body);
    	
      await mongoDB.collectionmessages.updateOne(
        {
          _id: mongoDB.mongodb.ObjectID(eventOrMessageID)
        },
        {$set: body});
        
      resolve(Service.successResponse({response: 'Message modified DB'}));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  addMessageByEventID,
  deleteAllMessagesByEventId,
  deleteMessagesByMessagesId,
  getMessagesByEventId,
  getOneMessagesById,
  updateMessagesByMessageId,
};
