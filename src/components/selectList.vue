<!--带输入框通用下拉列表-->
<template>
    <div class="selector">
        <div class="searchWrap">
            <input type="text" class="search" :placeholder="holder" v-model="key">
        </div>
        <el-dropdown-item>
            <ul class="selectList">
                <li class="listItem iconfont" @click="select" id="" :class="{'icon-duihao':selectId==''}">{{selectAll}}</li>
                <li class="listItem iconfont" :class="{'icon-duihao':selectId==item.id}" @click="select" v-for="item in filterData" :key="item.id" :id="item.id">
                    <img v-if="item.image != ''" :src="item.image">
                    <img v-if="item.image == ''" src="../assets/images/22登录_01.png">
                    <span>{{item.name | ellipsis}}</span>
                </li>
            </ul>
        </el-dropdown-item>
    </div>
</template>
<script>
export default {
    filters: {
        // 超过6个字符显示。。。
        ellipsis(val) {
            if (val.length>6) {
                return val.substr(0,6) + '...';
            }
            return val;
        }
    },
    computed: {
        selectAll() {
            let text = '所有' + this.holder.substr(-2,2);
            return text;
        },
        // 数据过滤
        filterData() {
            if (this.key == '') {
                return  this.data;
            }else {
                let list = [];
                let allList = this.data;
                for (let i=0; i<allList.length; i++) {
                    let text = allList[i].name;
                    if (text.indexOf(this.key) != -1) {
                        list.push(allList[i]);
                    }
                }
                return list;
            }
        }
    },
    data() {
        return {
            selectName: '',
            selectId: '',
            key: '',        // 过滤关键字
        }
    },
    methods: {
        select(e) {
            if (e.target.nodeName != 'LI') {
                this.selectId = e.target.parentNode.id;
                this.selectName = e.target.parentNode.innerText;
            }else {
                this.selectId = e.target.id;
                this.selectName = e.target.innerText;
            }
            this.$emit('setPro',{name:this.selectName,id:this.selectId});
            this.$emit('setUser',{name:this.selectName,id:this.selectId});
        }
    },
    mounted() {
    },
    props: ['holder','data'],
}
</script>
<style scoped>
    /* 模糊搜索 */
    .selector .searchWrap {
        padding: 5px 15px;
    }
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
    /* 列表 */
    .selector .selectList{
        max-height: 200px;
        overflow-y: auto;
    }
    .selectList .listItem {
        height: 30px;
        line-height: 30px;
        max-width: 180px;
        font-size: 14px;
        color: #666666;
        padding: 5px 20px;
        cursor: pointer;
    }
    .selectList .listItem::before {
        float: right;
    }
    .selectList .listItem:hover {
        background-color: #f7f7f7;
    }
    .listItem img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
        border-radius: 15px;
        vertical-align: middle;
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
</style>
<style>
.selector .el-dropdown-menu__item {
    padding: 0;
}
.selector .el-dropdown-menu__item:hover {
    background: none !important;
    color: inherit;
}
</style>
