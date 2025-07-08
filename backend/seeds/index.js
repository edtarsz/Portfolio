const mongoose = require('mongoose');
const Campground = require('../model/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

function setupDBListeners() {
    const db = mongoose.connection;

    db.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });

    db.on('disconnected', () => {
        console.log('MongoDB disconnected.');
    });
}

async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/yelp-camp');
        console.log('MongoDB connection successfully');
    } catch (err) {
        console.error('MongoDB initial connection error:', err);
    }
}

// Inicializar la conexión
connectDB();
setupDBListeners();

const seedDB = async () => {
    await Campground.deleteMany({});
    console.log('Campgrounds deleted');

    for (let i = 0; i < 50; i++) {
        const randomNumber = Math.floor(Math.random() * 1000);

        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            price: randomNumber.toFixed(2),
            description: 'This is a sample campground description.',
            location: `Location ${cities[randomNumber].city}, ${cities[randomNumber].state}`,
        });

        await camp.save();
    }

    console.log('Campgrounds created');
    await mongoose.connection.close();
}

const sample = (array => array[Math.floor(Math.random() * array.length)]);

seedDB();
