<!--
 * new page
 * @author: FuJing
 * @since: 2022-11-19
 * notSuccess.vue
-->
<template>
  <div>
    <!-- <p @click="show = true">aaa</p> -->
    <van-overlay :show="props.isShow">
      <div class="wrapper" @click.stop>
        <div class="block">
          <slot></slot>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  isShow: {
    type: Boolean
  }
})
const show = ref(false)
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 686px;
  // height: 578px;

  background-color: #fff;
  border-radius: 28px;
}
</style>
