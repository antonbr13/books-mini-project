var books = require('../models/books');


// module.exports is necessary so that our require statement in the index.js file can access all of the information in this file --> consider this entire file and its contents to be existing within an immediately-invoked function expression (iffe), which occurs thanks to express
module.exports = {
         index: function(req, res, next) {
            var rating = parseInt(req.query.rating);
            if (rating) {
               var result = books.filter(function(book) {
                  return book.rating === rating;
               });
               res.status(200).json(result);
            }
            else {
               res.status(200).json(books);
            }
         },

         create: function(req, res, next) {
            books.push(req.body);
            res.status(200).json(books);
         },

         destroy: function(req, res, next) {
            var id = parseInt(req.params.id);
            books.splice(id, 1);
            res.status(200).send(books);
         },

         update: function(req, res, next) {
            var index = parseInt(req.params.id);
            // the specified index of the books array is going to be completely replaced by whatever is inputted to req.body
            books[index] = req.body;
            res.status(200).json(books);
         },

         destroyLastItem: function(req, res, next) {
            books.pop();
            res.status(200).json(books);
         }
};


// ^ res.status(200).send(books);
// and
// res.status(200).json(books);
   // are basically accomplishing the same goal --> give us a response of books array
