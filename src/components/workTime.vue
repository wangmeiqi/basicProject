<template>
    <div class="workTime" :style="styles" @click.stop="edit=edit">
        <div class="header">
            <div class="time">
                <div class="key">计划工时</div>
                <div v-show="!edit">
                    <el-tooltip v-show="!edit" class="item" effect="dark" content="点击即可编辑" placement="top">
						<p class="val" @click="edit = !edit">
                            {{plantTime}} 小时
                        </p>
				    </el-tooltip>
                    <p class="btnGroup">
                        <span class="btn iconfont icon-jiantous" @click="setPlant(++plantTime)"></span>
                        <span class="btn iconfont icon-jiantoux" @click="setPlant(--plantTime>0?plantTime:0)"></span>
                    </p>
                </div>
                <div class="addVal" v-show="edit" :class="{'redborder':showWarn}">
                    <input type="number" v-model="plantTime" @keydown="flite">小时
                    <button @click="setPlant(plantTime)">确定</button>
                </div>
            </div>
            <p v-show="showWarn" class="warn">计划工时不可超过 1000 小时</p>
        </div>
        <div class="content">
            <div class="time">
                <div class="key">实际工时</div>
                <div class="val">
                    <span>{{factTime}} 小时</span>
                </div>
            </div>
            <p class="tips" v-show="false">任务执行者可提交实际工时</p>
            <div class="addtime" :class="{'redborder':showWarn2}">
                <p class="date">
                    <el-date-picker 
                    v-model="date"
                    type="date"
                    placeholder="   今天"
                    :editable="false"
                    :clearable="false"
                    format="M月d日"
                    value-format="yyyy-MM-dd HH:hh:mm"
                    :picker-options="pickerOptions"
                    ></el-date-picker>
                </p>
                <input type="number" v-model="submitTime" @keydown="flite" placeholder="填写工时数">
                <button :class="{'disable':isDisable}" @click="setFact">确定</button>
            </div>
            <p v-show="showWarn2" class="warn">当日实际工时不可超过 24 小时</p>
            <div class="nothing" v-show="nothing">
                <i style="font-size: 70px;color: #0a7ee9" class="iconfont icon-web__zanwujilu"></i>
                <p>暂无工时记录</p>
            </div>
            <ul class="lists">
                <li class="list" v-for="item in lists" :key="item.id">
                    <div>
                        <p class="key">{{item.user.username}}</p>
                        <p>{{item.createTime}}</p>
                    </div>
                    <div class="val">
                        <span>{{item.timeLong}} 小时</span>
                        <i class="iconfont icon-guanbi1" @click="delItem(item.id)"></i>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import api from '../api/http'
import tools from '../api/time'
export default {
    props:{
        params:{   // 默认内容
            type: Object,
            default: {
                tid: 81,
                fid: 5,
            }
        },
        show:{    // 是否显示
            type: Boolean,
            default: true
        },
        styles:{  // 位置
            type:String,
            default: 'top:0px;left:0px;'
        }
    },
    data() {
        return {
            edit: false,        // 工时编辑状态
            isDisable: true,    // 添加工时按钮状态
            plantTime: '',      // 计划时间
            factTime: '',       // 实际时间
            submitTime: '',     // 提交的工时
            eid: '',
            pid: '',
            tid: '',
            fid: '',
            date: '',           // 日期
            showWarn: false,    // 显示警告
            showWarn2: false,
            nothing: true,
            timer: '',
            lists:[],
            reg: /^[0-9]+([.]{1}[0-9]{1})?$/,
            pickerOptions: {
                disabledDate: (time) => {
                    if (this.endTime != "") {
                        return time.getTime() > new Date();
                    }
                }
            }
        }
    },
    mounted() {
        this.workTimeInit();
    },
    methods: {
        workTimeInit() {
            api.get('/tasks/getTimeLong', this.params).then(res => {
                this.dataFormat(res.data.data);
            })
            this.eid = sessionStorage.getItem('enterpriseId');
            this.pid = sessionStorage.getItem('projectId');
        },
        // 设置计划工时
        setPlant(val) {
            if (val < 0) {
                this.plantTime = 0;
                return
            };
            val = Math.floor(val * 10) / 10
            this.edit = false;
            let data = {
                eid: this.eid,
                pid: this.pid,
                tid: this.params.tid,
                fid: this.params.fid,
                tasktime: val ? val : 0,
            }
            api.post('/task/updTaskTime', data).then((res)=>{
                this.workTimeInit();
                this.pushData();
            });
        },
        // 设置实际工时
        setFact() {
            if (!this.isDisable) {
                let time = this.date != '' ? this.date : tools.formatting(new Date());
                let data = {
                    tasktime: this.submitTime,
                    eid: this.eid,
                    pid: this.pid,
                    tid: this.params.tid,
                    time: time
                }
                api.post('/task/addTaskTime', data).then((res) => {
                    this.workTimeInit();
                    this.submitTime = '';
                });
            }
        },
        // 删除列表项
        delItem(id) {
            let data = {
                eid: this.eid,
                pid: this.pid,
                tid: this.tid,
                lid: id,
            }
            api.post('/task/delTaskTime', data).then(() => {
                this.workTimeInit();
                this.pushData();
            });
        },
        // 数据格式化
        dataFormat(data) {
            data.list.map((el) => {
                el.createTime = tools.getYMD(el.createTime);
            });
            data.countTime = Math.floor(data.countTime * 10) / 10
            this.lists = data.list;
            if (this.lists.length == 0) {
                this.nothing = true;
            }else {
                this.nothing = false;
            }
            if(data.taskAndField != null){
            	this.plantTime = data.taskAndField.content;
	            this.tid = data.taskAndField.tid;
	            this.fid = data.taskAndField.typeId;
            }
            this.factTime = data.countTime;
            this.pushData();
            console.log(data,'Y(^o^)Y');
        },
        // 过滤
        flite(e) {
           if (e.key == 'e' || e.key == 'E') {
               this.$nextTick(()=>{
                    e.target.value = ''
               })
               return false;
           }
        },
        // 返回数据
        pushData() {
            this.$emit('updWorkTime',{plantTime:this.plantTime,facttime:this.factTime});
        }
    },
    watch: {
        // 计划时间验证
        plantTime: function(nVal,oVal) {
            if (nVal+''.indexOf('.') != -1 && !this.reg.test(nVal)) {
                this.plantTime = oVal;
            }
            if (nVal>1000) {
                this.showWarn = true;
                this.plantTime = oVal;
            }else if(nVal<0) {
                this.plantTime = 0;
            }
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.showWarn = false;
            },1500);
        },
        // 实际工时验证
        submitTime: function(nVal,oVal) {
            if (nVal != '') {
                this.isDisable = false;
                if (nVal + ''.indexOf('.') !=-1 && !this.reg.test(nVal)) {
                    this.submitTime = oVal;
                }
                if (nVal>24) {
                    this.showWarn2 = true;
                    this.submitTime = oVal;
                }else if(nVal<0) {
                    this.submitTime = 0;
                }
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.showWarn2 = false;
                },1500);
            }else {
                this.isDisable = true;
            }
        }
    }
};
</script>

