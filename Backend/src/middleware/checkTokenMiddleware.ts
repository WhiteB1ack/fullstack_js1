import jwt from 'jsonwebtoken'
import { secret } from '../config/config'
import type { Request, Response, NextFunction } from "express";

interface JwtPayload {
  username: string,
  _id: string
}

export const checkTokenMiddleware = (
    req: Request, 
    res: Response, 
    next: NextFunction
  ) => {

  // 获取 token
  const token = req.get('token');

  if(!token) {
    return res.status(401).json({
      code: 2003,
      msg: 'token缺失',
      data: null
    })
  }

  // 校验 token
  jwt.verify(token, secret, async(err, data) => {
    // 检测token 是否正确
    if(err){
      return res.json({
        code: 2004,
        msg: 'token 校验失败',
        data: null
      })
    }

    const payload = data as JwtPayload

    req.user = payload

    next();
  })
}