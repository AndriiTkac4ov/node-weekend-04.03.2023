const express = require('express');
const morgan = require('morgan');

const router = require('./routes/router'); 

const app = express();

app.use(morgan('combined'));
app.use(express.json());

app.use('/api/files', router);

app.listen(8080, () => {
    console.log("Server running on port 8080")
});