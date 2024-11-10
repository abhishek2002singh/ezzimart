const express = require('express');
const app = express();
const dataConnection = require('./src/config/database');

const cookiesParser = require('cookie-parser')

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
  
}
app.use(cors(corsOptions));



// Middleware to parse JSON requests
app.use(express.json());
app.use(cookiesParser())

const userRoutes = require('./src/router/user'); 
const profileRouter = require('./src/router/profile')

// Use user routes
app.use('/', userRoutes); // Prefix your routes with '/api'
app.use('/' ,profileRouter)

dataConnection()
    .then(() => {
        app.listen(7000, () => {
            console.log("App running on port 7000");
        });
    })
    .catch((error) => {
        console.error('Failed to connect to the database:', error);
    });
