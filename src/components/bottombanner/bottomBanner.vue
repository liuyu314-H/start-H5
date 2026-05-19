<!--
 * new page
 * @author: FuJing
 * @since: 2022-11-21
 * bottomBanner.vue
-->
<template>
    <van-sticky>
        <div class="box">
            <div class="box-1" @click="handelOk">
                {{ props.bottomData.name }}
            </div>
        </div>
    </van-sticky>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
// const data = reactive({})
const router = useRouter()

const props: any = defineProps({
    bottomData: {
        type: Object,
        name: {
            type: String
        },
        path: {
            type: String
        }
    }
})
const handelOk = () => {
    console.log('跳转')
    console.log(props.bottomData)
    router.push(props.bottomData.path)
}
</script>

<style lang="less" scoped>
.box {
    width: 690px;
    // background-color: #256fff;
    height: 172px;
    background: url('@/assets/img/Exclusivevideo/jb.png');
    background-size: cover;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    &-1 {
        width: 630px;
        height: 92px;
        background-color: #256fff;
        border-radius: 60px;
        line-height: 92px;
        text-align: center;
        color: #fff;
    }
}
</style>
