
const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');


app.use(cors());
app.use(express.json());

const pool = require("./database/db.config");

/*
app.post('/login', (req, res) => {
    const phone_number = req.body.phone_number;

    pool.query("")

})
*/

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})