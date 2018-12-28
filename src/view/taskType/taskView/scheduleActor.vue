<!-- // 日程参与者模块 -->
<template>
<!--     <div class="actor">
        <p class="title">参与者</p>
        <ul class="item-wrap">
            <el-tooltip class="item" effect="dark" content="Mu" placement="top">
                <li class="item"></li>
            </el-tooltip>
            <div class="addMemberWrap">
                <el-tooltip class="item" effect="dark" content="添加参与者" placement="top">
                    <li class="item add iconfont icon-add" @click.stop="showList">
                    </li>
                </el-tooltip>
                <div class="addMember" v-show="listShow">
                    <div class="searchWrap">
                        <input type="text" class="search">
                    </div>
                    <ul class="selectList">
                        <li class="listItem">aaaa</li>
                        <li class="listItem">aaaa</li>
                        <li class="listItem">aaaa</li>
                        <li class="listItem">aaaa</li>
                        <li class="listItem">aaaa</li>
                        <li class="listItem">aaaa</li>
                        <li class="listItem">aaaa</li>
                        <li class="listItem">aaaa</li>
                        <li class="listItem">aaaa</li>
                    </ul>
                </div>
            </div>
        </ul>
    </div> -->
    <div class="row" style="flex-direction: column;align-items: flex-start;">
        <div>
            <span>参与者</span>
        </div>
        <div class="memberList">
            <img class="img" v-if="userMsg.img != ''" :src="userMsg.img"/>
            <div class="img" v-if="userMsg.img == '' && userMsg.name != ''">
                <i v-if="userMsg.name == ''" class="iconfont icon-wode"></i>
                <span v-if="userMsg.name !=''">{{userMsg.name[0]}}</span>
            </div>
            <div v-for="user in memberList">
                <img class="img" v-if="user.user_img != ''" :src="user.user_img"/>
                <div class="img" v-if="user.user_img == ''">
                    <i v-if="user.username == ''" class="iconfont icon-wode"></i>
                    <span v-if="user.username !=''">{{user.username[0]}}</span>
                </div>
            </div>
            <i class="iconfont icon-tianjia addUser" @click.stop="addUserBol" v-if="addParticipantFlage"></i>
            <memberlist :principalId="userMsg.id" @allmsg="getAllMsg" @send="reception" type="checked" :show="participantBol" :ids="checkIds" :taskId="NaN"></memberlist>
        </div>
    </div>
