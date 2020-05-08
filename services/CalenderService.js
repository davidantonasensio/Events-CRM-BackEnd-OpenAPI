/* eslint-disable no-unused-vars */
const Service = require('./Service');
const mongoDB = require('../utils/mongoDBConnect');

/**
* Add a new date to calender into DB
*
* calender Calender Add date Object to DB
* returns calender
* */
const addDate = ({ body }) => new Promise(
  async (resolve, reject) => {
    try {
        await mongoDB.collectioncalender.insertOne(body)
        .then(result =>  {
        	let eventId = result.insertedId;
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
* Delete date by date ID
* Delete date by date ID. Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
*
* eventOrCalenderID String ID of the date that needs to be deleted from the DB
* returns inline_response_200_2
* */
const deleteOneDateByDateId = ({ DateID }) => new Promise(
  async (resolve, reject) => {
    try {
	      let itemsDeleted = 0;
	      await mongoDB.collectioncalender.deleteOne({_id: mongoDB.mongodb.ObjectID(DateID)})
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
* Delete date by date ID
* Delete date by date ID. Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
*
* EventID String ID of the date that needs to be deleted from the DB
* returns inline_response_200_2
* */
const deleteAllDatesByEventId = ({ EventID }) => new Promise(
  async (resolve, reject) => {
    try {
	      let itemsDeleted = 0;
	      await mongoDB.collectioncalender.deleteMany({eventId: EventID})
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
* Get all dates
* Get all existing dates in DB
*
* returns List
* */
const getAllDates = () => new Promise(
  async (resolve, reject) => {
    try {
        let eventsArray = [];
        eventsArray = await mongoDB.collectioncalender.find({}).toArray();
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
* Find dates by eventID
* get all the Dates for the given Event ID. The Id is the event _id. Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
*
* dateID String ID of Event DB
* returns calender
* */
const getAllDatesByEventId = ({ EventID }) => new Promise(
  async (resolve, reject) => {
    try {
    	let eventByIdArray = [];
    	eventByIdArray = await mongoDB.collectioncalender.find({eventId: EventID}).toArray();
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
* Find one date by dateID
* get all the Dates for the given Event ID. The Id is the event _id. Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
*
* dateID String ID of Event DB
* returns calender
* */
const getOneDateByDateId = ({ DateID }) => new Promise(
  async (resolve, reject) => {
    try {
    	let eventByIdArray = [];
    	eventByIdArray = await mongoDB.collectioncalender.find({_id: mongoDB.mongodb.ObjectID(DateID)}).toArray();    	
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
* Add a new calender to the DB
* Update dates for the given date ID. The Id is the date. Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
*
* dateID String ID of the date that needs to be updated
* calender Calender 
* returns calender
* */
const updateOneDateByDateid = ({ DateID, body }) => new Promise(
  async (resolve, reject) => {
    try {
        await mongoDB.collectioncalender.updateOne(
                {
                  _id: mongoDB.mongodb.ObjectID(DateID)
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
  addDate,
  deleteOneDateByDateId,
  deleteAllDatesByEventId,
  getAllDates,
  getAllDatesByEventId,
  getOneDateByDateId,
  updateOneDateByDateid,
};
