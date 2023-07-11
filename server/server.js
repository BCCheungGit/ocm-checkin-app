
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
                    household_id: row.household_id,
                    profilePicture: row.profile,
            }))
                res.send(parsedData);
            } else if (result.rowCount < 1) {
                res.send({message: "Phone number not in database"})
            }
            
        }
    })
    
})


app.post('/register', (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const phone_number = req.body.phone_number;
    const email = req.body.email;
    const profile_picture = req.body.profile_picture;
  
    pool.query(
      'INSERT INTO registrants_staging (fname, lname, phonenumber, email_address, profile_picture) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (email_address) DO NOTHING',
      [fname, lname, phone_number, email, profile_picture],
      (err) => {
        if (err) {
          if (err.code === '23505') {
            // Duplicate key violation (email_address is already in use)
            console.log('Duplicate email address:', email);
            res.status(409).send({ message: 'Email address already exists.' });
          } else {
            console.error('Error inserting into the database:', err);
            res.status(500).send({ message: 'An error occurred while inserting into the database.' });
          }
        } else {
          res.send({ message: 'Successfully inserted into the database.' });
        }
      }
    );
  });


app.listen(port, '192.168.86.195', () => {
    console.log(`server running on port ${port}`)
})