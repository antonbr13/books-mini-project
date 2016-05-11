// no need to put a file path if you are requiring a module that has been downloaded via npm and exists in your node_modules folder
var express = require('express');
var bodyParser = require('body-parser');

// you only need cors if you are serving a front end from a different port
var cors = require('cors');

// allows this index.js file to access all the data that exists within the books_controller
var booksController = require('./controllers/books_controller');

var booksPolicies = require('./policies/books_policies');


var app = express();


// express itself always assumes text - plain characters in the body of an http message
   // express lets other packages do the work of parsing the body of the http request as json into a JS object and place it on req.body for us
      // what we see in req.body is the result of what is being produced via body-parser

   // middleware is the stuff that happens between when a request comes back and when a response is sent back

   // use is an express method that says run the funtion inside the call everywhere & on every request no matter the method or the routing or the path --> run body-parser on every single request
app.use(bodyParser.json());
app.use(cors());



// create our own middleware for a logger function
// must add next() so that express knows to go to the next step in the chain of functions that we want it to run - after it has called this app.use function below
app.use(function(req, res, next) {
   console.log(req.body);
   next();
});




// everything that starts with app.ect can be thought of as middleware

// look to the objects and property values in the books_controller as they correspond to these values below
app.get('/books', booksController.index);
app.post('/books', booksController.create);

// specific delete method that utilizes req.params
app.delete('/books/:id', booksPolicies.canDestroy, booksController.destroy);

// generic delete
app.delete('/books', booksController.destroyLastItem);

// update information based on a specific req.params
app.put('/books/:id', booksController.update);





var port = 4444;
app.listen(port, function() {
   console.log('listening on port ' + port);
});
