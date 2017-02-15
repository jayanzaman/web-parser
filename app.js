const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app     = express();

app.get('/news.google', function(req, res){

  // The URL we will scrape from - in our example John Wick 2.
  url = 'https://news.google.com/';

    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

      if(!error){

            var $ = cheerio.load(html);

            var title, article_num;
            var newsArr = [];
            var json = { title : "", article_num : ""};
            var count = 0;

            $('.esc-lead-article-title').filter(function(){

                var data = $(this);
                newsArr.push(data.children().first().text())
                // title = data.children().first().text();
                // json.title = title;
                // article_num = count;
                // json.article_num = article_num;
                // console.log(json)
                // count ++;
                // newsArr.push(json)

            })
              console.log(newsArr)


      }

  fs.writeFile('output.json', JSON.stringify(newsArr, null, 4), function(err){

      console.log('File successfully written! - Check your project directory for the output.json file');


  })

      res.send(JSON.stringify(newsArr, null, 4))

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
