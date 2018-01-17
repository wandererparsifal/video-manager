<template>
  <div>
    <el-carousel :interval="5000" indicator-position="none" height="20vh">
      <el-carousel-item v-for="item in images" :key="item">
        <div style="position:relative;cursor:pointer" @click="handleItemClick(item)">
          　　<img :src="item"/>
          <h3 style="position:absolute; z-index:2; ; left: 0; top: 0; right: 0; bottom: 0; margin: auto;">{{item}}</h3>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'; // eslint-disable-line

  export default {
    name: 'carousel',
    methods: {
      handleItemClick(data) {
        console.log(data);
      },
    },
    data() {
      return {
        images: [],
        height_carousel: '0px',
      };
    },
    created() {
      ipcRenderer.send('carousel');
      ipcRenderer.on('replay_carousel', (evt, data) => {
        // console.log(data);
        if (data instanceof Array) {
          this.images = data;
        }
      });
    },
  };
</script>

<style>
  .el-carousel__item h3 {
    color: #ffffff;
    font-size: 42px;
    opacity: 1;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
