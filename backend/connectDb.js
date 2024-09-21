const mongoose = require('mongoose');

const connectToMongo = async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log('Connected to MongoDB Successfully');
    }
    catch(error){
        console.error('Error connecting to MongoDB', error);
    }
}

module.exports = connectToMongo;