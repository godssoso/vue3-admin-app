<template>
  <div class="app-wrapper">
    <!-- 左侧边栏 -->
    <Sidebar class="sidebar-container" />
    <!-- 主容器 -->
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <!-- 头部导航栏和标签栏 -->
      <div :class="{ 'fixed-header': fixedHeader }" class="layout-header">
        <NavigationBar />
        <TagsView v-show="showTagsView" />
      </div>
      <!-- 页面主体内容 -->
      <AppMain class="app-main" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'
import { useSettingsStore } from '@/stores/settings'
import { AppMain, NavigationBar, Sidebar, TagsView } from './components'
import { DeviceEnum } from '@/constants/app-key'

const appStore = useAppStore()
const settingsStore = useSettingsStore()

const { showTagsView, fixedHeader } = storeToRefs(settingsStore)

/** 定义计算属性 layoutClasses，用于控制布局的类名 */
const layoutClasses = computed(() => {
  return {
    hideSidebar: !appStore.sidebar.opened,
    openSidebar: appStore.sidebar.opened,
    withoutAnimation: appStore.sidebar.withoutAnimation,
    mobile: appStore.device === DeviceEnum.Mobile
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';
$transition-time: 0.35s;

.app-wrapper {
  @include clearfix;
  position: relative;
  width: 100%;
}

.drawer-bg {
  background-color: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.sidebar-container {
  transition: width $transition-time;
  width: var(--sidebar-width) !important;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.main-container {
  min-height: 100%;
  transition: margin-left $transition-time;
  margin-left: var(--sidebar-width);
  position: relative;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - var(--sidebar-width));
  transition: width $transition-time;
}

.layout-header {
  box-shadow: var(--el-box-shadow-lighter);
}

.app-main {
  min-height: calc(100vh - var(--navigationbar-height));
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: var(--navigationbar-height);
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    min-height: calc(100vh - var(--header-height));
  }
  .fixed-header + .app-main {
    padding-top: var(--header-height);
  }
}

.hideSidebar {
  .sidebar-container {
    width: var(--sidebar-hide-width) !important;
  }
  .main-container {
    margin-left: var(--sidebar-hide-width);
  }
  .fixed-header {
    width: calc(100% - var(--sidebar-hide-width));
  }
}

.withoutAnimation {
  .sidebar-container,
  .main-container {
    transition: none;
  }
}
</style>
