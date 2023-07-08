
const express = require('express');
const app = express();
const port = 3000;
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
app.get('/login', (req, res) => {
    pool.query("SELECT * FROM v_people_details where phonenumber = '15166531486'",
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result.rows);
            res.send(result.rows);
        }
    }
    )
})

*/


app.get('/login', (req,res) => {
    const phone_number = req.query.phone_number;

    pool.query("SELECT * FROM v_people_details where phonenumber = $1",
    [phone_number],
    (err, result) => {
        if (err) {
            console.log(err);
            res.send({message: "Error"});
        } else {
            if (result.rowCount > 0) {
                console.log(result.rows);
                const parsedData = result.rows.map(row => ({
                    fname: row.fname,
                    lname: row.lname,
                    people_id: row.people_id,
                    profilePicture: row.profile,
            }))
                res.send(parsedData);
            } else {
                res.send({message: "Phone number not in database"})
            }
            
        }
    })
    
})


app.listen(port, '192.168.86.195', () => {
    console.log(`server running on port ${port}`)
})