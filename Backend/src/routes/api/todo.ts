import { Router } from 'express'
import TodoModel from '../../models/TodoModel'
import { checkTodoMiddleware } from '../../middleware/checkTodoMiddleware'
import { checkTokenMiddleware } from '../../middleware/checkTokenMiddleware'

const router = Router()

// 获取用户对应列表
router.get('/todo', checkTokenMiddleware, async(req, res) => {
  // 获取用户ID
  const userId = req.user._id

  try {
    const todoList = await TodoModel.find({ userId })

    res.json({
      code: 4000,
      msg: '检索成功',
      data: todoList
    })
  } catch {
    res.json({
      code: 4001,
      msg: '数据库连接失败',
      data: null
    })
  }
  // 返回todo List
})

// 增加操作
router.post('/todo', checkTokenMiddleware, checkTodoMiddleware, async(req, res) => {
  // 解包
  const { title, abstract, completed, deadline } = req.body
  const userId = req.user._id

  // 校验
  try {
    const data = { userId, title, abstract, completed, deadline }
    await TodoModel.create(data);

    res.json({
      code: 5000,
      msg: '新建成功',
      data: null
    })    
  } catch (err) {
    res.json({
      code: 5001,
      msg: '新建失败',
      data: null
    })
  }
})

// 删除操作
router.delete('/todo/:id', async(req, res) => {
  // 获取数据  id
  console.log(req.params.id)
  // 查询指定项是否存在
  try {
    const todo = await TodoModel.findByIdAndDelete(req.params.id)
    console.log(todo)
    if(!todo){
      return res.json({
        code: 6001,
        msg: '删除项不存在',
        data: null
      })
    }

    res.json({
      code: 6000,
      msg: '删除成功',
      data: null
    })
  } catch {
    res.json({
      code: 6002,
      msg: '删除失败',
      data: null
    })
  }
})

// 状态更改
router.patch('/todo/:id', async(req, res) => {
  const { id } = req.params
  const completed = req.body.completed
  try {
    const todo = await TodoModel.findByIdAndUpdate(
      id,
      { completed: completed },
      { 
        returnDocument: 'after', 
      }
    )

    if(!todo){
      return res.json({
        code: 7001,
        msg: 'Todo 不存在',
        data: null
      })
    }

    res.json({
      code: 7000,
      msg: '状态修改成功',
      data: todo
    })
  } catch(err) {
    console.log('修改状态失败:', err)
    res.json({
      code: 7002,
      msg: '修改状态失败',
      data: null
    })
  }
})

export default router