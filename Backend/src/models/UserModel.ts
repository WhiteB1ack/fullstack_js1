import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  // 标题
  username: String,
  password: String
})

const UserModel = mongoose.model('users', UserSchema)

export default UserModel