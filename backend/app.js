const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// Models
const Campground = require('./model/campground');

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
        console.log('Initial connection MongoDB connection successfully');
    } catch (err) {
        console.error('MongoDB initial connection error:', err);
    }
}

// Inicializar la conexión
connectDB();
setupDBListeners();

app.use(cors()); // Permite que Angular acceda a la API
app.use(express.json()); // Middleware para parsear JSON

app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.send(campgrounds);
});

app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.send(campground);
});

// app.get('/makecampground', async (req, res) => {
//     const camp = new Campground({
//         title: 'Sample Campground',
//         price: '20.00',
//         description: 'This is a sample campground description.',
//         location: 'Sample Location'
//     });

//     try {
//         await camp.save();
//         res.status(201).json(camp);
//     } catch (err) {
//         console.error('Error saving campground:', err);
//         res.status(500).json({ error: 'Failed to save campground' });
//     }
// });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
