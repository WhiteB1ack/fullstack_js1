<script setup lang="ts">
import { ref } from 'vue';
import { register } from '../api/user';
import { validatePassword, validateUsername, validatePasswordSame } from '@/utils/validate';

const username = ref<string>('');
const password = ref<string>('');
const verifiedpassword = ref<string>('');

const handleRegister = async() => {

  if(!validatePassword(password.value)){
    console.log('用户名格式不正确')
    return
  }

  if(!validateUsername(username.value)){
    console.log('密码长度不正确')
    return
  }

  if(!validatePasswordSame(password.value, verifiedpassword.value)){
    console.log('密码前后不一致')
    return
  }

  // 校验密码是否合规
  // 提交数据
  try {
    const res = await register({
      username: username.value,
      password: password.value
    })
    
    console.log(username.value, password.value)
    console.log(res.data)    

  } catch(err) {
    console.error(err)
  }
  username.value = password.value = verifiedpassword.value = '';  
}

</script>

<template>
  <h1>注册页面</h1>
  <div>
    <span>
      账  号: <input type="text" v-model="username" /><br>
      新密码: <input type="password" v-model="password" /><br>
      密  码: <input type="password", v-model="verifiedpassword"><br>
      <button @click="handleRegister">提交</button><br>
    </span>
  </div>
  <RouterLink to="/login">已有账号? 去登录</RouterLink>

</template>

<style scoped></style>
