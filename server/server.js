
const express = require('express');
const app = express();
const port = 5432;
const cors = require('cors');
const Pool = require('pg').Pool;

app.use(cors());
app.use(express.json());



const pool = new Pool ({
    user: 'postgres',
    host: 'arrival.cloudority.com',
    database: 'ocm_db',
    password: 'passwordrm',
    port: '5432'
});

/*
app.get('/login', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM public.v_people_details');
        res.json(result.rows);
    } catch (err) {

    }
})
*/


app.get('/login', (req,res) => {
    const phone_number = req.body.phone_number;


    if (phone_number != null) {
        pool.query("SELECT * FROM v_people_details where phonenumber = $1",
        [phone_number],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send({message: "Error"});
            } else if (result.rowCount > 0) {
                console.log(result.rows);
                res.send(result.rows);
            } else {
                res.send({message: "Phone number not found"})
            }
        })
    } 
})


app.listen(port, () => {
    console.log('server running')
})