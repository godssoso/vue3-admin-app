<template>
  <div class="login-page">
    <div class="main-container">
      <el-form :model="formData" ref="loginForm" :rules="rules">
        <div class="title">用户登录</div>
        <el-form-item prop="username">
          <el-input
            v-model.trim="formData.username"
            placeholder="请输入用户名"
            :suffix-icon="User"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model.trim="formData.password"
            :type="passwordType"
            @keyup.enter="handleLogin"
            placeholder="请输入密码"
          >
            <template #suffix>
              <el-icon class="el-input__icon" @click="changeType">
                <Hide v-if="passwordType === 'password'" />
                <View v-else />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <div class="link-container">
          没有账号？
          <el-link @click="handleToRegister">
            去注册
            <el-icon class="icon-container">
              <TopRight />
            </el-icon>
          </el-link>
        </div>

        <div class="btn-box">
          <el-button
            type="primary"
            class="btn-container"
            :loading="loading"
            @click.prevent="handleLogin"
            >登 录</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { User, Hide, View, TopRight } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { type FormInstance, FormRules } from 'element-plus'
import { type LoginRequestData } from '@/api/login/types/login'

const formData = ref<LoginRequestData>({
  username: 'admin',
  password: ''
})

const rules = ref<FormRules>({
  username: [
    {
      required: true,
      message: 'Please input Activity name',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: 'Please input Activity password',
      trigger: 'blur'
    }
  ]
})

const passwordType = ref('password')
const changeType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

const userStore = useUserStore()
const loginForm = ref<FormInstance | null>(null)
const loading = ref(false)
const router = useRouter()
const handleLogin = () => {
  loginForm.value?.validate((valid) => {
    if (valid) {
      loading.value = true
      try {
        userStore
          .login(formData.value)
          .then(() => {
            router.push({ path: '/' })
            ElMessage.success('登陆成功')
          })
          .catch(() => {
            formData.value.password = ''
          })
          .finally(() => {
            loading.value = false
          })
      } catch (error) {
        console.log(error, 'error')
        loading.value = false
      }
    } else {
      console.log('error submit!!')
      return false
    }
  })
}

const handleToRegister = () => {
  router.push('/register')
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100%;
  background: linear-gradient(to bottom right, #5c8dd2, #c6b0f8);
  display: flex;
  justify-content: center;
  align-items: center;
  .main-container {
    width: 50%;
    height: auto;
    margin: auto;
    min-height: 400px;
    border-radius: 10px;
    background: #cfddf8;
    .title {
      font-size: 30px;
      text-align: center;
      padding: 20px;
    }
    :deep(.el-input) {
      width: 70%;
      margin: 10px auto;
      height: 50px;
    }
    :deep(.el-form-item__error) {
      display: block;
      width: 100%;
      padding: 0 15%;
    }
    .link-container {
      width: 70%;
      margin: 10px auto;
      text-align: right;
      font-size: 12px;
      line-height: 18px;
      :deep(.el-link) {
        font-size: 12px;
        color: red;
      }
      :deep(.el-link):hover {
        color: #409eff;
      }
    }
    .btn-box {
      width: 70%;
      margin: 15px auto;
    }
    .btn-container {
      width: 100%;
      height: 40px;
    }
  }
}
</style>
