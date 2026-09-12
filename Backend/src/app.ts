import express from 'express'

import authApiRouter from './routes/api/auth.ts'
import todoApiRouter from './routes/api/todo.ts'

const app = express();

// 设置中间件

app.use(express.json())

app.use('/api', authApiRouter)
app.use('/api', todoApiRouter)

export default app