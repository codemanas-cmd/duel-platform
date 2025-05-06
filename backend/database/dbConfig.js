import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();  

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('Error: MONGO_URI environment variable is not set');
  process.exit(1);
}

mongoose.set('strictQuery', false);

mongoose.connection.once('open', () =>
  console.log('MongoDB connection opened')
);
mongoose.connection.on('connected', () =>
  console.log('MongoDB connected (event)')
);
mongoose.connection.on('reconnected', () =>
  console.log('MongoDB reconnected')
);
mongoose.connection.on('error', err =>
  console.error('MongoDB error event:', err)
);
mongoose.connection.on('disconnected', () =>
  console.warn('MongoDB disconnected')
);

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log(' MongoDB connection closed due to app termination');
  process.exit(0);
});

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log('MongoDB is already connected');
    return;
  }
  try {
    await mongoose.connect(MONGO_URI);
    console.log(' MongoDB connected successfully');
  } catch (err) {
    console.error(' Failed to connect to MongoDB:', err);
    process.exit(1);
  }
};

export default connectDB;
