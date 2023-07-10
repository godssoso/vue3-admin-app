<template>
  <!-- 该页面用于路由重定向 -->
  <div></div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

router.replace({ path: '/' + route.params.path, query: route.query })
</script>

<style lang="scss" scoped></style>
