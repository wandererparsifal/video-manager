<template>
  <div>
    <el-button plain @click="click">朴素按钮</el-button>
    {{msg}}
    <img src="../assets/logo.png"/>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'; // eslint-disable-line

  export default {
    name: 'grids',
    data() {
      return {
        msg: '',
      };
    },
    methods: {
      click() {
        ipcRenderer.send('somemsg', 'data');
      },
    },
    created() {
      ipcRenderer.on('replaymsg', (evt, otherData) => {
        console.log(otherData);
        this.msg = otherData;
      });
    },
  };
</script>

<style>

</style>