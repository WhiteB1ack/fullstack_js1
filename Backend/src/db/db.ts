// db/db.js
import mongoose from 'mongoose';
import { DBHOST, DBNAME, DBPORT } from '../config/config.ts';

/*
 * 连接 MongDB 数据库
 * @return { Promise<void> }
*/

export default async function connectDB(){
  try {
    await mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)
    console.log('数据库连接成功')
  } catch(err) {
    console.error('数据库连接失败', err)
    throw err;
  }

  mongoose.connection.on('close', () => {
    console.log('数据库连接已关闭')
  })
}