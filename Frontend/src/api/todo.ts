import request from "./request";

import type { TodoData } from "@/types/todo";

// 查询
export const getTodoListApi= () => {
  return request.get('/todo')
}

// 新建
export const createTodoApi = ( data: TodoData ) => {
  return request.post('/todo', data)
}

// 删除
export const deleteTodoApi = ( _id: string ) => {
  return request.delete(`/todo/:${_id}`)
}