const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

app.use(morgan('dev'));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log(`Request received at: ${req.requestTime}`);
    next();
});

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

app.post('/campgrounds', async (req, res) => {
    // console.log('Received request to add campground:', req.body);
    const { title, price, description, location } = req.body;

    const newCampground = new Campground({
        title,
        price,
        description,
        location
    });

    try {
        await newCampground.save();
        res.status(201).json(newCampground);
    } catch (err) {
        console.error('Error saving campground:', err);
        res.status(500).json({ error: 'Failed to save campground' });
    }
});

app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.send(campground);
});

app.put('/campgrounds/:id', async (req, res) => {
    const { title, price, description, location } = req.body;

    // el new: true option returns the updated document
    try {
        const updatedCampground = await Campground.findByIdAndUpdate(req.params.id, {
            title,
            price,
            description,
            location
        }, { new: true });

        if (!updatedCampground) {
            return res.status(404).json({ error: 'Campground not found' });
        }

        res.json(updatedCampground);
    } catch (err) {
        console.error('Error updating campground:', err);
        res.status(500).json({ error: 'Failed to update campground' });
    }
});

app.delete('/campgrounds/:id', async (req, res) => {
    try {
        const deletedCampground = await Campground.findByIdAndDelete(req.params.id);

        if (!deletedCampground) {
            return res.status(404).json({ error: 'Campground not found' });
        }
        res.json({ message: 'Campground deleted successfully' });
    } catch (err) {
        console.error('Error deleting campground:', err);
        res.status(500).json({ error: 'Failed to delete campground' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use((req, res) => {
    res.status(404).send('Ruta inexistente');
});

app.use((err, req, res, next) => {
    console.error('Error no controlado:', err.stack); // Log para debugging
    res.status(500).json({
        error: 'Algo salió mal en el servidor',
        message: err.message // solo en desarrollo
    });
});
