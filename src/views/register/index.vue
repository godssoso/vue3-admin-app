<!-- <template>
  <div class="register-page">
    <div class="main-container">
      <el-form
        :model="formData"
        ref="registerForm"
        :rules="rules"
        label-position="right"
        label-width="80px"
      >
        <div class="title">注册中心</div>
        <el-form-item prop="userName" label="账号" size="large">
          <el-input
            v-model.trim="formData.userName"
            size="large"
            placeholder="请设置用户名"
            :suffix-icon="User"
          />
        </el-form-item>
        <el-form-item prop="password" label="密码" size="large">
          <el-input
            v-model.trim="formData.password"
            size="large"
            :type="passwordType"
            placeholder="请设置密码"
          >
            <template #suffix>
              <el-icon class="el-input__icon" @click="changeType">
                <Hide v-if="passwordType === 'password'" />
                <View v-else />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="pwAgain" label="确认密码" size="large">
          <el-input
            v-model.trim="formData.pwAgain"
            size="large"
            :type="pwAgainType"
            placeholder="请再次输入密码"
          >
            <template #suffix>
              <el-icon class="el-input__icon" @click="changePwAgainType">
                <Hide v-if="pwAgainType === 'password'" />
                <View v-else />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <div class="link-container">
          已有账号？
          <el-link @click="handleToLogin">
            去登录
            <el-icon class="icon-container">
              <TopRight />
            </el-icon>
          </el-link>
        </div>

        <div class="btn-box">
          <el-button
            type="primary"
            class="btn-container"
            :loading="isRegister"
            @click="handleRegister"
            >注 册</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { User, Hide, View, TopRight } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const formData = ref({
  userName: '',
  password: '',
  pwAgain: ''
})

const validatePwAgain = (rule, value, callback) => {
  if (formData.value.pwAgain !== formData.value.password) {
    callback(new Error('两次密码不一致，请检查'))
  } else {
    callback()
  }
}
const rules = ref({
  userName: [
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
  ],
  pwAgain: [
    {
      required: true,
      message: 'Please input Activity password',
      trigger: 'blur'
    },
    { validator: validatePwAgain, trigger: 'blur' }
  ]
})

const passwordType = ref('password')
const pwAgainType = ref('password')
const changeType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}
const changePwAgainType = () => {
  if (pwAgainType.value === 'password') {
    pwAgainType.value = 'text'
  } else {
    pwAgainType.value = 'password'
  }
}

const registerForm = ref(null)
const isRegister = ref(false)
const router = useRouter()
const handleRegister = () => {
  registerForm.value.validate(async (valid) => {
    if (valid) {
      isRegister.value = true
      //TODO:此处调注册api
      setTimeout(() => {
        ElMessage.success('注册成功')
        isRegister.value = false
        router.push('/login')
      }, 1000)
    } else {
      console.log('error submit!!')
      return false
    }
  })
}

const handleToLogin = () => {
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.register-page {
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
    :deep(.el-form-item) {
      padding: 0 15%;
      margin: 5% 0;
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
      position: relative;
      width: calc(70% - 80px);
      margin: 15px auto 30px;
      left: 40px;
    }
    .btn-container {
      width: 100%;
      height: 40px;
    }
  }
}
</style> -->

<template>
  <div>注册页</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
