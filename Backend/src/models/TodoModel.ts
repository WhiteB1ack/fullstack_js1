import mongoose from 'mongoose'
// 日期 状态 标题 简介 期限
const TodoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    abstract: {
      type: String,
      default: ''
    },

    completed: {
      type: Boolean,
      default: false
    },

    deadline: {
      type: Date,
      default: null
    }
  }, {
    timestamps: true
  }
)

const TodoModel = mongoose.model('todos', TodoSchema)

export default TodoModel