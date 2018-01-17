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
  import EventBus from '../eventBus';

  const style = 'background-color: @color@;' +
    'grid-column-start: @column-start@;' +
    'grid-column-end: @column-end@;' +
    'grid-row-start: @row-start@;' +
    'grid-row-end: @row-end@;' +
    'background-image: url(@image@);' +
    'background-size: cover;' +
    'text-align: center;';

  let currentPage = 0;

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
    array.push((parseInt(index / colNum, 10) * 2) + 2);
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
      currentPage = 1;
      ipcRenderer.send('videos', 0, 11);
      let images = [];
      ipcRenderer.on('replayVideos', (evt, items) => {
        images = items;
        const newItems = [];
        for (let i = 0; i < 12; i += 1) {
          const array = getColRow(i, 4);
          newItems.push(createStyle('#404', array[0], array[1], array[2], array[3], images[i]));
        }
        this.items = newItems;
      });

      EventBus.$on('event_page_changed', (page) => {
        if (page !== currentPage) {
          ipcRenderer.send('videos', (page - 1) * 12, ((page - 1) * 12) + 11);
          currentPage = page;
        }
      });
    },
  };
</script>

<style>
  .wrapper {
    display: grid;
    padding: 4vh 1vw;
    grid-template-columns: 20vw 1vw 20vw 1vw 20vw 1vw 20vw;
    grid-template-rows: 20vh 1vh 20vh 1vh 20vh;
  }

  .image {
    width: 100%;
    height: 100%;
  }
</style>