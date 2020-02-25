# Event CRM RestFull API

- Events CRM Back-End RESTful App to control customers in the Event business, oriented specially on the wedding industry
- Back-End developed with Node.js
- [EventCRM OpenAPI Specification](https://app.swaggerhub.com/apis/davidanton/EventCRM/1.0.0)

## Comming soon
- Authentification
- Docker container with this node App + MongoDB container

## Prerequisites
- NodeJS >= 10.4
- NPM >= 6.10.0

## Quick Start

```bash
# Install dependencies
npm install

# Start Express Server: http://localhost:3000
npm start

# Build for production (Will build into server/public, ready for deployment)
npm run build

# Make file /utils/mongoDBConnect.js

const mongodb = require('mongodb');

	const user = 'userName';
	const pass = 'Password'; 
    const conection = 'mongodb://'+ user +':'+ pass +'@192.168.2.90:27017/eventsCRM';


  //*** Conection to DB */

    let MongoClient = mongodb.MongoClient;
    let db;
    let collection;
    let collectioninfos;
    exports.mongodb = mongodb;
    
 

    const client = MongoClient.connect(conection,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(
        client=> 
        {        
            db = client.db('eventsCRM');
            exports.collection = db.collection('events');
            exports.collectionmessages = db.collection('messages');
            exports.collectionlogin = db.collection('users');
        }
    )
    .catch(error => console.error(error));


    //module.exports = mongodb;
    //*** End Conection to DB */
```

## Info
I develop at this time this app to get experience with node.js, REST and OpenAPI, thinking may be to be able to use it for my own business in the future.
I Plan to make the BackEnd with Java(Spring Boot) as well. The actual FrontEnd is made with Vue.js. Hier in GitHub the actual FronEnd(20200224) it is not compatible with this OpenAPI BackEnd

### Author
David Anton
[idanas](https://www.idanas.de)

### Version

0.0.1

#### Root Directory:
In the root directory we have (besides package.json, config.js, and log files):
- **logger.js** - where we define the logger for the project. The project uses winston, but the purpose of this file is to enable users to change and modify their own logger behavior.
- **index.js** - This is the project's 'main' file, and from here we launch the application. This is a very short and concise file, and the idea behind launching from this short file is to allow use-cases of launching the server with different parameters (changing config and/or logger) without affecting the rest of the code. 
- **expressServer.js** - The core of the Express.js server. This is where the express server is initialized, together with the OpenAPI validator, OpenAPI UI, and other libraries needed to start our server. If we want to add external links, that's where they would go. The EventsCRM project uses the [express-openapi-validator](https://www.npmjs.com/package/express-openapi-validator) library that acts as a first step in the routing process - requests that are directed to paths defined in the `openapi.yaml` file are caught by this process, and it's parameters and bodyContent are validated against the schema. A successful result of this validation will be a new 'openapi' object added to the request. If the path requested is not part of the openapi.yaml file, the validator ignores the request and passes it on, as is, down the flow of the Express server.

#### api/
- **openapi.yaml** - This is the OpenAPI contract to which this server will comply. The file was generated using the codegen, and should contain everything needed to run the API Gateway - no references to external models/schemas.
[EventCRM OpenAPI Specification](https://app.swaggerhub.com/apis/davidanton/EventCRM/1.0.0)

#### utils/
Currently a single file:

- **openapiRouter.js** - This is where the routing to our back-end code happens. If the request object includes an ```openapi``` object, it picks up the following values (that are part of the ```openapi.yaml``` file): 'x-openapi-router-controller', and 'x-openapi-router-service'. These variables are names of files/classes in the controllers and services directories respectively. The operationId of the request is also extracted. The operationId is a method in the controller and the service that was generated as part of the codegen process. The routing process sends the request and response objects to the controller, which will extract the expected variables from the request, and send it to be processed by the service, returning the response from the service to the caller.

#### controllers/
After validating the request, and ensuring this belongs to our API gateway, we send the request to a `controller`, where the variables and parameters are extracted from the request and sent to the relevant `service` for processing. The `controller` handles the response from the `service` and builds the appropriate HTTP response to be sent back to the user. 

- **index.js** - load all the controllers that were generated for this project, and export them to be used dynamically by the `openapiRouter.js`. If you would like to customize your controller, it is advised that you link to your controller here, and ensure that the codegen does not rewrite this file.

- **Controller.js** - The core processor of the generated controllers. The generated controllers are designed to be as slim and generic as possible, referencing to the `Controller.js` for the business logic of parsing the needed variables and arguments from the request, and for building the HTTP response which will be sent back. The `Controller.js` is a class with static methods. 

- **{{x-openapi-router-controller}}.js** - auto-generated code, processing all the operations. The Controller is a class that is constructed with the service class it will be sending the request to. Every request defined by the `openapi.yaml`  has an operationId. The operationId is the name of the method that will be called. Every method receives the request and response, and calls the `Controller.js` to process the request and response, adding the service method that should be called for the actual business-logic processing.

#### services/
This is where the API Gateway ends, and the unique business-logic of your application kicks in. Every endpoint in the `openapi.yaml` has a variable 'x-openapi-router-service', which is the name of the service class that is generated. The operationID of the endpoint is the name of the method that will be called. The generated code provides a simple promise with a try/catch clause. A successful operation ends with a call to the generic `Service.js` to build a successful response (payload and response code), and a failure will call the generic `Service.js` to build a response with an error object and the relevant response code. It is recommended to have the services be generated automatically once, and after the initial build add methods manually.

- **index.js** - load all the services that were generated for this project, and export them to be used dynamically by the `openapiRouter.js`. If you would like to customize your service, it is advised that you link to your controller here, and ensure that the codegen does not rewrite this file.

- **Service.js** - A utility class, very simple and thin at this point, with two static methods for building a response object for successful and failed results in the service operation. The default response code is 200 for success and 500 for failure. It is recommended to send more accurate response codes and override these defaults when relevant.

- **{{x-openapi-router-service}}.js** - auto-generated code, providing a stub Promise for each operationId defined in the `openapi.yaml`. Each method receives the variables that were defined in the `openapi.yaml` file, and wraps a Promise in a try/catch clause. The Promise resolves both success and failure in a call to the `Service.js` utility class for building the appropriate response that will be sent back to the Controller and then to the caller of this endpoint.

#### tests/
- **serverTests.js** - basic server validation tests, checking that the server is up, that a call to an endpoint within the scope of the `openapi.yaml` file returns 200, that a call to a path outside that scope returns 200 if it exists and a 404 if not.
- **routingTests.js** - Runs through all the endpoints defined in the `openapi.yaml`, and constructs a dummy request to send to the server. Confirms that the response code is 200. At this point requests containing xml or formData fail - currently they are not supported in the router.
- **additionalEndpointsTests.js** - A test file for all the endpoints that are defined outside the openapi.yaml scope. Confirms that these endpoints return a successful 200 response.


Future tests should be written to ensure that the response of every request sent should conform to the structure defined in the `openapi.yaml`. This test will fail 100% initially, and the job of the development team will be to clear these tests.


#### models/
Currently a concept awaiting feedback. The idea is to have the objects defined in the openapi.yaml act as models which are passed between the different modules. This will conform the programmers to interact using defined objects, rather than loosley-defined JSON objects. Given the nature of JavaScript progrmmers, who want to work with their own bootstrapped parameters, this concept might not work. Keeping this here for future discussion and feedback.

## Warranties
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.