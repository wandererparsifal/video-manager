<template>
  <div class="detail" @click="click">

  </div>
</template>

<script>
  import EventBus from '../eventBus';

  export default {
    name: 'detail',
    methods: {
      click() {
        EventBus.$emit('detail_back');
      },
    },
  };
</script>

<style>
  .detail {
    width: 100%;
    height: 100%;
    background-color: #45f4f9;
  }
</style>