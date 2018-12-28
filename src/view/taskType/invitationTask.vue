<template>
    <div>
      <el-dialog
        title="邀请新成员"
        :visible.sync="invitation"
        width="360px"
        center>
        <span>
          <div>
            <div class="invitationBox">
              <div  class="invitationBox_title">
                <div style="font-weight: 600">账号邀请</div>
         <!--       <div class="invitationBox_titRight">
                  <div>
                    <i class="iconfont icon-erweima"></i>
                  </div>
                  <div>
                  通过群链接邀请
                  </div>
                </div>-->
              </div>
              <div style="margin-top: 10px">
                <el-input  icon="el-icon-search" v-model="searchInput" placeholder="输入关键字查找"></el-input>
              </div>
            </div>
            <div class="member">
              <div v-for="(members, index) in newInvitation" class="itemMember" >
                <div class="itemMember_img">
                  <img :src="members.user_img" alt="">
                </div>
                <div class="itemMember_Name">
                  {{members.username}}
                </div>
                <div class="itemMember_add" @click="addMebers(members,index)" >
                  <div >
                    添加
                  </div>
                </div>
              </div>
            </div>
          </div>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="invitation = false">取 消</el-button>
          <el-button type="primary" @click="invitation = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import api from 'api/http'

  export default {
        props:['invitationShow',],
        name: "invitation-task",
        data(){
          return{
            searchInput:'',
            invitation: false,
            members:[],
            newInvitation:[],
          }
        },
        methods:{
          addMebers(members,index){
            let data={
              pid: sessionStorage.getItem('projectId'),
              uid:members.id
            }
            api.post('/projects/addProUser',data)
              .then(res=>{
                this.$notify({
                  title: '成功',
                  message: '添加成功',
                  type: 'success'
                })
                this.getInvitation.splice(index,1)
              })
          }
        },
        computed: {
            ...mapGetters({
             getInvitation :'GET_GETINVITATION'
            }),
          },

        watch:{
          invitationShow(){
            this.invitation=!this.invitation
          },

          //监听Vuex
          getInvitation(){
            this.newInvitation=this.getInvitation
          },

          //查找
          searchInput(){
            this.newInvitation = this.getInvitation.filter(el=>{
              if (el.username.indexOf(this.searchInput) !== -1){
                return true
              }else if (el.email.indexOf(this.searchInput) !== -1){
                return true
              }
            })
          }
        },
    }
</script>

<style scoped>

  .invitationBox{
    padding: 15px 0;
    border-top: 1px solid #e5e5e5;
  }
  .invitationBox_title{
    display: flex;
    position: relative;
  }
  .invitationBox_titRight{
    font-weight: 600;
    display: flex;
    position: absolute;
    right: 0;
    color: #3da8f5;
  }
  .itemMember{
    display: flex;
    padding: 8px 0;
    height: 24px;
    align-items: center;
  }
  .itemMember_img>img{
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  .itemMember_Name{
    margin-left: 14px;
    font-size: 12px;
  }
  .itemMember_add{
    position: absolute;
    right: 27px;
  }
  .itemMember_add>div:hover{
    color: #ffffff;
    background: #3da8f5;
    border: 1px solid #3da8f5;

  }
  .itemMember_add>div{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    text-align: center;
    font-weight: 600;
    padding: 5px 5px;
    font-size: 14px;
    border-radius: 4px;
  }
</style>
