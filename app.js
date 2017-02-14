const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app     = express();

app.get('/scrape', function(req, res){

  // The URL we will scrape from - in our example John Wick 2.
  url = 'http://www.imdb.com/title/tt4425200/';

    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

      if(!error){

            var $ = cheerio.load(html);

            var title, release, rating;
            var json = { title : "", release : "", rating : ""};

            $('.title_wrapper').filter(function(){

                var data = $(this);

                title = data.children().first().text();
                console.log("title : "+title)

                json.title = title;

            })
            $('#titleYear').filter(function(){
                var data = $(this);

                release = data.children().first().text();
                console.log("release : "+ release)
                json.release = release;
            })


        $('.ratingValue').filter(function(){
                var data = $(this);
                rating = data.children().first().text();
                console.log(rating)
                json.rating = rating;
        })
      }

  fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

      console.log('File successfully written! - Check your project directory for the output.json file');


  })

      res.send(JSON.stringify(json, null, 4))

    })
// To write to the system we will use the built in 'fs' library.
// In this example we will pass 3 parameters to the writeFile function
// Parameter 1 :  output.json - this is what the created filename will be called
// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
// Parameter 3 :  callback function - a callback function to let us know the status of our function




})

app.listen('8888')

console.log('Listening in port 8888');

exports = module.exports = app;
