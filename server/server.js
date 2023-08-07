
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const Pool = require('pg').Pool;

app.use(cors());
app.use(express.json());


//create connection pool
const pool = new Pool ({
    user: 'postgres',
    host: 'arrival.cloudority.com',
    database: 'ocm_db',
    password: 'passwordrm',
    port: '5432'
});



/* /login route: queries the database for all users with that phone number, then creates a hashmap to map the data to 
   parsedData, which is then sent back to the client.
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
                    nickname: row.nickname,
                    membership: row.membership,
                    people_id: row.people_id,
                    household_id: row.household_id,
                    profilePicture: row.profile,
            }))
                res.send(parsedData);
            } else if (result.rowCount < 1) {
              //if there are no results, return phone number not in database.
                res.send({message: "Phone number not in database"})
            }
            
        }
    })
    
})


/* register route: gets first name, last name, phone number, email, and profile picture from the client, then posts it to the 
database.
TODO: Registration route currently not available.
 */
app.post('/register', (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const phone_number = req.body.phone_number;
    const email = req.body.email;
    const profile_picture = req.body.profile_picture;
    pool.query("SELECT * FROM registrants_staging WHERE email_address = $1",
    [email],
    (err, result) => {
      if (err) {
          console.log(err);
          res.send({message: "Error"});
      } else {
          if (result.rowCount > 0) {
            res.send({message: "AlreadyExists"})   
          } else if (result.rowCount < 1) {
            pool.query(
              'INSERT INTO registrants_staging (fname, lname, phonenumber, email_address, profile_picture) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (email_address) DO UPDATE SET email_address = registrants_staging.email_address',
              [fname, lname, phone_number, email, profile_picture],
              (err) => {
                if (err) {
                  console.log("error")
                } else {
                  res.send({message: "Success"})
                }
                
              })
          }
        
        }
          
          
      }
    )
    
       
  });


app.listen(port, '192.168.86.195', () => {
    console.log(`server running on port ${port}`)
})