 import dotenv from 'dotenv'
dotenv.config() 

import express  from 'express'
import mysql from 'mysql2'
import cors from 'cors'
import bodyParser from 'body-parser'

// const bodyParser=require('body-parser')


// while writting env file : we should be very carefull
// reason 1 : A single space could crash or stop entire running of the backend.
// reason 2 : Maintain consistency '_' use it for all or dont use at all.
// reason 3 : save .env in server folder.

const app = express();
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT 
})
// console.log(process.env.DB_HOST);
// console.log(process.env.DB_USER);


app.use(cors())
app.use(bodyParser.json())

// INVENTORY
app.get("/api/inventory",(req,res)=>{            // app.get("/",(req,res)=>{}
    const q = "select * from inventory"
    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        res.json(data)
        
    })                                            // res.json("Hello world")
})

// USERS
app.get("/api/users",(req,res)=>{                
    const q = "select * from users"
    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        res.json(data)
        
    })                                            
})

// VALIDATE : 
app.post('/api/validate', async function(req, res) {
    const { emailId, password } = req.body;

    try {
        const query = "SELECT * FROM users WHERE emailId = ? AND password = ?";
        const values = [emailId, password];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    status: "failure",
                    message: "Database error"
                });
            }

            if (result.length === 0) {
                return res.status(401).json({
                    status: "failure",
                    message: "User does not exist or invalid credentials"
                });
            }

            res.status(200).json({
                status: "success",
                message: "User found and credentials are correct",
                user: result[0]
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "failure",
            message: "Authentication failed"
        });
    }
});



//ADD USER
app.post('/api/adduser', async function (req, res) {
    const { emailId, password } = req.body;

    const selectQuery = "SELECT * FROM users WHERE emailId = ? AND password = ?";
    const insertQuery = "INSERT INTO users (emailId, password) VALUES (?, ?)";
    const values = [emailId, password];
    try {
        // Check if user already exists
        db.query(selectQuery, values, function (err, result) {
            if (err) {
                return res.status(500).json({ message: err });
            }

            if (result.length > 0) {
                // User already exists
                return res.status(409).json({ message: "User already exists" });
            }

            // Insert new user
            db.query(insertQuery, values, function (err2, result2) {
                if (err2) {
                    return res.status(500).json({ message: err2 });
                }

                return res.status(201).json({ message: "Success" });
            });
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

const PORT=process.env.DB_PORT || 4000
app.listen(PORT,'0.0.0.0', ()=>{
    console.log(`Server running on port ${PORT}`);
})

// TO START -> npm start
// THE FIRST STARTING PAGE WILL BE "/"
// TO PRINT ANYTHING OR TO "AVOID Cannot get /"
// USE 
// app.get("/",(req,res)=>{res.json("Hello")})
