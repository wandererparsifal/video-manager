<template>
    <el-container id="container_root">
        <el-header>
            head
        </el-header>
        <el-container id="container_body">
            <el-aside>
            </el-aside>
            <el-main>
                <el-button plain @click="click">朴素按钮</el-button>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
  import {ipcRenderer} from 'electron'; // eslint-disable-line

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
    #container_root {
        display: flex;
        flex-flow: column;
        height: 100vh;
        width: 100vw;
    }

    .el-header {
        background-color: #f56c6c;
        color: #333;
        flex: 1;
    }

    #container_body {
        background-color: #F46515;
        color: #333;
        flex: 4;
    }

    .el-aside {
        background-color: #ACFF63;
        flex: 1;
    }

    .el-main {
        background-color: #66b1ff;
        flex: 4;
    }
</style>
