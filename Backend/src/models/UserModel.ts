import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  // 标题
  username: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
})

const UserModel = mongoose.model('users', UserSchema)

export default UserModel