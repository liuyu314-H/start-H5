<template>
    <div>
        <div class="notSuccess-o">
            <img src="@/assets/img/idolTelephone/eo.png" alt="" />
        </div>
        <div class="notSuccess-t fs-16 strong-500">{{ props.name }}</div>
        <div class="notSuccess-t fs-16">{{ props.text }}</div>
        <div class="notSuccess-f" @click="handelOK">知道了</div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['notShow'])
const props = defineProps({
    name: {
        type: String
    },
    text: {
        type: String
    }
})
// 建设中
const handelOK = () => {
    emit('notShow', false)
}
</script>

<style lang="less" scoped>
.notSuccess-o {
    width: 228px;
    height: 228px;
    // background-color: #256fff;
    margin: 60px auto 30px auto;
    img {
        width: 100%;
    }
}
.notSuccess-t {
    width: 100%;
    text-align: center;
    margin: 0 0 10px 0;
}
.notSuccess-f {
    width: 464px;
    height: 92px;
    text-align: center;
    background-color: #256fff;
    border-radius: 60px;
    line-height: 92px;
    margin: 0 auto;
    color: #fff;
    margin-top: 22px;
    margin-bottom: 48px;
}
</style>
