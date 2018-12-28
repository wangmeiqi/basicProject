<template>
    <div @click="tig">
        <el-row :class="{'no-scroll':pageToShow}">
            <el-col class="left" :span="1">
                <leftNav @calendarClose="calendarBol=false" @closeOthers="pageToShow=false;calendarBol=false" :hidden="hidden" @function="calendarBol=false;pageToShow=false" @chat="calendarBol=false;pageToShow=false" @leftNavItem="calendarBol=true;pageToShow=false"  @pageTomine="pageTomine"></leftNav>
                <!--<leftNav @closeOthers="calendarBol=false" :hidden="hidden" @leftNavItem="calendarStyle"></leftNav>-->
            </el-col>
            <!--左侧导航-->
            <el-col :span="24" class="right">
                <div @click="qwe">
                	<!--日历-->
                	<calendar v-if="calendarBol" :calenderShows="calendarBol" @close="calendarBol=false"></calendar>
                    <vheader @showSeach="showSeach" @setSearhLimit="setSearhLimit"></vheader>
                    <vlocation></vlocation>
                    <div class="main">
                        <router-view></router-view>
                        <!--我的-->
                        <mine :showPage="pageToShow" @hasClickClose="hasClickClose"></mine>
                     </div>
                    <!-- 全文检索详情 -->
                    <searchTable ref="searchTable" v-show="searchShow" @showSeach="showSeach" :searhLimit="searhLimit"></searchTable>   
                </div>
            </el-col>
            <!--右侧内容-->
        </el-row>
    </div>
</template>
 
<script>
    import leftNav from 'components/leftNav'
    import mine from 'components/mine/mine'
    import vheader from 'components/header'
    import vlocation from 'components/location'
    import searchTable from './searchTable'
    import calendar from 'components/calendar/calendar'
    import api from 'api/http'
    import {mapMutations, mapGetters} from 'vuex'
    export default {
        name: "index",
        data() {
            return {
                searchShow: false,
                searhLimit: {
                    keyWords:'',
                    typeId: '',
                    porjectId: '',
                    userId: ''
                },
                   hidden:false, //让侧导航栏中的所有关闭的标识
                pageToShow:false,
                calendarBol:false
            }
        },
        components: {
            mine,
            leftNav,
            vheader,
            vlocation,
            searchTable,
            calendar
        },
        mounted () {
            api.get('/userInfo/getMyInfo').then(res => {
                let id = res.data.data.id
                sessionStorage.setItem('userId', id) //用户id
            })
        },
        computed: {
        	...mapGetters({
        		getCloseAllFlag: 'GET_COLSEALLFLAG'
        	})
        },
        methods: {
        	tig(){
        		this.setCloseAllFlag(!this.getCloseAllFlag)
        	},
            //我的
            pageTomine(){
                this.pageToShow = true;
                this.calendarBol=false
            },
            //日历
             calendarStyle(){
                this.calendarBol = true,
                this.pageToShow = false
            },
            qwe(){
                this.hidden = !this.hidden
            },
            // 全文检索弹框
            showSeach(action) {
                if(action) {
                    this.searchShow = true;
                    return;
                }
                this.searchShow = false;
            },
            // 设置搜索条件
            setSearhLimit(data) {
                this.searhLimit.keyWords = data.keyWords;
                this.searhLimit.typeId = data.typeId;
                this.$refs.searchTable.moduleInit();
            },
            hasClickClose(){
                this.pageToShow = false;
            },
            ...mapMutations({
            	setCloseAllFlag: 'SET_CLOSEALLFLAG'
            })
           
        }
    }
</script>
<style scoped>
    .no-scroll{
        overflow-y: hidden;
    }
    .right {
        position: absolute;
        /*margin-left: 3%;*/
    }
 
    .left {
        position: absolute;
        z-index: 10;
    }
 
    .main {
        margin-left: 50px;
        overflow: auto;
    }
    /*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
 
    .main::-webkit-scrollbar {
        width: 0px;
        height: 16px;
        background-color: #f5f5f5;
    }
    /*定义滚动条的轨道，内阴影及圆角*/
 
    .main::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        border-radius: 10px;
        background-color: white;
    }
    /*定义滑块，内阴影及圆角*/
 
    .main::-webkit-scrollbar-thumb {
        /*width: 10px;*/
        height: 20px;
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: gainsboro;
    }
</style>