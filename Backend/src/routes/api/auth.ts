import express from 'express'
import { Router } from 'express'
import UserModel from '../../models/UserModel.ts'
import { checkUserMiddleware } from '../../middleware/checkUserMiddleware.ts'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { secret } from '../../config/config.ts'

const router = Router()

// 登录操作
router.post('/login', checkUserMiddleware, async (req, res) => {
  // 获取用户名和密码
  let { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username })

    if(!user) {
      return res.status(400).json({
        code: 2001,
        msg: '该用户不存在',
        data: null
      })
    }

    const isMatch = await bcrypt.compare(
      password,
      user.passwordHash
    )

    if(!isMatch){
      return res.status(400).json({
        code: 2002,
        msg: '密码错误',
        data: null
      })
    } else {
      // 创建token
      let token = jwt.sign({
        username: username,
        _id: user._id
      }, secret, {
        expiresIn: 60 * 60 * 24 * 7
      })

      res.status(200).json({
        code: 2000,
        msg: '登陆成功',
        data: {
          token
        }
      })
    }
  } catch {
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

  const passwordHash = await bcrypt.hash(password, 10)

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
      passwordHash
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