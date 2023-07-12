<!-- 侧边栏组件 -->
<template>
  <div :class="{ 'has-logo': isLogo }">
    <Logo v-if="isLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="sidebarMenuBgColor"
        :text-color="sidebarMenuTextColor"
        :active-text-color="sidebarMenuActiveTextColor"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="route in permissionStore.routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'
import { usePermissionStore } from '@/stores/permission'
import { useSettingsStore } from '@/stores/settings'
import SidebarItem from './SidebarItem.vue'
import Logo from '../Logo/index.vue'
import { getCssVariableValue } from '@/utils'

const sidebarMenuBgColor = getCssVariableValue('--sidebar-menu-bg-color')
const sidebarMenuTextColor = getCssVariableValue('--sidebar-menu-text-color')
const sidebarMenuActiveTextColor = getCssVariableValue('--sidebar-menu-active-text-color')

const route = useRoute()
const appStore = useAppStore()
const permissionStore = usePermissionStore()
const settingsStore = useSettingsStore()

const { layoutMode, showLogo } = storeToRefs(settingsStore)

const activeMenu = computed(() => {
  const {
    meta: { activeMenu },
    path
  } = route
  return activeMenu ? activeMenu : path
})

const isCollapse = computed(() => !appStore.sidebar.opened)
const isLogo = computed(() => layoutMode.value === 'left' && showLogo.value)
</script>

<style lang="scss" scoped>
@mixin tip-line {
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background-color: var(--sidebar-menu-tip-line-bg-color);
  }
}

.has-logo {
  .el-scrollbar {
    height: calc(100% - var(--header-height));
  }
}

.el-scrollbar {
  height: 100%;
  :deep(.scrollbar-wrapper) {
    // 限制水平宽度
    overflow-x: hidden !important;
    .el-scrollbar__view {
      height: 100%;
    }
  }
  // 滚动条
  :deep(.el-scrollbar__bar) {
    &.is-horizontal {
      // 隐藏水平滚动条
      display: none;
    }
  }
}

.el-menu {
  border: none;
  min-height: 100%;
  width: 100% !important;
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title),
:deep(.el-sub-menu .el-menu-item) {
  height: var(--sidebar-menu-item-height);
  line-height: var(--sidebar-menu-item-height);
  &.is-active,
  &:hover {
    background-color: var(--sidebar-menu-hover-bg-color);
  }
  display: block;
  * {
    vertical-align: middle;
  }
}

:deep(.el-menu-item) {
  &.is-active {
    @include tip-line;
  }
}

.el-menu--collapse {
  :deep(.el-sub-menu) {
    &.is-active {
      .el-sub-menu__title {
        color: var(--sidebar-menu-active-text-color) !important;
        @include tip-line;
      }
    }
  }
}
</style>
