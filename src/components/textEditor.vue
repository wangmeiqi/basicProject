<template>
    <div>
      <div id="editor" ref="editor"></div>
    </div>
</template>

<script>
  import WangEditor from 'wangeditor'
  import api from '../api/http'
  export default {
    props:["beiContent","childrenFlag","childrenId","noteBox"],
    data(){
      return{
          beizhu:'',
      }
    },
    methods:{
        getData(){

          let that = this
          this.editor = new WangEditor('#editor')  //这个地方传入div元素的id 需要加#号
          // 配置 onchange 事件
          this.editor.change = function () {
            // 编辑区域内容变化时，实时打印出当前内容
            this.beizhu=this.txt.text()
            sessionStorage.setItem("beizhu",this.beizhu)
            console.log(this.beizhu);
          }
          this.editor.create()     // 生成编辑器

          this.editor.txt.html(this.beiContent)  //注意：这个地方是txt  不是官方文档中的$txt
          this.editor = new WangEditor('#WangEditor')
        }
    },
    watch:{
      noteBox(){
        this.getData()
      },
      childrenFlag(){
        let params = {
          id: this.childrenId
        }
        api.get('/task/getOneTask', params).then(res=>{
          console.log(res);
          res.data.data.fieldList.map(el => {
            if(el.name == '备注') {
              if(el.taskAndFieldList.length > 0) {
                this.beiContent = el.taskAndFieldList[0].content
                console.log(this.beiContent,'非空');
              }
              else if(el.taskAndFieldList.length == 0) {
                this.beiContent = '待添加'
                console.log(this.beiContent,'空')
              }
            }
          })
        })
      }
    }
  }



</script>

<style scoped>
  #account--editor {
    width: 100%;
    min-height: 330px;
    height: auto;
  }
</style>
