<template>
    <el-button plain @click="click">朴素按钮</el-button>
</template>

<script>
  import { ipcRenderer } from 'electron';

  export default {
    name: 'main-page',
    methods: {
      click() {
        ipcRenderer.send('somemsg', 'data');
      },
    },
    created() {
      ipcRenderer.on('replaymsg', (evt, otherData) => {
        console.log(otherData);
      });
    },
  };
</script>

<style>
</style>
