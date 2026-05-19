<template>
    <div class="box">
        <van-sticky>
            <van-nav-bar
                :title="props.headData"
                @click-left="onClickLeft"
                :placeholder="true"
            >
                <template #left>
                    <van-icon name="cross" size="18" style="color: #000" />
                </template>
            </van-nav-bar>
        </van-sticky>
    </div>
</template>

<script setup lang="ts">
// import { ref, reactive } from 'vue'
const props = defineProps({
    headData: {
        type: String,
        default: ''
    }
})

const onClickLeft = () => history.back()
</script>

<style lang="less" scoped>
.box {
    // position: fixed;
    // width: 100%;
    // top: 0;
}
:v-deep(.van-nav-bar__title) {
    font-family: PingFang SC;
}
</style>
