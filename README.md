# Fabelio Product Monitoring App

Hi! My name is Rheza Rivaldi H. This is a project that's implementing basic web-scraping technique using primarily node.js on server-side, and angular on the client side.

The codes are running separately and they are communicating using RESTFUL protocol, sending JSON Object back and forth to manipulate the data.


# Features

Register the product we want to monitor by copying the url from Fabelio's website. We can see the updates on the price every hour, adding comment, as well as upvoting and downvoting every comment.

## Environment

Node.js
Express.js
Sequelize (ORM)
MySQL
Uzmug (Database Migration helper)
Angular

## List of Exposed APIs
|        ENDPOINT        |HTTP METHOD                          |DESC                         |
|----------------|-------------------------------|-----------------------------|
|/product|GET            |Fetching all registered products           |
|/product         |POST            |Creating/Registering new product           |
|     /product/:id    |GET|Fetching product with the provided ID|
|/comment|POST|Creating/Posting new comment
|/delete/:id|POST|Delete related comment
|/vote/downVote/:commentId|POST|Down vote a comment with the provided comment ID
|/vote/upVote/:commentId|POST|Up vote a comment with the provided comment ID

## SETUP

**Server Side**
First we need to install the dependencies using npm, cd to the root folder and type:

> $ npm install

Then, we need to start the Node Server. Simply type:
> $ node app.js

The default server is running on port 3000


**Client Side**
Install the Angular-CLI:


First we need to install the dependencies using npm, cd to the root folder and type:

> $ npm install

Then, start the Angular App using:
> $ ng serve

The default server is running on port 4200

## Deployment


## Author

Rheza Rivaldi H