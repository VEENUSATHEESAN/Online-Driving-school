const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({
  origin: 'http://localhost:5173', // replace with your frontend's origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/wizard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const courseRoute = require('./routes/course');
const instructorRoute = require('./routes/instructor');
const scheduleRoute = require('./routes/schedule');
const vehicleRoute = require('./routes/vehicle');
const studentRoute = require('./routes/student');
const paymentRoute = require('./routes/payment');
const enrollmentRoute = require('./routes/enrollment');
const contactRoute = require('./routes/contact');
const userManagementRoute = require('./routes/userManagement');
const questionRoute = require('./routes/question');

app.use('/api', registerRoute);
app.use('/api', loginRoute);
app.use('/api', courseRoute);
app.use('/api', instructorRoute);
app.use('/api', scheduleRoute);
app.use('/api', vehicleRoute);
app.use('/api', studentRoute);
app.use('/api', paymentRoute);
app.use('/api', enrollmentRoute);
app.use('/api', contactRoute);
app.use('/api', userManagementRoute);
app.use('/api', questionRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
