// Dependencies
const express = require('express');
const morgan = require('morgan'); 
const methodOverride = require('method-override');
const app = express();
require('dotenv').config();

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")) //logging
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({extended: true})) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically

app.get('/', (req, res) => {
    res.send('default route')
})

const fruitsController = require('./controllers/fruits');
app.use('/fruits', fruitsController);
// when you see anything with fruits, route it to the fruits controller. this allows you to not have to include /fruits before every new route.

// Listener
app.listen(process.env.PORT, () =>
	console.log(`express is listening on port: ${process.env.PORT}`)
);