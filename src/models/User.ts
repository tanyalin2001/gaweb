import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  username: String,
  password: String,
  role: { type: String, default: 'user' },
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);