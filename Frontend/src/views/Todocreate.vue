<script lang="ts" setup>
import { createTodoApi } from '@/api/todo';
import type { Todo, TodoData } from '../types/todo'
import { ref } from 'vue';

const title = ref('')
const abstract = ref('')
const deadline = ref('')

const createTodo = async () => {
  // 校验数据
  

  // 函数操作


  // 善后操作
}

</script>

<template>
<h1>创建Todo页面</h1>
标题: <input type="text" v-model="title" /><br>
简介: <input type="text" v-model="abstract" /><br>
截止时间: <input type="date" v-model="deadline"><br>

<button @click="">提交</button>

</template>

<style>


</style>