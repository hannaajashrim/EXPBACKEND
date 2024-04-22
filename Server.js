const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./ROUTER/TestRouter');
const connection = require('./CONFIGURE/Connection');



connection()
const app = express();

app.use(express.json());
app.use(cors());
app.use('/',router);

dotenv.config()

Port = process.env.Port;
app.listen(Port,console.log(`Server is running on ${Port}`));