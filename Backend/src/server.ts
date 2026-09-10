import app from './app.ts'
import connectDB from './db/db.ts'

async function startServer(){
  try {
    await connectDB()

  app.listen(3000, () => {
    console.log(`服务器启动成功 Server running at http://localhost:3000`);
  })    
  } catch (error) {
    console.error('服务器启动失败:', error)
  }
}

startServer()
