<template>
  <el-container id="container_root">
    <div id="div_header">
      <carousel id="carousel"/>
    </div>
    <el-container id="container_body">
      <el-aside>
        <div class="menu_layout">
          <el-menu
                  default-active="1"
                  class="el-menu-vertical-demo"
                  background-color="#EFF3F5"
                  text-color="#708090"
                  active-text-color="#00BFFF"
                  @select="menuSelected">
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
        </div>
      </el-aside>
      <el-main>
        <component :is="currentView"/>
        <el-pagination
                class="pagination"
                v-on:current-change="pageChanged"
                :current-page.sync="currentPage"
                layout="prev, pager, next, jumper"
                :page-size="1"
                :total="50"
                v-show="showPagination">
        </el-pagination>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Carousel from './Carousel';
  import Grids from './Grids';
  import Detail from './Detail';
  import EventBus from '../eventBus';

  export default {
    name: 'main-page',
    components: { Carousel, Grids, Detail },
    data() {
      return {
        currentPage: 1,
        currentView: Grids,
        showPagination: true,
      };
    },
    methods: {
      menuSelected(index) {
        console.log(index);
      },
      pageChanged() {
        EventBus.$emit('event_page_changed', this.currentPage);
      },
    },
    created() {
      EventBus.$on('item_click', (data) => {
        console.log(data);
        this.currentView = Detail;
        this.showPagination = false;
      });
      EventBus.$on('detail_back', () => {
        this.currentView = Grids;
        this.showPagination = true;
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
    background-color: #F9F9F9;
    flex: 15;
  }

  .el-main {
    padding: 0;
    background-color: #F9F9F9;
    flex: 85;
  }

  .grids {
    height: 70vh;
    background-color: #b3e19d;
  }

  .pagination {
    text-align: center;
    margin-top: 3vh;
  }

  .menu_layout {
    width: 14vw;
    height: 100%;
    background-color: #EFF3F5;
    box-shadow: 0.1vw 0 1vw #999999;
  }
</style>
