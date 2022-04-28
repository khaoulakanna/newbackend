const express = require("express");
const cors = require("cors");

const contactRouter = require('./routes/contactRouter');
const devisRouter = require('./routes/devisRouter');
const helpRouter = require('./routes/helpRouter');

const port = process.env.PORT || 5000;



require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(contactRouter);
app.use(devisRouter);
app.use(helpRouter);


const server = app.listen(port, ()=> {
  const port = server.address().port;
  console.log('server is running on port :', port);
})