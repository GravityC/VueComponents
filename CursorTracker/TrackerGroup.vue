<template>
  <ul class="trackerGroups">
    <cursor-tracker v-for="item in trackers" :texts="item.texts" :key="item.id" :mousePos="mousePos"></cursor-tracker>
  </ul>
</template>

<script>
  import CursorTracker from './CursorTracker.vue'
  export default {
    data(){
      return {
        mousePos:{
          x:'',
          y:'',
        },
        trackers:[]
      }
    },
    created(){
      //构造trackers数组, 以下是测试用代码
      let mytexts = {
        C:'Hi',
        N:'↑',
        S:'↓',
        W:'←',
        E:'→',
        NE:'↗',
        NW:'↖',
        SE:'↘',
        SW:'↙',
      };
      for (let i =0; i<15; i++) {
        this.trackers.push({
          id:i,
          texts:mytexts
        })
      }
    },
    mounted(){
      window.onmousemove = function (event) {
        this.mousePos.x = event.pageX;
        this.mousePos.y = event.pageY;
      }.bind(this);
    },
    components:{
      CursorTracker,
    }
  }
</script>

<style scoped>
  .trackerGroups{
    margin:0 auto;
    width:1000px;
  }
</style>
