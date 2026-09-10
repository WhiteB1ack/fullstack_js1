<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getTodoListApi, deleteTodoApi } from '../api/todo';
import type { TodoData, Todo } from '@/types/todo';

const todoList = ref<Todo[]>([])

const getList = async () => {
  try {
    const res = await getTodoListApi()

    console.log(res.data)

    todoList.value = res.data.data
  } catch (err) {
    console.error('获取 Todo 失败', err)
  }
}

const deleteTodo = async (_id: string) => {
  try {
    const res = await deleteTodoApi(_id)

    console.log(res)
  } catch (err) {
    console.error('删除失败', err)
  }
}

onMounted(() => {
  getList()
})
</script>

<template>
<h1>Hello This'is TodoList</h1>

<div 
  v-for="todo in todoList"
  :key="todo._id"
>
  <h3>{{ todo.title }}</h3>
  <p>{{ todo.abstract }}</p>
  <span>{{ todo.completed ? '已完成' : '未完成' }}</span>
  <button @click="deleteTodo(todo._id)"></button>
</div>

</template>

<style>

</style>