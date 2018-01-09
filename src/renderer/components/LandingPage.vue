<template>
    <el-button plain @click="click">朴素按钮</el-button>
</template>

<script>
  const { ipcRenderer } = require('electron');

  export default {
    name: 'landing-page',
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
