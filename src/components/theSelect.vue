<template>
    <div class="theRadio">
          <ul >
            <li v-for="(item,$index) in optionList" @click="selectOption(item,$index)">
              <span :class="{active: item.selected}">{{item.name}}</span><i v-show="item.selected" class="icon iconfont icon-duihao"></i>
            </li>
          </ul>
    </div>
</template>

<script>
    export default {
      props: ['optionList','index']
      ,
      methods: {
        //点击li
        selectOption(item,index){
          this.$emit('select', {index: index,parentIndex:this.index})
        },
      },
      created() {

      }
    }
</script>

<style scoped lang="scss">
  .theRadio{
    position: absolute;
    z-index: 10;
    width: 228px;
    background: #fff;
    box-shadow: 0px 0px 6px #ddd;
    border-radius:4px;
    ul{
      padding:0 20px;
      li{
        padding: 10px 0;
        span{
          &.active{
             color: #017ae6;
           }
        }
        i{
          font-size: 14px;
          color: #017ae6;
        }
        &:hover{
          color: #017ae6;
         }
      }
    }
  }

</style>
