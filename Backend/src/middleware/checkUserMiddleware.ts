import type { Request, Response, NextFunction } from "express";

interface UserBody {
  username: string
  password: string
}

export const checkUserMiddleware = (
  req: Request<{}, {}, UserBody>,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  // 用户名
  if(!username) {
    return res.status(400).json({
      code: 1001,
      msg: '用户名不能为空',
      data: null
    })
  }

  if(!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
    return res.status(400).json({
      code: 1002,
      msg: '用户名格式不正确',
      data: null
    })
  }

  // 密码
  if(!password){
    return res.status(400).json({
      code: 1003,
      msg: '密码不能为空',
      data: null
    })
  }

  if(password.length < 6 || password.length > 20){
    return res.status(400).json({
      code: 1004,
      msg: '密码长度必须为 6~20 位',
      data: null
    })
  }
  
  // 检测过
  next();
}

export default checkUserMiddleware