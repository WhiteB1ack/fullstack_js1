import express from 'express'
import { Router } from 'express'
import UserModel from '../../models/UserModel.ts'
import { checkUserMiddleware } from '../../middleware/checkUserMiddleware.ts'

const router = Router()

// 登录操作
router.post('/login', checkUserMiddleware, async (req, res) => {
  // 获取用户名和密码
  let { username, password } = req.body;

  // 查询数据库
  try {
    const data = await UserModel.findOne({ username: username, password: password })

    console.log(data)
    if(!data){
      // 登录失败
      return res.status(400).json({
        code: 2002,
        msg: '用户名或密码错误',
        data: null
      })
    } 

    // 登陆成功
    res.status(204).json({
      code: 2000,
      msg: '登陆成功',
      data: null
    })
    
  } catch {
    // 数据库异常
    res.status(500).json({
      code: 2001,
      msg: '数据库读取失败',
      data: null
    })
  }
})

// 注册操作
router.post('/register', checkUserMiddleware, async (req, res) => {
  // 获取用户名和密码
  let { username, password } = req.body;

  // 查询数据库
  try {
    const data = await UserModel.findOne({ username: username })

    console.log(data)
    if(data) {
      return res.status(409).json({
        code: 3002,
        msg: '该用户名已存在',
        data: null
      })
    }
    await UserModel.create({
      username,
      password
    });

    res.json({
      code: 3000,
      msg: '注册成功',
      data: null
    });

  } catch(err) {
    res.json({
      code: 3001,
      msg: '数据库读取失败',
      data: null
    })
  }
})


// 退出登录
router.post('/logout', (req, res) => {
  // 销毁....
})

export default router