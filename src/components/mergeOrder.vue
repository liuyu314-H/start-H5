<!--
 * new page
 * @author: FuJing
 * @since: 2022-11-19
 * mergeOrder.vue
 * 组合订购
-->
<template>
    <div class="top fs-18">组合订购享受更多</div>
    <div class="box" @scroll="scrollEvent($event)">
        <div class="box-s flex-d">
            <div
                :style="{ width: 206 * (index + 1) + 'px' }"
                class="box-1"
                v-for="(item, index) in data.dataList"
                :key="index"
                @click="handelOK(item)"
            >
                <img :src="item.tx" alt="" />
                <div class="box-1-1">
                    <img :src="Group5" alt="" />
                </div>
                <div class="box-1-2 flex-p">
                    <span>{{ item.name }}</span>
                    <div class="box-1-2-1"><img :src="Group4" alt="" /></div>
                </div>
            </div>
        </div>
        <div class="load">
            <div
                class="load-1"
                :style="{ left: scrollEve * (40 / scrollWidth) + 'px' }"
            ></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
// import Group1 from '@/assets/img/idolTelephone/Mask Group2.png';
import Group2 from '@/assets/img/idolTelephone/b.png'
// import Group3 from '@/assets/img/idolTelephone/111.png';
import Group4 from '@/assets/img/idolTelephone/Group359.png'
import Group5 from '@/assets/img/idolTelephone/icon_checkbox_dis-1.png'
import Group6 from '@/assets/img/idolTelephone/b.png'
import Group7 from '@/assets/img/idolTelephone/c.png'
import Group8 from '@/assets/img/idolTelephone/a.png'

const scrollEve = ref(0)
const scrollWidth = ref(0)
const emit = defineEmits(['orderShow'])
const data = reactive({
    dataList: [
        { name: '韩先生', img: Group2, tx: Group6 },
        { name: '至尊宝', img: Group2, tx: Group7 },
        { name: '颖儿', img: Group2, tx: Group8 },
        { name: '韩先生', img: Group2, tx: Group6 },
        { name: '至尊宝', img: Group2, tx: Group7 },
        { name: '颖儿', img: Group2, tx: Group8 },
        { name: '韩先生', img: Group2, tx: Group6 },
        { name: '至尊宝', img: Group2, tx: Group7 }
    ]
})
const handelOK = (item: object) => {
    console.log('组合介绍', item)
    emit('orderShow', true)
}

const scrollEvent = (e: any) => {
    scrollEve.value = e.srcElement.scrollLeft
    scrollWidth.value = e.srcElement.scrollWidth
    console.log('最大宽', e.srcElement.scrollWidth)
    console.log('变化框', e.srcElement.scrollLeft)
    // let menuList = that.$refs.menuList
}
</script>

<style lang="less" scoped>
.top {
    color: #333333;
    margin-top: 52px;
    font-weight: 500;
}
.flex-d {
    display: flex;
}

.box {
    height: 264px;
    overflow-y: auto;
    // background-color: #256fff;
    margin-top: 28px;
    .box-s {
        .box-1 {
            // width: 182px;
            height: 226px;
            position: relative;
            margin: 0 35px 0 0;
            img {
                width: 100%;
            }
            &-1 {
                width: 182px;
                // background-color: aqua;
                img {
                    width: 36px;
                    height: 36px;
                    // background-color: #333333;
                    position: absolute;
                    right: 19px;
                    top: 12px;
                }
            }
            &-2 {
                width: 182px;
                height: 50px;
                // border-radius: 24px;
                // background-color: #ccc;
                background: url('@/assets/img/idolTelephone/text.png');
                background-size: contain;

                position: absolute;
                bottom: 20px;
                font-size: 26px;
                &-1 {
                    width: 40px;
                    height: 40px;
                    img {
                        width: 100%;
                    }
                }
            }
        }
    }
    .load {
        width: 96px;
        height: 8px;
        background-color: #c2c6de;
        border-radius: 24px;
        position: absolute;
        left: 326px;
        display: flex;
        &-1 {
            width: 50px;
            height: 8px;
            border-radius: 24px;
            background-color: #256fff;
            position: absolute;
        }
    }
}
/*滚动条样式*/

::-webkit-scrollbar {
    display: none;
}
</style>
