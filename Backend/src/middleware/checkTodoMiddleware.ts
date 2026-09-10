import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

interface TodoBody {
  userId: string,
  title: string,
  abstract: string,
  completed: boolean,
  deadline: Date
}

export const checkTodoMiddleware = (
  req: Request<{}, {}, TodoBody>,
  res: Response,
  next: NextFunction
) => {
  const { userId, title, abstract, completed, deadline } = req.body

  if(!userId){
    return res.status(401).json({
      code: 6001,
      msg: 'token已过期',
      data: null
    })
  }

  if(!title){
    return res.status(400).json({
      code: 6002,
      msg: '标题不可设为空',
      data: null
    })
  }

  if(completed){
    return res.status(400).json({
      code: 6003,
      msg: '状态设置异常',
      data: null
    })
  }

  if(!deadline){
    return res.status(400).json({
      code: 6004,
      msg: '未设置相应日期',
      data: null
    })
  }

  next()
}

export default checkTodoMiddleware