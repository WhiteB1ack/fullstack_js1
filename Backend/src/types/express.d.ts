import { Types } from 'mongoose'

declare global {
  namespace Express {
    interface Request {
      user: {
        username: string,
        _id: string
      }
    }
  }
}