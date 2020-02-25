<template>
  <div id="app">
    <navigation/>
    <div class="route">
      <router-view/>
    </div>
  </div>
</template>

<script>

import navigation from '@/components/navigation.vue'

export default {
  name: 'app',
  components: {
    navigation
  }
}
</script>

<style lang="scss">
//引入公共样式
@import "./sass/common.scss";
.route{
  @include bothSidePadding;
}
</style>
