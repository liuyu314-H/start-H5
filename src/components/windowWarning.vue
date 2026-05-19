<!--
 * new page
 * @author: FuJing
 * @since: 2022-11-22
 * windowWarning.vue
-->
<template>
    <div class="remind">
        <div class="remind-ts fs-18">{{ props.warningData.title }}</div>
        <div class="remind-xq fs-16">
            {{ props.warningData.text }}
        </div>
        <div class="remind-bon" @click="warningOK">确定</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const warningShow = ref(false)
const props: any = defineProps({
    warningData: {
        type: Object
    }
})
const emit = defineEmits(['warningShow'])
const warningOK = () => {
    console.log(warningShow.value)
    emit('warningShow', false)
    if (props.warningData.title === '修改成功') {
        router.push('/idolTelephone')
    }
}
</script>

<style lang="less" scoped>
.remind {
    padding: 40px;
    &-ts {
        text-align: center;
        font-weight: 500;
        line-height: 48px;
    }
    &-xq {
        line-height: 48px;
        color: #666;
        margin-top: 32px;
    }
    &-bon {
        width: 464px;
        height: 92px;
        background-color: #256fff;
        color: #fff;
        text-align: center;
        line-height: 92px;
        border-radius: 60px;
        margin: 20px auto;
    }
}
</style>
