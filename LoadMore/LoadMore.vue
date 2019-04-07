<style scoped lang="less" type="text/less">

</style>
<template>
  <div>
  </div>
</template>
<script>
  export default {
    props: {
      url: {
        type: String,
        required: true,
      },
      page:{
        type:Number,
        required:true,
      },
      params: Object,
      callback: {
        type: Function,
        required: true,
      },
      noListen: Boolean, //是否监听滚动事件
    },
    data(){
      return {
        busy: false,
      }
    },
    methods: {
      loadMore(){
        this.busy = true;
        //  console.log('开始加载');
        let params = {page: this.page + 1};
        if(this.params) {
          params = Object.assign(params, this.params);
        }
        // 接下来写ajax方法，下面是自己封装好的axios的ajax方法

        /*this.$post(this.url, params)
          .then(res => {
            this.busy = false;  //必要
            console.log(res);
            if (res.errcode == 0) {
              this.callback(res.content);
            } else {
              errback(res);
            }
          })*/
      },
      doScroll(){
        if (this.noListen || this.busy) {
          return;
        }
        if (Math.ceil(window.scrollY) + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
          this.loadMore();
        }
      }
    },
    mounted(){
      window.addEventListener('scroll', this.doScroll);
    },
    components: {}
  }
</script>
