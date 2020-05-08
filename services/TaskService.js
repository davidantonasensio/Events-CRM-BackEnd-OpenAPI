/* eslint-disable no-unused-vars */
const Service = require('./Service');
const mongoDB = require('../utils/mongoDBConnect');

/**
* Add a new task to the DB
*
* task Task Add Task Object to DB
* returns Task
* */
const addTask = ({ body }) => new Promise(
  async (resolve, reject) => {
    try {
        await mongoDB.collectiontask.insertOne(body)
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
* Delete task by Task ID
* Delete task by task ID. Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
*
* eventOrTaskID String ID of the task that needs to be deleted from the DB
* returns inline_response_200
* */
const deleteTaskByTaskId = ({ TaskID }) => new Promise(
  async (resolve, reject) => {
    try {
	      let itemsDeleted = 0;
	      await mongoDB.collectiontask.deleteOne({_id: mongoDB.mongodb.ObjectID(TaskID)})
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
* Delete All task of one Event if event is deleted by e+vent ID
* Delete task by event ID. Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
*
* eventOrTaskID String ID of the task that needs to be deleted from the DB
* returns inline_response_200
* */
const deleteTaskByEventId = ({ EventID }) => new Promise(
  async (resolve, reject) => {
    try {
	      let itemsDeleted = 0;
	      await mongoDB.collectiontask.deleteMany({eventId: EventID})
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
* Get all Tasks
* Get all existing tasks in DB
*
* returns List
* */
const getAllTasks = () => new Promise(
  async (resolve, reject) => {
    try {
        let eventsArray = [];
        eventsArray = await mongoDB.collectiontask.find({}).toArray();
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
* Find Tasks by eventID
* get all the tasks for the given Event ID. The Id is the event _id. Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
*
* EventID String ID of Event DB
* returns Task
* */
const getTasksByEventId = ({ EventID }) => new Promise(		
  async (resolve, reject) => {
    try {
    	let eventByIdArray = [];
    	eventByIdArray = await mongoDB.collectiontask.find({eventId: EventID}).toArray();
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
* Find Tasks by TaskID
* get one task for the given Task ID. The Id is the task _id. Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
*
* TaskID String ID of Event DB
* returns Task
* */
const getOneTaskByTaskId = ({ TaskID }) => new Promise(
  async (resolve, reject) => {
    try {
    	let eventByIdArray = [];
    	eventByIdArray = await mongoDB.collectiontask.find({_id: mongoDB.mongodb.ObjectID(TaskID)}).toArray();
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
* Add a new task to the DB
* Update task for the given task ID. The Id is the event _id. Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
*
* eventOrTaskID String ID of the event that needs to be updated
* task Task 
* returns Task
* */
const updateTask = ({ TaskID, body }) => new Promise(
  async (resolve, reject) => {
    try {
        await mongoDB.collectiontask.updateOne(
                {
                  _id: mongoDB.mongodb.ObjectID(TaskID)
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
  addTask,
  deleteTaskByTaskId,
  deleteTaskByEventId,
  getAllTasks,
  getOneTaskByTaskId,
  getTasksByEventId,
  updateTask,
};
