// To connect with your mongoDB database
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());


const port = process.env. PORT || 2000;

// Schema for hotel Booking
const UserSchema = new mongoose.Schema({
name: {
	type: String,
},
email: {
	type: String,
	required: true,
	unique: true,
},
roomNo: {
	type: String,
	required: true,
},
date: {
	type: Date,
	default: Date.now,
},
});

const RoomBooked = mongoose.model('users', UserSchema);
RoomBooked.createIndexes();



app.get('/', (req, resp) => {
resp.send('App is Working');
});

// Register data to book hotelroom
app.post('/register', async (req, resp) => {
try {
	const user = new RoomBooked(req.body);
	let result = await user.save();
	result = result.toObject();
	if (result) {
	delete result.password;
	resp.send(req.body);
	console.log(result);
	} else {
	console.log('User already register');
	}
} catch (e) {
	resp.send('Something Went Wrong');
}
});

// Getting roombooked details
app.get('/get-room-data', async (req, resp) => {
try {
	const details = await RoomBooked.find({});
	resp.send(details);
} catch (error) {
	console.log(error);
}
});

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Atlas');
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        process.exit(1); // Exit the process if unable to connect to the database
    }
};

connectToMongoDB();


// Server setup
app.listen( () => {
console.log('App listen at port 2000');
});
