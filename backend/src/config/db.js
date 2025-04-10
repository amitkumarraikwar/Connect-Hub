import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      userNewUrlParser: true,
      userUnifiedTopology: true,
    });
    console.log('MongoDB is Connected');
  } catch (error) {
    console.log('MongoDB Connection Failed: ', error);
    process.exit(1);
  }
};

export default connectDB;