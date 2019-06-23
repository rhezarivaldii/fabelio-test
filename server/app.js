let express = require('express');
let app = express();
let cors = require('cors');
let bodyParser = require('body-parser');

let productRouter = require('./routes/product');
let commentRouter = require('./routes/comment');
let voteRouter = require('./routes/vote');


app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// The routers

app.use('/product', productRouter);
app.use('/comment', commentRouter);
app.use('/vote', voteRouter);

// End

// Set listening port

app.listen(3000, () => {
    console.log('Fabelio server is running on port 3000');
});

module.exports = app;