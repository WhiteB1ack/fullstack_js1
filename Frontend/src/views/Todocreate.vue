<script lang="ts" setup>
import { createTodoApi } from '@/api/todo';
import type { Todo, TodoData } from '../types/todo'
import { ref } from 'vue';

const userId = ref('6aa192996cb6f8e08466e5c0')
const title = ref('')
const abstract = ref('')
const completed = ref(false)
const deadline = ref('')

const createTodo = async () => {
  // 校验数据
  const data = {
    userId: userId.value,
    title: title.value,
    abstract: abstract.value,
    completed: completed.value,
    deadline: deadline.value
  }

  // 函数操作
  console.log('开始提交')
  try {
    await createTodoApi(data)
    console.log('创建成功')
  } catch(err) {
    console.error('创建失败', err)
  }

  console.log('提交结束')
  // 善后操作
}

</script>

<template>
<h1>创建Todo页面</h1>
标题: <input type="text" v-model="title" /><br>
简介: <input type="text" v-model="abstract" /><br>
截止时间: <input type="date" v-model="deadline"><br>
<button @click="createTodo">提交</button>
<RouterLink to="/todo"> 总览列表 </RouterLink>

</template>

<style>


</style>