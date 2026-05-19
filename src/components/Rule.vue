<script lang="ts" setup>
const { isShowRule } = defineProps({
    isShowRule: Boolean
})

const emit = defineEmits(['closeRule'])

const closeRule = () => {
    emit('closeRule')
}
</script>

<template>
    <div class="z" v-show="isShowRule">
        <div class="rule-box">
            <img src="@/assets/r_rule.png" alt="" class="rule-title" />
            <div class="rule-center">
                <div class="rule-content">
                    <div>
                        <strong>活动时间:</strong>
                        2023年2月7日-6月30日
                    </div>
                    <div>
                        <strong>活动对象:</strong>
                        广东移动用户（不含副卡移动用户，不含来电视频秘书订购用户）
                    </div>
                    <!-- </ br> -->
                    <div>
                        <strong>活动说明:</strong>
                        <br />
                        1、来电视频秘书是中国移动和留言业务的升级版，办理业务后，将由视频AI机器人为您提供可视化的电话智能代接服务。
                    </div>
                    <div>
                        2、已办理和留言或来电提醒产品的用户，办理来电视频秘书升级套餐资费为3元/月，升级套餐包含来电视频秘书权益，未办理和留言、来电提醒产品的用户，办理来电视频秘书组合套餐资费为6元/月，组合套餐包含和留言与来电视频秘书权益，办理立即扣费，立即生效，生效周期为自然月，如不主动退订，将自动连续包月。
                    </div>
                    <div>
                        3、活动期间内，办理来电视频秘书3元升级套餐将获得2GB国内通用流量，办理来电视频秘书6元包将获得5GB国内通用流量，流量24小时内生效，有效期7天，不可享受流量共享、流量转赠和流量不清零服务。
                    </div>
                    <div>
                        4、以下情况不能享受此流量优惠活动：非广东移动客户、限定客户、2G/3G不限量套餐客户、4G随心王套餐客户、和多号的副号、一卡双号副号、家庭服务计划副号、万能副卡等附属号码客户、集团代付/对公托收（如政企动力100行业卡）客户、集团全额统付号码、万花筒客户、手机状态异常（停机、销户、欠费、转品牌未生效等状态）号码。如需办理，需先主动取消以上套餐生效后方可办理。
                    </div>
                    <div>
                        5、活动期间内，用户成功办理来电视频秘书后未超过1分钟（≤60秒）退订业务，则无法享受流量优惠活动。
                    </div>
                    <div>
                        6、活动有效期内，每个用户每个月（自然月）仅能参与一次本此流量优惠活动，使用同一台手机为多个号码办理产品时，仅前5个号码可享受流量优惠活动。
                    </div>
                    <div>
                        7、办理来电视频秘书产品后，如需关闭视频秘书代接，请到“和留言来电秘书”小程序关闭服务；如需退订该业务，可发送0000到10086根据提示进行操作，或致电10086客服进行退订，退订立即生效。
                    </div>
                    <div>
                        8、办理来电视频秘书后，AI代接电话过程中，来电主叫方手机需支持高清视频通话（iPhone手机不支持），并处于良好网络环境下，则可与AI进行视频交互，否则仅可进行语音交互。
                    </div>
                    <div>
                        9、产品升级套餐、组合套餐分别有A、B两款，其中，A款包含的秘书形象为晓璇、躺倒鸭等，B套餐包含的秘书形象为EGD战队、助理小花等；AB两款产品互斥，用户在同一时间只能选择其中一款产品进行订购，用户订购一款产品后，如需更换另一款产品，则需要发送0000到10086先退订当前产品后再重新订购另一款产品。
                    </div>
                    <div>
                        10、如需了解详细活动内容，请详询中国移动10086客服。
                    </div>
                </div>
            </div>
        </div>
        <img
            src="@/assets/btn_close.png"
            alt=""
            class="z-close"
            @click="closeRule"
        />
    </div>
</template>

<style lang="less" scoped>
.rule-box {
    width: 640px;
    height: 820px;
    background: #ffffff;
    border: 4px solid #a9d8fc;
    border-radius: 24px;
    position: relative;
    padding-top: 76px;

    .rule-title {
        width: 352px;
        height: 64px;
        position: absolute;
        top: -9px;
        left: 50%;
        transform: translateX(-50%);
    }

    .rule-center {
        width: 567px;
        height: 707px;
        margin: 0 auto;
        overflow: hidden;

        .rule-content {
            width: 567px;
            height: 707px;
            overflow-y: scroll;
            color: #0f2944;
            font-size: 28px;
            line-height: 40px;
        }
    }
}

.rule-close {
    width: 64px;
    height: 64px;
}
</style>
