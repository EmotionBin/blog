<template>
  <div class="homeCom">
    <div class="homeCom_content">
      <div ref="homeArticle_ref" v-highlight class="homeArticle_md"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  data(){
    return {
      homeArticle:''
    }
  },
  mounted() {
    //获取首页文章内容
    this.getHomeArticle();
  },
  methods:{
    getHomeArticle:function () {
      let that = this;
      $.ajax({
        url: `/api/articles/home/homePage.md`,
        type: "get",
        'Content-Type':'application/x-www-form-urlencoded',
        data: {

        },
        success:res => {
          if(res.status == 0) {
            console.log('请求异常');
            that.$message({
              message: res.data,
              type: 'error'
            });
            return;
          }
          //保存文章内容
          that.homeArticle = marked(res);
          const articleDom = that.$refs.homeArticle_ref;
          articleDom.innerHTML = that.homeArticle;
          //手动给a标签加上属性
          var aSymbol = articleDom.getElementsByTagName("a");
          for(let i = 0; i < aSymbol.length;i ++){
            aSymbol[i].setAttribute("target", "_blank");
          }
        }
      });
    }
  }
}
</script>

<style lang="scss">

// 注意style标签不能加scope，因为利用了innerHTML

.homeCom{
  width: 100%;
  height: 100%;
  @include articlePadding;
  &_content{
    width: 100%;
    height: 100%;
    //markdown渲染的文章的样式写在这里
    .homeArticle_md{
      //1.5倍的行高看起来更加舒服
      line-height: 1.5;
      a{
        color: $priBlue;
      }
      hr{
        border: none;
        height: 1px;
        background-color: #d2d2d2;
      }
    }
  }
}
</style>
