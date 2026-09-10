<script setup lang="ts">
import { ref } from 'vue';
import { login } from '../api/user';
import { validatePassword, validateUsername } from '@/utils/validate';

const username = ref<string>('');
const password = ref<string>('');

const handleLogin = async() => {
  // 提交数据

  if(!validateUsername(username.value)) {
    console.log('用户名格式不正确')
    return
  }

  if(!validatePassword(password.value)) {
    console.log('密码长度不正确')
    return
  }

  try {
    const res = await login({
      username: username.value,
      password: password.value
    })

    console.log(username.value, password.value)
    console.log(res.data)

  } catch(err) {
    console.error(err)
  }

  console.log(username.value, password.value)
  username.value = password.value = '';
}

</script>

<template>
  <h1>登录页面</h1>
  <div>
    <span>
      账号: <input type="text" v-model="username" /><br>
      密码: <input type="password" v-model="password" /><br>
      <button @click="handleLogin">提交</button><br>
    </span>
  </div>
  <RouterLink to="/register">没有账号? 去注册</RouterLink>

</template>

<style scoped></style>
