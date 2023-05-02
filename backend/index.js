const express = require('express');
const cors = require('cors');
require('./config/database').connect_to_DB();

const router = require('./routes/route');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

app.listen(3000, () => {
    console.log("Server started on port 3000...");
});