<style scoped>
    .workTime {
        box-shadow: 0 2px 20px rgba(0,0,0,.1);
        border-radius: 5px;
        font-size: 13px;
        width:230px;
        height:280px;
        color: #999999;
        overflow-y: auto;
        margin-top: 10px;
        position: absolute;
        background: white;
        z-index: 10;
    }
    /* header */
    .workTime .header {
        border-bottom: 1px solid #efefef;
        position: relative;
    }
    .header .val,.header .addVal {
        width: 120px;
        height: 25px;
        border-radius: 5px;
        position: absolute;
        line-height: 25px;
        top: 8px;
        right: 20px;
    }
    .header .addVal {
        border: 1px solid #f7f7f7;
    }
    .header .val {
        width: 90px;
        right: 40px;
        cursor: pointer;
        text-align: right;
        padding-right: 10px;
    }
    .header .val:hover {
        background-color: #f7f7f7;
    }
    .header .btnGroup {
        position: absolute;
        right: 15px;
        display: flex;
        flex-direction: column;
        margin-top: 10px;
    }
    .btnGroup .btn {
        display: inline-block;
        width: 18px;
        height: 10px;
        margin-bottom: 2px;
        cursor: pointer;
    }
    .btnGroup .btn::before {
        display: inline-block;
        height: 10px;
        line-height: 10px;
        position: relative;
        top: -13px;
    }
    .btnGroup .btn:hover {
        color: #3da8f5;
    }
    .addVal input {
        width: 40px;
        padding-left: 10px;
    }
    .workTime .time {
        width: 100%;
        height: 41px;
        padding: 0 30px 0 20px;
        line-height: 40px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
    }
    .workTime .key {
        color:#414141;
        font-weight: 600;
    }
    .content .tips {
        text-align: center;
        height: 36px;
        line-height: 36px;
        background-color: #f7f7f7;
    }
    /* 增加工时 */
    .content .addtime {
        width: 190px;
        height: 36px;
        box-sizing: border-box;
        border: 1px solid #efefef;
        border-radius: 5px;
        margin: 0 auto;
        padding: 8px;
        display: flex;
        justify-content: space-between;
    }
    .addtime .date {
        padding-right: 5px;
        border-right: 1px solid #efefef;
        cursor: pointer;
    }
    .addtime input {
        max-width: 60px;
        padding-left: 5px;
    }
    .addtime button,.addVal button{
        width: 40px;
        background-color: #fff;
        font-weight: 600;
        color: #3da8f5;
        cursor: pointer;
    }
    button.disable {
        color: #999999;
        cursor: not-allowed;
    }
    /* 工时列表 */
    .lists .list {
        padding: 0 5px 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 45px;
    }
    .lists .list:hover {
        background-color: #f7f7f7;
    }
    .lists .list:hover i {
        visibility: visible;
    }
    .val i {
        color: #e3e3e3;
        margin-left: 5px;
        cursor: pointer;
        visibility: hidden;
    }
    /* 无数据 */
    .content .nothing {
        text-align: center;
        margin-top: 20px;
        margin-bottom: 17px;
    }
    /* 警告 */
    .workTime .warn {
        width: 100%;
        text-align: center;
        line-height: 30px;
        color: red;
    }
    .workTime .redborder {
        border: 1px solid red;
    }
    /* 滑动条样式 */
    /*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
	.workTime::-webkit-scrollbar {
		width: 5px;
		background-color: #f5f5f5;
	}
	/*定义滚动条的轨道，内阴影及圆角*/
	.workTime::-webkit-scrollbar-track {
		background-color: #e5e5e5;
	}
	/*定义滑块，内阴影及圆角*/
	.workTime::-webkit-scrollbar-thumb {
		border-radius: 2px;
		background-color: #A6A6A6;
        border-left: 2px solid transparent;
	}
    /* input */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type="number"]{
        -moz-appearance: textfield;
    }
</style>
<style>
    .workTime .el-date-editor.el-input {
        width: 59px;
        height: 18px;
        line-height:18px;
    }
    .workTime .el-input--prefix .el-input__inner {
        width: 59px;
        height: 18px;
        padding: 0;
        border: none;
    }
    .workTime .el-date-editor .el-input__prefix {
        display: none;
    }
</style>

