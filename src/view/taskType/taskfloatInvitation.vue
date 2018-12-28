<template>
    <div>
      <el-dialog
        title="添加成员至项目"
        :visible.sync="addBackground"
        width="400px"
        center>
        <span>
           <div  class="personnelFloat" >
             <div>

              <div class="inputPersonnel">
                <div>
                  <div class="invitation">
                    账号邀请
                  </div>
                  <!--<div style="position: absolute;right: 0; top: 0;color: #1e88e5;cursor: pointer;">
                    <span><i class="iconfont icon-erweima"></i></span>
                    <span>通过链接邀请</span>
                  </div>-->
                </div>
                <input type="text" v-model="search" placeholder="请输入你要添加的成员">
              </div>
              <div style="margin-top: 20px" >
                <div>
                  <span></span>
                  <div>合作过的成员</div>
                </div>
                <li v-for="(li ,index) in searchArray" class="inputPli">
                  <div>
                    <img v-if="li.user_img != ''" :src="li.user_img" alt="">
                    <div class="img" v-if="li.user_img == ''">{{li.username[0]}}</div>
                  </div>
                  <div style="margin-left: 16px">
                    <div class="f14">{{li.username}}</div>
                    <span class="f12">{{li.email}}</span>
                    <span class="linputSpan" @click="joinHandle(index)">加入</span>
                  </div>
                </li>
              </div>
            </div>
           </div>
        </span>
        <span slot="footer" class="dialog-footer"></span>
      </el-dialog>
    </div>
</template>

<script>
    import api from 'api/http'
    import headerUrl from 'assets/images/chengyuan.png'
//  import defaultImg from '../../assets/images/22登录_01.png'
    export default {
        name: "taskfloat-invitation",
        props:["addPersonnelBackground","invitation","taskFloat"],
        data(){
          return{
            search:'',  //搜索框
            invitationList:[],  //查找成员数组
            addBackground:false,
            searchArray:[],//搜索查找成员数组
            change:'',
          }
        },
        methods:{
          joinHandle(index) {
            let data = {
            	eid:sessionStorage.getItem("enterpriseId"),
                uid:this.invitationList[index].id,
                pid:sessionStorage.getItem('projectId')
            }
            api.post('/projects/addProUser', data).then(res => {
              this.searchArray.splice(index, 1)
              if (res.data.code == 200 ){
                this.change = index
                this.$notify({
                  title: '成功',
                  message: '添加成员成功',
                  type: 'success'
                })
              }
            })

          },

        },
        watch:{
          //弹框
          taskFloat(){
            this.addBackground =true
            if (this.addBackground == true){
              let parms = {eid:sessionStorage.getItem('enterpriseId'), pid: sessionStorage.getItem('projectId'),}
              api.get('/projects/getUsersByEid', parms).then(res => {
                this.invitationList = res.data.data
              })
            }

          },

          //弹框
          addPersonnelBackground(){
            this.addBackground =!this.addBackground
          },

          //监听父组建传递过来的邀请成员列表
          invitation(){
            this.invitationList =this.invitation
          },

          invitationList(){
            this.searchArray =  this.invitationList
          },

          //监听查找功能
          search(){
            this.searchArray =this.invitationList.filter(el=>{
              if(el.username .indexOf(this.search)!== -1 || el.email.indexOf(this.search) !== -1 ){
                return true
              }
            })
          }
        }
    }
</script>

<style scoped>
  .invitation{
    font-size: 14px;
    font-weight: 600;
    color: gray;
    cursor: pointer;
  }
  .inputPersonnel{
    position: relative;
    margin-top: 20px;
  }
  .inputPersonnel>input{
    width: 340px;
    height: 35px;
    margin-top: 20px;
    border-radius: 4px;
    border: 1px solid #e5e5e5;
    padding: 0 2px;
  }
  .f12{
    color: rgb(167, 167, 167);
    font-size: 12px;
  }
  .linputSpan{
    font-weight: 600;
    right: 5px;
    top: 11px;
    position: absolute;
    cursor: pointer;
    display: block;
    width: 50px;
    height: 25px;
    background:#4e99ff;
    text-align: center;
    color: #ffffff;
    border-radius: 4px;
  }
  .inputPli{
    display: flex;
    position: relative;
    align-items: center;
  }
  .inputPli>div>img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .f14{
    color: #333333;
    font-weight: 500;
    font-size: 14px;
  }
	.img{
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background: #ffae44;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
	}
</style>
