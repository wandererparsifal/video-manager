<template>
  <el-container id="container_root">
    <div id="div_header">
      <carousel id="carousel"/>
    </div>
    <el-container id="container_body">
      <el-aside>
        <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                background-color="#fa9631"
                text-color="#3d3d3d"
                active-text-color="#ffffff"
                @select="menu_select">
          <el-menu-item-group>
            <el-menu-item index="1">
              <i class="el-icon-location"></i>
              <span slot="title"><b>导航一</b></span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title"><b>导航二</b></span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title"><b>导航三</b></span>
            </el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-aside>
      <el-main>
        <el-button plain @click="click">朴素按钮</el-button>
        {{msg}}
        <img src="../assets/logo.png"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import { ipcRenderer } from 'electron'; // eslint-disable-line
  import Carousel from './Carousel';

  export default {
    name: 'main-page',
    components: { Carousel },
    data() {
      return {
        msg: '',
        img: '',
      };
    },
    methods: {
      click() {
        ipcRenderer.send('somemsg', 'data');
      },
      menu_select(index) {
        console.log(index);
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
  #container_root {
    display: flex;
    flex-flow: column;
    height: 100vh;
    width: 100vw;
  }

  #div_header {
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
