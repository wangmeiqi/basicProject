<template>
    <div class="search-table" @scroll="Loading">
        <div class="search-input">
            <i class="iconfont icon-sousuo"></i>
            <input type="text" placeholder="搜索" v-model="keyWords" @keyup="startSearch">
            <a href="#" class="iconfont icon-guanbi close" @click="closePage"></a>
        </div>
        <div class="table-wrap">
            <el-tabs v-model="activeName" tab-position="top" style="height: 200px;">
                <el-tab-pane label="全部" name="">
                    <ul class="list">
                        <li class="list-item" v-for="item in resultList" @click="showDetails(item)" :key='item.length'>
                            <p class="title">{{item.proName}}</p>
                            <div class="content clearfix">
                                <span class="type-img iconfont icon-renwuwancheng"></span>
                                <span class="user-img">
                                    <img v-if="typeof(item.path) == 'string'" :src="item.path" alt="">
                                    <img v-if="typeof(item.path) != 'string'" src="../../assets/images/22登录_01.png" alt="">
                                </span>
                                <span>
                                    <span v-html="item.name"></span>
                                    <span class="label" v-for="i in item.label" :key="i">{{i}}</span>
                                </span>
                                <span class="date"><i class="iconfont icon-rili1"></i>{{item.endTime | dataFormat}}</span>
                            </div>
                            <p class="desc" v-html="item.remark"></p>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="任务" name="2">
                    <ul class="list">
                        <li class="list-item" v-for="item in taskList" @click="showDetails(item)" :key='item.length'>
                            <p class="title">{{item.proName}}</p>
                            <div class="content clearfix">
                                <span class="type-img iconfont icon-renwuwancheng"></span>
                                <span class="user-img">
                                    <img v-if="typeof(item.path) == 'string'" :src="item.path" alt="">
                                    <img v-if="typeof(item.path) != 'string'" src="../../assets/images/22登录_01.png" alt="">
                                </span>
                                <span>
                                    <span v-html="item.name"></span>
                                    <span class="label" v-for="i in item.label" :key="i">{{i}}</span>
                                </span>
                                <span class="date"><i class="iconfont icon-rili1"></i>{{item.endTime | dataFormat}}</span>
                            </div>
                            <p class="desc" v-html="item.remark"></p>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="分享" name="3">
                    <ul class="list">
                        <li class="list-item" v-for="item in shareList" :key='item.length'>
                            <p class="title">{{item.proName}}</p>
                            <div class="content clearfix">
                                <span class="type-img iconfont icon-renwuwancheng"></span>
                                <span class="user-img"><img :src="item.path" alt=""></span>
                                <span v-html="item.name"></span>
                                <span class="date"><i class="iconfont icon-rili1"></i>{{item.endTime | dataFormat}}</span>
                            </div>
                            <p class="desc" v-html="item.remark"></p>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="文件" name="4">
                    <ul class="list">
                        <li class="list-item" v-for="item in fileList" :key='item.length'>
                            <p class="title">{{item.proName}}</p>
                            <div class="content clearfix">
                                <span class="type-img iconfont icon-renwuwancheng"></span>
                                <span class="user-img"><img :src="item.path" alt=""></span>
                                <span v-html="item.name"></span>
                                <span class="date"><i class="iconfont icon-rili1"></i>{{item.endTime | dataFormat}}</span>
                            </div>
                            <p class="desc" v-html="item.remark"></p>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="日程" name="5">
                    <ul class="list">
                        <li class="list-item" v-for="item in scheduleList" :key='item.length'>
                            <p class="title">{{item.proName}}</p>
                            <div class="content clearfix">
                                <span class="type-img iconfont icon-renwuwancheng"></span>
                                <span class="user-img"><img :src="item.path" alt=""></span>
                                <span v-html="item.name"></span>
                                <span class="date"><i class="iconfont icon-rili1"></i>{{item.endTime | dataFormat}}</span>
                            </div>
                            <p class="desc" v-html="item.remark"></p>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="记账" name="6">
                    <ul class="list">
                        <li class="list-item" v-for="item in accountsList" :key='item.length'>
                            <p class="title">{{item.proName}}</p>
                            <div class="content clearfix">
                                <span class="type-img iconfont icon-renwuwancheng"></span>
                                <span class="user-img"><img :src="item.path" alt=""></span>
                                <span v-html="item.name"></span>
                                <span class="date"><i class="iconfont icon-rili1"></i>{{item.endTime | dataFormat}}</span>
                            </div>
                            <p class="desc" v-html="item.remark"></p>
                        </li>
                    </ul>
                </el-tab-pane>
            </el-tabs>
            <div class="dropdown">
                <el-dropdown trigger="click" style="margin-right:50px">
                    <span class="el-dropdown-link">
                        {{projectName}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <selectList holder="查找项目" :data="projectList" @setPro="setProject"></selectList>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <selectList holder="查找成员" :data="userList" @setUser="setUser"></selectList>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <taskCompile :taksCompileShow="taksCompileShow" :elementId="contentId">
            <span class="btn" @click="toOrigin">前往项目：{{proName}}</span>
            <!-- <span>前往日程表</span> -->
        </taskCompile>
    </div>
</template>
<script>
import api from '../../api/http'
import { mapMutations, mapGetters } from 'vuex'
import selectList from '../../components/selectList'
import taskCompile from '../taskType/taskCompile'
export default {
    components: {
        selectList,
        taskCompile
    },
    computed: {
        ...mapGetters({
            eid: 'GET_ENTERPRISEID',
        }),
        // 根据typeId筛选数据
        taskList() {
            return this.typePick(2);
        },
        shareList() {
            return this.typePick(3);
        },
        fileList() {
            return this.typePick(4);
        },
        scheduleList() {
            return this.typePick(5);
        },
        accountsList() {
            return this.typePick(6);
        }
    },
    data() {
        return {
            taksCompileShow: false,     // 查看任务详情弹框
            activeName: '',   // 默认选中项
            keyWords: '',
            projectName: '所有项目',
            projectId: '',
            userName: '所有成员',
            userId: '',
            resultList: '',
            userList: [],            // 成员列表
            projectList: [],         // 项目列表
            // 分页
            page: 1,
            size: 10,
            LazyLoad: false,
            // 跳转详情
            contentId: '',
            proName: ''             // 查看详情的项目名称
        }
    },
    filters: {
        dataFormat(val) {
            let formatT;
            let time = new Date(val);
            let year = time.getFullYear();
            let month = time.getMonth();
            let date = time.getDate();
            let currentYear = new Date().getFullYear();
            if (currentYear == year) {
                formatT = month + '月' + date +'日';
            }else {
                formatT = year + '年' + month + '月' + date +'日';
            }
            return formatT;
        }
    },
    methods: {
        // 获取用户列表
        getUserList() {
            let params = {
                enterpriseId: this.eid
            };
            api.post('/user/getEUser',params).then((res) => {
                if (res.data.code === 200) {
                    let data = res.data.data;
                    for (let i=0; i<data.length; i++) {
                        data[i].image = data[i].userImg;
                    }
                    this.userList = data;
                }else {
                    this.$message(res.data.message);
                }
            });
        },
        // 获取项目列表
        getProjectList() {
            let params = {
                eid: this.eid
            };
            api.get('/projects/getProjectList',params).then((res) => {
                if (res.data.code === 200) {
                    this.projectList = res.data.data;
                }else {
                    this.$message(res.data.message);
                }
            });
        },
        // 回车搜索
        startSearch(e) {
            // 更改关键字重置分页
            this.LazyLoad = false;
            this.page = 1;
            if (e.key === 'Enter') {
                this.getSearchResult();
            }
        },
        // 获取搜索结果
        getSearchResult() {
            if (this.keyWords.trim() == '') return;
            let params = {
                name: this.keyWords,
                eid: this.eid,
                projectId: this.projectId,
                userId: this.userId,
                page: this.page,
                size: this.size
            };
            api.post('/es/queryEs', params).then((res) => {
                if (res.data.code === 200) {
                    this.dataPick(res.data.data);
                }else {
                    this.$message(res.data.message);
                }
            });
        },
        // 数据筛选
        dataPick(data) {
            if(data.length == 0) {
                // 没有搜索到结果
                if(!this.LazyLoad) {
                    this.resultList = [];
                }
                return;
            }else {
                // 标签去空
                for (let i=0; i<data.length; i++) {
                    let labelArr = data[i].label;
                    for (let j=data.length; j>=0; j--) {
                        if (data[i].label[j] == '') {
                            data[i].label.splice(j,1);
                        }
                    }
                }
                // 懒加载拼接数据
                if (this.LazyLoad) {
                    this.resultList = this.resultList.concat(data);
                }else {
                    this.resultList = data;
                }
            }
            this.keywordHL();
        },
        // 设置项目
        setProject(data) {
            this.projectName = data.name;
            this.projectId = data.id;
            this.getSearchResult();
        },
        // 设置成员
        setUser(data) {
            this.userName = data.name;
            this.userId = data.id;
            this.getSearchResult();
        },
        // 关闭搜索
        closePage() {
            this.$emit('showSeach', false);
        },
        // 高亮关键字
        keywordHL() {
            let list = JSON.parse(JSON.stringify(this.resultList));
            let k = this.keyWords;
            let re = new RegExp(k,"g");
            for (let i=0; i<list.length; i++) {
                // 标题替换
                list[i].name = list[i].name.replace(re,'<em>' + k + '</em>');
                // 描述替换
                list[i].remark = list[i].remark.replace(re,'<em>' + k + '</em>');
            }
            this.resultList = list
        },
        // 数据分类
        typePick(typeId) {
            let list = [];
            for(let i=0; i<this.resultList.length; i++) {
                if (this.resultList[i].type == typeId) {
                    list.push(this.resultList[i]);
                }
            }
            return list;
        },
        // 设置搜索条件
        setSearchLimit() {
            this.keyWords = this.searhLimit.keyWords;
            this.activeName = this.searhLimit.typeId;
        },
        // 懒加载
        Loading(e) {
            let clientHeight = e.target.clientHeight;
            let scrollTop = e.target.scrollTop;
            let scrollHeight = e.target.scrollHeight;
            if (clientHeight + scrollTop == scrollHeight) {
                this.LazyLoad = true;
                this.page++;
                this.getSearchResult();
            }
        },
        // 查看详情
        showDetails(item) {
            this.taksCompileShow =!this.taksCompileShow;
            this.contentId = item.contentId;
            this.proName = item.proName;
        },
        // 详请组件上的按钮跳转
        toOrigin() {
            this.taksCompileShow =!this.taksCompileShow;
            this.closePage();
            this.$router.push('/taskType');
        },
        moduleInit() {
            this.LazyLoad = false;      // 重置懒加载
            this.getUserList();
            this.getProjectList();
            this.setSearchLimit();
            this.getSearchResult();
        }
    },
    mounted() {
        this.moduleInit();
    },
    watch: {
        // 跳转页面后关闭全文检索
        $route() {
            this.closePage();
        }
    },
    props: ['searhLimit']
}
</script>
<style scoped>
    .search-table {
        position: absolute;
        top: 76px;
        bottom: 0;
        left: 0;
        width: 100%;
        /*height: 560px;*/
        padding-left: 50px;
        box-sizing: border-box;
        overflow: auto;
        z-index: 1;
        background-color: #f7f7f7;
        /* background-color:hsla(0,0%,93%,.96); */
    }
    .search-table .search-input,.search-table .table-wrap {
        width: 90%;
        margin: 0 auto;
        position: relative;
    }
    /* 输入框 */
    .search-table .search-input {
        display: flex;
        justify-content: space-between;
        padding: 20px 0 5px;
        margin-bottom: 30px;
        height: 30px;
        line-height: 30px;
        color: #c3c3c3;
        border-bottom: 1px solid #e0e0e0;
    }
    .search-input input {
        padding: 0 10px;
        box-sizing: border-box;
        width: 100%;
        background-color: transparent;
        outline: none;
        border: 0 none;
        height: 30px;
        line-height: 30px;
        font-size: 20px;
        color: #333333;
    }
    .search-input .close {
        text-decoration: none;
    }
    /* 下拉 */
    .table-wrap .dropdown {
        position: absolute;
        z-index: 3;
        top: 0;
        right: 10px;
    }
    .dropdown .el-dropdown {
        cursor: pointer;
    }
    /* 列表 */
    .list .list-item {
        color: #333333;
        font-size: 14px;
        padding: 25px 20px;
        box-sizing: border-box;
        background-color: #ffffff;
        margin-bottom: 15px;
        border-radius: 3px;
        cursor: pointer;
    }
    .list-item .title,.list-item .desc {
        margin-left: 45px;
    }
    .list-item .title {
        color: #A6A6A5;
        font-size: 12px;
        margin-bottom: 10px;
    }
    .content>span{
        float: left;
        margin-right: 14px;
        line-height: 30px;
    }
    .content .type-img,.content .user-img img {
        display: inline-block;
        width: 30px;
        height: 30px;
        border-radius: 15px;
    }
    .content .type-img {
        background-color: #3da8f5;
        color: #fff;
        text-align: center;
    }
    .content .date {
        float: right;
        background-color: #ff4f3e;
        color: #fff;
        line-height: 22px;
        border-radius: 3px;
        padding: 0 5px;
    }
    .content .date i {
        margin-right: 5px;
    }
    .list-item .desc {
        margin-top: 10px;
    }
    /* 标签 */
    .content .label {
        font-size: 10px;
        line-height: 18px;
        margin-left: 8px;
        border-radius: 10px;
        vertical-align: middle;
        padding: 1px 3px;
        box-sizing: border-box;
        background-color: rgba(138,202,249,.8);
    }
    /* 详情跳转按钮 */
    .btn {
        margin-right: 10px;
        position: absolute;
        top: -10px;
        box-sizing: border-box;
        font-size: 14px;
        line-height: 20px;
        padding: 5px 12px;
        color: #bdbdbd;
        background-color: #686868;
        border-radius: 2px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
    }
</style>
<style>
    .search-table em {
        font-style: normal;
        color: #3da8f5;
    }
</style>
