<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getTodoListApi, deleteTodoApi, updateTodoApi } from '../api/todo';
import type { Todo } from '@/types/todo';
import { formatDate } from '@/utils/todo';

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
    await getList()
  } catch (err) {
    console.error('删除失败', err)
  }
}

const updateTodo = async (todo: Todo) => {
  const completed = !todo.completed
  
  try {
    const res = await updateTodoApi(todo._id, completed)
    console.log(res)
    await getList()
  } catch (err) {
    console.log('更新失败', err)
  }
}

onMounted(() => {
  getList()
})
</script>

<template>
  <main>
    <header>
      <h1>Todo List</h1>
      <p>我的待办事项 <RouterLink to="/todo/create">去创建</RouterLink> </p>
    </header>

    <hr />

    <section>
      <h2>待办事项</h2>
      <p v-if="todoList.length === 0">
        暂时没有 Todo
      </p>

      <ul v-else>
        <li
          v-for="todo in todoList"
          :key = "todo._id"
        >
        <h3>
          {{ todo.title }}
        </h3>

        <p v-if="todo.abstract">
          <strong>简介: </strong>
          <span>
            {{ todo.abstract }}
          </span>
        </p>


        <p>
          <strong>截止日期: </strong>
          <time :datetime="todo.deadline">
            {{ formatDate(todo.deadline) }}
          </time>
        </p>

        <p>
          <strong>状态: </strong>
          <span>
            {{ todo.completed ? '已完成' : '未完成' }}
          </span>
        </p>

        <p>
          <strong>ID: </strong>
          <code>{{ todo._id }}</code>
        </p>

        <button
          type = "button"
          @click="deleteTodo(todo._id)"
        >
          删除
        </button>

        <button
          type="button"
          @click="updateTodo(todo)"
        >
          {{ todo.completed ? '取消完成' : '完成' }}
        </button>

        </li>
      </ul>
    </section>
  </main>
</template>

<style>

</style>