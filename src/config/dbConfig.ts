import mongoose from 'mongoose';

export const connection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Db connected');
  } catch (err) {
    console.error(err);
    throw new Error('Error al conectar la db');
  }
};
