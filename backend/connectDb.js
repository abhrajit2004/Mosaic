const mongoose = require('mongoose');

let isConnected = false;

const connectToMongo = async () => {

    if (isConnected) {
        console.log("Mongo already connected.");
        return;
    }

    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}`);
        isConnected = conn.connections[0].readyState;
        console.log('Connected to MongoDB Successfully');
    }
    catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
}

module.exports = connectToMongo;