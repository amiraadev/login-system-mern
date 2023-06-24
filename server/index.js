
const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const routes = require('./router.js');
const connect_to_mongo = require('./database-config.js');

const app = express();
const port = process.env.PORT || 5001

app.use(cors({origin:"*"}));
app.use(express.json());
app.use('/', routes)




connect_to_mongo();


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});














