<template>
  <li class="tracker">
    {{text}}
  </li>
</template>
<script>
  export default {
    props:['texts', 'mousePos'],
    data(){
      return{
        pos:{
          x:'',
          y:'',
        },
        text:'',
      }
    },
    watch:{
      mousePos:{
        handler(){
          let dir = this.getDir();
          this.text = this.texts[dir];
        },
        deep:true
      },
    },
    methods:{
      getDir(){
        let x = this.mousePos.x - this.pos.x;
        let y = this.mousePos.y - this.pos.y;
        if( Math.abs(x) <= 30 && Math.abs(y) <= 30){
          return 'C';
        }
        let tan = y/x;
        let radina = Math.atan(tan);
        let angle = Number((180 / (Math.PI / radina)).toFixed(1));
        //确定mousePos是否在坐标轴上,若是直接返回方向
        if (x === 0) {
          return y > 0 ? 'S' : 'N';
        }
        if (y === 0) {
          return x > 0 ? 'E' : 'W';
        }
        //确定象限
        let quadrant;
        if(x > 0) {
          quadrant = y > 0 ? 1 : 4;
        }else {
          quadrant = y > 0 ? 2 : 3;
        }
        //确定方向
        switch (quadrant) {
          case 1:
            if(angle > 0 && angle <= 22.5) {
              return 'E';
            }else if (angle > 22.5 && angle <= 67.5) {
              return 'SE';
            }else {
              return 'S';
            }
          case 2:
            if(angle < 0 && angle >= -22.5) {
              return 'W';
            }else if(angle < -22.5 && angle >= -67.5) {
              return 'SW';
            }else {
              return 'S';
            }
          case 3:
            if(angle > 0 && angle <= 22.5) {
              return 'W';
            }else if (angle > 22.5 && angle <= 67.5) {
              return 'NW';
            }else {
              return 'N';
            }
          case 4:
            if(angle < 0 && angle >= -22.5) {
              return 'E';
            }else if (angle < -22.5 && angle >= -67.5) {
              return 'NE';
            }else {
              return 'N';
            }
        }
      }
    },
    mounted(){
      this.pos.x = this.$el.offsetLeft + this.$el.offsetWidth/2;
      this.pos.y = this.$el.offsetTop + this.$el.offsetHeight/2;
    }
  }
</script>

<style scoped>
  .tracker{
    box-sizing:border-box;
    display: inline-block;
    float:left;
    margin-left:20px;
    margin-top:20px;
    border:1px solid black;
    width:190px;
    height:190px;
    text-align: center;
    line-height:190px;
  }
</style>
