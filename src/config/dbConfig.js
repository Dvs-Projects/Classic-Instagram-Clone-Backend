const mongoose = require('mongoose');

const connection = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Db connected');
  } catch (err) {
    console.error(err);
    throw new Error("Can't connect to db...");
  }
};

module.exports = connection;
