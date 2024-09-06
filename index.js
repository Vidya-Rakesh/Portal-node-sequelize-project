require('dotenv').config();

const express = require('express');
const path = require('path');
const { sequelize } = require('./models/server');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


//middleware
//app.use(express.json());

// Enable CORS for all routes . this allows requests from any origin
app.use(cors());

app.use(bodyParser.json({ limit: '10mb' }));


//define all routes


app.use('/api/users',require('./routes/signupRoutes'));
app.use('/api/users',require('./routes/LoginRoutes'));
app.use('/api/users',require('./routes/signupAccountDeleteRoutes'));
app.use('/api/users',require('./routes/signupAccountUpdateRoutes'));
app.use('/api/users',require('./routes/companyJobPostRoutes'));
app.use('/api/users',require('./routes/jobViewRoutes'));
app.use('/api/users',require('./routes/jobDeleteRoutes'));
app.use('/api/users',require('./routes/jobDetailsUpdateRoutes'));
app.use('/api/users',require('./routes/jobRequestRoutes'));
app.use('/api/users',require('./routes/checkJobRequestbyCompanyRoutes'));
const port = 5000;
sequelize
.sync()
.then(() =>{app.listen(port, () => {
    console.log(`listening on port ${port}`)
})} )
.catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

