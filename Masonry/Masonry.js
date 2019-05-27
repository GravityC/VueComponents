Component({
  lifetimes: {
    attached() {

    }
  },
  properties: {
    list: Array,
    columnSpace: {  // 两列之间的间隙
      type:String,
      value:'20rpx'
    },  
  },
  data: {
    _list: [], // 处理后的数组
    renderIndex: 0, // 下次渲染的数组下标
  },
  observers: {
    'list' (n) {
      console.log('list', n)
      if (n) {
        if(n.length){
          this.render(n.length)
        }else{
          this.data.renderIndex = 0
          this.setData({
            _list:[]
          })
        }
      }
    }
  },
  methods: {
    render(length) {
      if(this.data.renderIndex === length) return

      const item = this.data.list[this.data.renderIndex]
      console.log(this.data.renderIndex, item)
      const query = this.createSelectorQuery().in(this)
      query.selectAll('.column-inner').boundingClientRect().exec(res => {
        res = res[0]
        item._columnPosition = res[0].height <= res[1].height ? 'left' : 'right'
        this.setData({
          _list:this.data._list.concat([item])
        }, () => {
          this.data.renderIndex++
          this.render(length)
        })
      })
    }
  }
})