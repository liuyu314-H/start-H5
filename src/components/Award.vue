<template>
    <div class="z" v-show="isAward">
        <div class="a-container">
            <div class="a-title1">
                {{
                    awardType == 1 ? '恭喜您成功领取' : '您已领取过'
                }}和留言视频秘书
                <span>30天体验期</span>
            </div>
            <div class="a-title2">
                长按识别二维码添加客服，备注
                <span>【内测】</span>
            </div>
            <div class="a-title3">加入内测群有机会赢惊喜礼品!</div>
            <!-- <img src="@/assets/erweima.png" alt="" class="a-erweima" /> -->
        </div>
        <img
            src="@/assets/btn_close.png"
            alt=""
            class="z-close"
            @click="closeAwardDialog"
        />
    </div>
</template>

<script setup lang="ts">
const { isAward, awardType } = defineProps({
    isAward: Boolean,
    awardType: Number //1成功领取 2领取过
})

const emit = defineEmits(['closeAwardDialog'])

const closeAwardDialog = () => {
    emit('closeAwardDialog')
}
</script>

<style lang="less" scoped>
.a-container {
    width: 640px;
    height: 560px;
    background: #ffffff;
    border: 4px solid #a9d8fc;
    border-radius: 24px;
    text-align: center;
    padding-top: 66px;
    .a-title1 {
        font-size: 28px;
        margin-bottom: 34px;
        span {
            color: #e40077;
        }
    }
    .a-title2 {
        font-size: 30px;
        span {
            font-weight: bold;
        }
    }
    .a-title3 {
        font-size: 30px;
        margin-bottom: 24px;
    }
    .a-erweima {
        width: 268px;
        height: 268px;
    }
}
</style>
