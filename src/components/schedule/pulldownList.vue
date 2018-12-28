<template>
    <div>
        <div class="pullDownList" :style="styles" v-show="shows&&rank==1">
            <el-row class="colCenter">
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="22">
                    {{title}}
                </el-col>
                <el-col :span="1">
                    <i @click.stop="$emit('close')" class="iconfont icon-guanbi hand" style="margin-left: -20px;"></i>
                </el-col>
            </el-row>
            
            <ul class="uls" v-for="item in list">
                <li v-for="option in item" @click.stop="clickItem(option)" v-if="option.name == '删除日程' ?0!=delScheduleFlage:1">
                    <i :class="option.icon"></i>
                    {{option.name}}
                </li>
            </ul>
            
            <div class="hide" v-show="hide" @click="hideBol=!hideBol">
                <el-row>
                    <el-col :span="3">
                        <b>
                            <i v-if="!hideBol" class="iconfont icon-jiesuo"></i>
                            <i v-if="hideBol" class="iconfont icon-suo"></i>
                        </b>
                    </el-col>
                    <el-col :span="8"><b style="font-size: 14px;">隐私模式</b></el-col>
                    <el-col :span="8">&nbsp;</el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">&nbsp;</el-col>
                    <el-col :span="13">{{hideBol?'所有成员可见':'仅参与者可见'}}</el-col>
                    <el-col :span="8"><b style="color: #077ce7;font-size: 14px;">{{hideBol?'已关闭':'已开启'}}</b></el-col>
                </el-row>
            </div>
        </div>
    
        <div class="pullDownList" :style="styles" v-show="shows&&rank==2">
            <el-row class="colCenter">
                <el-col :span="1">
                    <i @click.stop="rank=1" class="iconfont icon-jiantouyou-copy hand"></i>
                </el-col>
                <el-col :span="22">
                    {{secondTitle}}
                </el-col>
                <el-col :span="1">
                    <i @click.stop="$emit('close')" class="iconfont icon-guanbi hand" style="margin-left: -20px;"></i>
                </el-col>
            </el-row>
            <div class="second-pullDownList">
                <input type="text" placeholder="搜索项目">
                <ul class="uls">
                    <li v-for="option in secondList" @click.stop="chooseProject(option)">
                        <i :class="option.icon"></i>
                        {{option.name}}
                    </li>
                </ul>
            </div>
            <slot></slot>
        </div>
    </div>
</template>
 
<script>
    import API from 'api/http'
    import Bus from 'assets/js/Bus.js'
    export default {
        props:{
            title:{   //列表的名字
                type: String,
                default:'菜单'
            },
            shows:{    //是否显示列表
                type: Boolean,
                default: false
            },
            list:{    //列表 "二维数组"
                type: Array,
                default: []
            },
            styles:{  //给列表定位  列表时浏览器定位
                type:String,
                default: 'top:0px;left:0px'
            },
            hide:{    //是否显示隐私模式选项
                type: String,
                default: false
            },
            sid:{
                type: Number,
                default: null
            }
        },
        data(){
            return {
                //删除日程权限
                delScheduleFlage:null,
                //
                hideBol:true, //是否进行隐私设置
                secondTitle:'',//二级标题，
                rank:1,
                secondList:[]
            }
        },
        methods:{
            //点击元素 如果是二级操作的话 可以进入二级页面 如果没有二级操作 那么就直接返回命令的名字
            clickItem(item){
                if('can' in item){
                    this.rank = 2;
                    this.secondTitle = item.name;
 
                    API.get('/schedule/getAllProject').then(res => {
                        if(res.data.code==200){
                            this.secondList = res.data.data;
                        }
                    })
                }else{
                    this.$emit('command',item.name)
                }
            },
            //选中某一项目
            chooseProject(item){
                this.$emit('chooseProject',this.secondTitle,item.eid,item.id);
            }
        },
        created(){
            //接收组件通信信息
            Bus.$on('toQueryProjectPermission', (msg) => {
                //创建任务
                this.delScheduleFlage = msg.projectPermissionList[15].status
            });
        },
        watch:{
            shows(){
                this.rank = 1;
            }
        }
    }
</script>
 
<style scoped>
    .pullDownList{
        position: fixed;
        z-index: 13;
        padding-top: 20px;
        width: 260px;
        background: white;
        font-size: 12px;
        border-radius:3px;
        box-shadow: 0 0 10px #E6E6E6;
        color: #999999;
    }
    .colCenter{
        text-align: center;
        font-size: 14px;
        margin-bottom: 20px;
    }
    .uls{
        border-top: 1px solid #efefef;
        line-height: 30px;
        padding: 4px 0;
    }
    .uls li{
        cursor: pointer;
        margin: 6px;
    }
    .uls li i{
        margin-right: 10px;
    }
    .uls li:hover{
        background: #efefef;
        color: #077ce7;
    }
    .hand {
        cursor: pointer;
    }
    .hide{
        padding: 6px;
        border-top: 1px solid #efefef;
        cursor: pointer;
        padding-left: 10px;
    }
    .second-pullDownList{
        margin: -9px 10px;
        border-top: 1px solid #efefef;
        padding: 20px 0;
    }
    .second-pullDownList input{
        border: 1px solid #d2cfcf;
        width: 95%;
        height: 36px;
        line-height: 36px;
        padding-left: 10px;
    }
    .second-pullDownList ul{
        border: none;
        margin-top: 10px;
        max-height: 300px;
        overflow-y: auto;
    }
</style>
