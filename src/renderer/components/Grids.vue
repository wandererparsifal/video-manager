<template>
  <div>
    <div class="wrapper">
      <div v-for="item in items" :key="item" :style="item">
        <img src="../assets/logo.png" class="image">
      </div>
    </div>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'; // eslint-disable-line

  const style = 'background-color: @color@;' +
    'grid-column-start: @column-start@;' +
    'grid-column-end: @column-end@;' +
    'grid-row-start: @row-start@;' +
    'grid-row-end: @row-end@;' +
    'background-image: url(@image@);' +
    'background-size: cover;' +
    'text-align: center;';

  function createStyle(color, columnStart, columnEnd, rowStart, rowEnd, image) {
    return style.replace('@color@', color)
      .replace('@column-start@', columnStart)
      .replace('@column-end@', columnEnd)
      .replace('@row-start@', rowStart)
      .replace('@row-end@', rowEnd)
      .replace('@image@', image);
  }

  function getColRow(index, colNum) {
    const array = [];
    array.push(((index % colNum) * 2) + 1);
    array.push(((index % colNum) * 2) + 2);
    array.push((parseInt(index / colNum, 10) * 2) + 1);
    console.log((parseInt(index / colNum, 10) * 2) + 1);
    array.push((parseInt(index / colNum, 10) * 2) + 2);
    console.log((parseInt(index / colNum, 10) * 2) + 2);
    return array;
  }

  export default {
    name: 'grids',
    data() {
      return {
        items: [],
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

      for (let i = 0; i < 12; i += 1) {
        const array = getColRow(i, 4);
        this.items.push(createStyle('#404', array[0], array[1], array[2], array[3], '../../static/556062.jpg'));
      }
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

  .image {
    width: 100%;
    height: 100%;
  }
</style>