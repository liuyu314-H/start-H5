<template>
    <div class="input">
        <van-cell-group inset>
            <van-field
                v-model="data.username"
                placeholder="请输入手机号码"
                class="textData"
            />
            <van-field
                v-model="data.pasword"
                placeholder="请输入短信验证码"
                v-if="props.id == 2"
                class="textData"
            >
                <template #button>
                    <span
                        class="Verification"
                        size="small"
                        type="primary"
                        @click="Verification"
                        v-show="verificationShow"
                    >
                        获取验证码
                    </span>
                    <span v-show="!verificationShow" class="Verification">
                        {{ verificationData }}s
                    </span>
                </template>
            </van-field>
            <van-field disabled />
        </van-cell-group>
        <van-button
            :disabled="
                props.id == 1
                    ? data.username === ''
                        ? true
                        : false
                    : data.username === '' || data.pasword == ''
                    ? true
                    : false
            "
            type="primary"
            size="large"
            :class="[data.username === '' ? 'login opacity' : 'login']"
            @click="loginButton"
        >
            <span v-if="props.id == 1">快捷登录</span>
            <span v-if="props.id == 2">立即登录</span>
            <img src="@/assets/img/login/icon_bt_suc.png" alt="" />
        </van-button>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'

// 接口
// import { adminLoginApi } from '@/utils/request/api'

const props = defineProps({
    id: {
        type: Number,
        default: 1
    }
})
const emit = defineEmits(['loginData'])
const verificationShow = ref(true)
const verificationData = ref(60)
const data = reactive({
    username: '',
    pasword: ''
})
// 获取验证码
const Verification = () => {
    console.log('获取验证码')
    verificationShow.value = false
    const tiem = setInterval(() => {
        verificationData.value--
        if (verificationData.value <= 0) {
            verificationShow.value = true
            verificationData.value = 60
            clearInterval(tiem)
        }
    }, 1000)
}
// 点击登入
const loginButton = () => {
    // adminLoginApi().then((res) => {
    //   console.log(res)
    //   router.push('/idolTelephone')
    // })
    console.log('我是子组件', { ...data })
    emit('loginData', { ...data })
}
watch(props, newData => {
    if (newData.id === 1) {
        data.pasword = ''
        data.username = ''
    } else {
        data.username = ''
    }
})
</script>

<style lang="less" scoped>
.input {
    .textData {
        font-size: 36px;
        line-height: 80px;
    }
}
.login {
    height: 96px;
    width: 590px;
    border-radius: 48px;
    background: url('@/assets/img/login/bt.png');
    background-size: cover;
    line-height: 96px;
    color: #fff;
    font-size: 32px;
    margin-left: 80px;
    img {
        position: absolute;
        width: 32px;
        height: 32px;
        margin: 32px 32px 32px 152px;
    }
}
.opacity {
    opacity: 0.5;
}
.Verification {
    font-family: PingFang SC;
    font-size: 36px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0px;
    text-align: left;
    color: #256fff;
}
</style>
