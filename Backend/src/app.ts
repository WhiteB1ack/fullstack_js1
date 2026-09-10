import express from 'express'

import authApiRouter from './routes/api/auth.ts'

const app = express();

// 设置中间件

app.use(express.json())

app.use('/api', authApiRouter)

export default app