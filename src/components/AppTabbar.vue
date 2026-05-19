<!--
 * new page
 * @author: zhaoyahui
 * @since: 2022-09-11
 * AppTabbar.vue
-->
<template>
    <!-- tabBar -->
    <van-tabbar>
        <van-tabbar-item
            v-for="item in TabBar"
            :key="item.index"
            :icon="item.icon"
            :to="item.path"
        >
            {{ item.name }}
        </van-tabbar-item>
        <!-- <van-tabbar-item icon="search">标签</van-tabbar-item>
    <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
    <van-tabbar-item icon="setting-o">标签</van-tabbar-item> -->
    </van-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const TabBar = ref([
    { name: '首页', index: 0, icon: 'home-o', path: '/idolTelephone' },
    { name: '首页1', index: 1, icon: 'search', path: '/indexTow' },
    { name: '首页2', index: 2, icon: 'friends-o', path: '/indexThree' },
    { name: '首页3', index: 3, icon: 'setting-o', path: '/indexFo' }
])
</script>

<style lang="less" scoped></style>
