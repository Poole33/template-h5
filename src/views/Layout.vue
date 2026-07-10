<template>
    <div class="content-box">
        <RouterView />
    </div>
    <!-- <van-tabbar v-model="active">
        <van-tabbar-item
            name="/home"
            to="/home"
            icon="home-o"
        >
            首页
        </van-tabbar-item>

        <van-tabbar-item icon="search">打卡</van-tabbar-item>

        <van-tabbar-item
            name="/mine"
            to="/mine"
            icon="friends-o"
        >
            我的
        </van-tabbar-item>
    </van-tabbar> -->
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

let active = ref(route.path)
</script>

<style lang="scss" scoped>
.content-box {
    height: calc(100vh - 50px);
    overflow-y: hidden;
    background: var(--theme-bgSecondary);
    padding: 10px;
    box-sizing: border-box;
}
</style>
