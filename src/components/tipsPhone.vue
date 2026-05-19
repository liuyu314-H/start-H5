<!--
 * new page
 * @author: FuJing
 * @since: 2022-11-22
 * windowWarning.vue
-->
<template>
    <div class="remind">
        <div class="remind-ts fs-18">输入手机号码</div>
        <van-icon class="icon" name="cross" @click="handelDel" />
        <div class="remind-xq fs-16">
            <van-cell-group inset>
                <van-field
                    v-model="data.username"
                    placeholder="请输入手机号码"
                    class="textData"
                />
                <van-field
                    v-model="data.verification"
                    placeholder="请输入短信验证码"
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
            </van-cell-group>
        </div>
        <div class="remind-bon" @click="warningOK">确定</div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
// import { reqLoginsendsms, reqLoginverifySms } from '@/utils/request/api'
import 'vant/es/toast/style'
const router = useRouter()

const emit = defineEmits(['phonisShow'])

const verificationShow = ref(true)
const verificationData = ref(60)
const data: any = reactive({
    username: '',
    verification: ''
})
// 获取验证码
const Verification = () => {
    console.log('获取验证码')
    // reqLoginsendsms(data.username)
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
const handelDel = () => {
    emit('phonisShow', { isShow: false, phon: '关闭' })
}
const warningOK = () => {
    if (data.username && data.verification !== '') {
        // reqLoginverifySms(data.username, data.verification).then((res: any) => {
        //     if (res.code === 200) {
        //         emit('phonisShow', { isShow: false, phon: data.username })
        //     } else {
        //         Toast.fail('验证码错误！')
        //     }
        // })
    } else {
        Toast.fail('请输入手机号和验证码')
    }
}
</script>

<style lang="less" scoped>
.remind {
    padding: 40px 0 40px 0;
    position: relative;
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
.textData {
    font-size: 36px;
    line-height: 80px;
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
.icon {
    position: absolute;
    left: 630px;
    top: 20px;
    font-size: 36px;
}
</style>
