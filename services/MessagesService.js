/* eslint-disable no-unused-vars */
const Service = require('./Service');
const mongoDB = require('../utils/mongoDBConnect');

class MessagesService {

  /**
   * Place a message from a customer
   *
   * eventID String ID of event that needs to be updated
   * message Message Write a new Message for event in DB
   * returns Message
   **/
  static addMessageByEventID({ body }) {
    return new Promise(
      async (resolve) => {
        try {
          const eventsBody = await mongoDB.collectionmessages.insertOne(body);
          resolve(Service.successResponse({response: 'Message inserted in DB'}));
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
   * Update messages by MessagesID
   * For valid response try hexadecimal IDs with positive integer value.\\ \\ Negative or non-integer values will generate API errors
   * Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
   *
   * messageID String ID of the order that needs to be deleted
   * no response value expected for this operation
   **/
  static updateMessagesByMessageId({ eventOrMessageID, body }) {
    return new Promise(
      async (resolve) => {
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
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  /**
   * Delete messages by MessagesID
   * For valid response try integer IDs with positive integer value.\\ \\ Negative or non-integer values will generate API errors
   *
   * messageID String ID of the order that needs to be deleted
   * no response value expected for this operation
   **/
  static deleteMessagesByMessagesId({ eventOrMessageID }) {
    return new Promise(
      async (resolve) => {
        try {
        
	      let itemsDeleted = 0;
	      await mongoDB.collectionmessages.deleteOne({_id: mongoDB.mongodb.ObjectID(eventOrMessageID)})
			.then(result => {
		 	  itemsDeleted = (`${result.deletedCount}`);
			}
	      )
		    .catch(err => console.error(`Delete failed with error: ${err}`))
		
          resolve(Service.successResponse('Deleted ' + itemsDeleted + ' items'));
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
   * Delete all the messages by EventID
   * If the user eliminate a event all the mesages asociated to that event will be deleted as well
   * For valid response try integer IDs with positive integer value.\\ \\ Negative or non-integer values will generate API errors
   *
   * messageID String ID of the order that needs to be deleted
   * no response value expected for this operation
   **/
  static deleteAllMessagesByEventId({ eventOrMessageID }) {
    return new Promise(
      async (resolve) => {
        try {
	      let itemsDeleted = 0;
	      await mongoDB.collectionmessages.deleteMany({eventId: eventOrMessageID})
			.then(result => {
		 	  itemsDeleted = (`${result.deletedCount}`);
			}
	      )
		    .catch(err => console.error(`Delete failed with error: ${err}`))
          resolve(Service.successResponse('Deleted ' + itemsDeleted + ' items'));
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
   * Find messages by eventID
   * get all the messages for the given ID. The Id is the event _id
   *
   * messageID String ID of Message DB
   * returns Message
   **/
  static getMessagesByEventId({ eventOrMessageID }) {
    return new Promise(
      async (resolve) => {
        try {        	
          const eventByIdArray = await mongoDB.collectionmessages.find({eventId: eventOrMessageID}).toArray();        	
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
   * Find one messages by Message ID
   * get all the messages for the given ID. The Id is the event _id
   *
   * messageID String ID of Message DB
   * returns Message
   **/
  static getOneMessagesById({ eventOrMessageID }) {
    return new Promise(
      async (resolve) => {
        try {
	      let messageById = [];
	      messageById = await mongoDB.collectionmessages.find({_id: mongoDB.mongodb.ObjectID(eventOrMessageID)}).toArray();
	      resolve(Service.successResponse(messageById));
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

module.exports = MessagesService;