</template>
<script>
import memberlist from '../../../components/memberList'
import API from 'api/http'
import Bus from 'assets/js/Bus.js'
export default {
    components: {
        memberlist
    },
    data() {
        return {
        	//添加参与者权限
			addParticipantFlage: null,
			//移除参与者权限
			removeParticipantFlage: null,
			
        	
        	
        	
            listShow: false,
            memberList:[],                  //参与人列表
            userMsg:{                       //任务负责人的信息
                name:JSON.parse(sessionStorage.getItem('userMessage')).username,
                img:JSON.parse(sessionStorage.getItem('userMessage')).user_img,
                id:parseInt(sessionStorage.getItem('userId'))
            },
            participantBol: false,          //参与人选择框显示与隐藏
            checkIds:[],                    //参与人ids
        }
    },
    methods: {
        // moduleInit() {
        //     document.addEventListener("click",() => {
        //         this.listShow = false;
        //     })
        // },
        // showList() {
        //     this.listShow = true;
        // },
        //接收参与人组件传出来的信息
        reception(obj){
            console.log(obj)
            if(obj.checked){
                this.memberList.push(obj)
            }else{
                let index = this.memberList.findIndex(el => {
                    return el.id == obj.id
                })
                this.memberList.splice(index,1)
            }
            console.log(this.checkIds)
            sessionStorage.setItem('userId',this.checkIds)
            
        },
        //获取成员列表
        getMemberList(){
            API.get('/projects/getUserByPid', {
                eid: sessionStorage.getItem('enterpriseId'),
                pid: sessionStorage.getItem('projectId')
            }).then(res => {
                let self = this;
                let data = res.data.data;
                if(data.length>0){
                    data.map(function(item){
                        if(item.id==self.userMsg.id){
                            self.userMsg.img = item.user_img;
                        }
                    })
                    console.log(this.userMsg)
                }
            })
        },
        //获取全部人员的信息
        getAllMsg(data){
            console.log(data)
            this.memberList = data.userList;
            
        },
        addUserBol(){
				console.log(sessionStorage.getItem('projectId'))
				if(sessionStorage.getItem('projectId')==''){
					this.$notify({
						title: '警告',
						message: '请先选择创建至哪个项目',
						type: 'warning'
					})
				}else{
					this.participantBol=!this.participantBol
				}
				
			}
    },
    mounted() {
        this.getMemberList();
        // this.moduleInit();
    },
    created(){
    	
    	if(sessionStorage.getItem('projectId')){
    		//项目权限设置
			API.get('/projectPermission/queryProjectPermission', {
				projectId: sessionStorage.getItem('projectId')
			}).then(res => {
//				console.log('=================================',res.data.data)
				sessionStorage.setItem('currentProjectPermissions', JSON.stringify(res.data.data))
				Bus.$emit('toQueryProjectPermission', res.data.data)
			})
    	}
    	
		//接收组件通信信息
		Bus.$on('toQueryProjectPermission', (msg) => {
			this.addParticipantFlage = msg.projectPermissionList[16].status
			this.removeParticipantFlage = msg.projectPermissionList[17].status
			this.privacyModeFlage = msg.projectPermissionList[18].status
			
		});
	}
}
</script>
<style scoped>
    /* 添加参与者框 */
    .item-wrap .addMemberWrap {
        position: relative;
    }
    .addMemberWrap .addMember {
        position: absolute;
        left: -98px;
        width: 240px;
        height: 260px;
        background-color: #ffffff;
        box-shadow: 0 0 5px #E5E5E5;
        border-radius: 5px;
        z-index: 2;
    }
    .addMember .searchWrap {
        padding: 15px;
        padding-bottom: 10px;
    }
    /* 模糊搜索 */
    .searchWrap .search{
        box-sizing: border-box;
        width: 100%;
        height: auto;
        margin: 0;
        padding: 6px;
        line-height: 20px;
        border: 1px solid #d9d9d9;
        outline: none;
        border-radius: 3px;
    }
    /* 成员列表 */
    .addMember .selectList{
        /* height: 100%; */
        height: 200px;
        overflow-y: scroll;
    }
    .selectList .listItem {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: #666666;
        padding: 0 20px;
    }

    /* 滑动条样式 */
    /*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
	.selectList::-webkit-scrollbar {
		width: 7px;
		height: 16px;
		background-color: #f5f5f5;
	}
	/*定义滚动条的轨道，内阴影及圆角*/
	.selectList::-webkit-scrollbar-track {
		/* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3); */
		/* border-radius: 10px; */
		background-color: #E5E5E5;
	}
	/*定义滑块，内阴影及圆角*/
	.selectList::-webkit-scrollbar-thumb {
		width: 10px;
		height: 20px;
		border-radius: 1px;
		/* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3); */
		background-color: #A6A6A6;
        border-left: 2px solid transparent;
	}

    /* 参与者 */
    .actor {
        padding-top: 10px;
        padding-bottom: 30px;
    }
    .actor .item-wrap {
        display: flex;
        margin-top: 15px;
    }
    .item-wrap .item {
        width: 30px;
        height: 30px;
        font-size: 30px;
        border-radius: 15px;
        margin-right: 15px;
        background-color: #ffae44;
        cursor: pointer;
    }
    .item-wrap .add {
        color: #0a7ee9;
        background: none;
        line-height: 34px;
    }
    .row {
        display: flex;
        align-items: center;
        padding: 10px 0;
    }
    
    .row .img{
        width: 24px;
        height: 24px;
        border-radius: 24px;
        background: #ffae44;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
    }
    
    .row .user {
        cursor: pointer;
        display: flex;
        align-items: center;
    }
    .hand{
        cursor: pointer;
    }
    
    .memberList{
        display: flex;
        align-items: center;
    }
    .addUser{
        font-size: 23px;
        margin-top: 4px;
        color: #077CE7;
        cursor: pointer;
    }
</style>
