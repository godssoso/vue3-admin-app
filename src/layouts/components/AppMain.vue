<!-- 主体内容区域 -->
<template>
  <section class="app-main">
    <router-view />
  </section>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style lang="scss" scoped>
.app-main {
  width: 100%;
  background-color: var(--body-bg-color);
}
</style>
