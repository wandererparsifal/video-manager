<template>
  <div>
    <div class="wrapper">
      <div class="box a">
        <img src="../assets/logo.png" class="image">
      </div>
      <div class="box b">
        <img src="../assets/logo.png" class="image">
      </div>
      <div class="box c">
        <img src="../assets/logo.png" class="image">
      </div>
      <div class="box d">
        <img src="../assets/logo.png" class="image">
      </div>
      <div class="zoomImage e" :style="'background-image: url(../../static/290580.jpg)'">
        <img src="../assets/logo.png" class="image">
      </div>
      <div class="zoomImage f" :style="'background-image: url(../../static/forest-3840x2400-sunset-fox-4k-15517.jpg)'">
        <img src="../assets/logo.png" class="image">
      </div>
      <div class="box g">
        <img src="../assets/logo.png" class="image">
      </div>
      <div class="box h">
        <img src="../assets/logo.png" class="image">
      </div>
    </div>
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

  .wrapper {
    background-color: #f0f9eb;
    display: grid;
    padding: 1vw;
    grid-template-columns: 20vw 1vw 20vw 1vw 20vw 1vw 20vw;
    grid-template-rows: 20vh 1vh 20vh 1vh 20vh;
  }

  .box {
    background-color: #444;
    text-align: center;
  }

  .a {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
  }

  .b {
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 2;
  }

  .c {
    grid-column-start: 5;
    grid-column-end: 6;
    grid-row-start: 1;
    grid-row-end: 2;
  }

  .d {
    grid-column-start: 7;
    grid-column-end: 8;
    grid-row-start: 1;
    grid-row-end: 2;
  }

  .e {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 3;
    grid-row-end: 4;
  }

  .f {
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 3;
    grid-row-end: 4;
  }

  .g {
    grid-column-start: 5;
    grid-column-end: 6;
    grid-row-start: 3;
    grid-row-end: 4;
  }

  .h {
    grid-column-start: 7;
    grid-column-end: 8;
    grid-row-start: 3;
    grid-row-end: 4;
  }

  .image {
    width: 100%;
    height: 100%;
  }

  .zoomImage {
    background-size: cover
  }
</style>