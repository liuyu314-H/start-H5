<!--
 * new page
 * @author: FuJing
 * @since: 2022-11-20
 * telephoneIntroduce.vue
 *来电介绍
-->
<template>
  <div class="box">
    <img src="@/assets/img/Exclusivevideo/laidianjiesao.png" alt="" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const data = reactive({})
const router = useRouter()
</script>

<style lang="less" scoped>
.box {
  // width: 708px;
  height: 325px;
  background-color: #fff;
  padding: 24px;
  margin-bottom: 100px;
  img {
    width: 100%;
  }
}
</style>
