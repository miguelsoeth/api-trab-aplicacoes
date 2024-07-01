const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.connect('mongodb://host.docker.internal:27017/bc', { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      user: 'mongodb',
      pass: 'mongodb',
      authSource: 'admin'
    });

    mongoose.connection.on('connected', () => {
    console.log('MongoDB conectado');
    });

    mongoose.connection.useDb('bc');
    
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;