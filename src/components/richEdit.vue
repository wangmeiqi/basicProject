<!--富文本编辑控件
	自定义事件
		close 	关闭富文本
		save	把富文本的值传出去
-->
<template>
    <div v-if="show" :style="styles">
        <div id="editor" ref="editor" @click="editor.$textElem.attr('contenteditable', true)"></div>
        <div class="buttonGroup">
            <div class="cancel" @click="$emit('close')">取消</div>
            <el-button style="z-index: 15;" type="primary" size="medium" @click="save">保存</el-button>
        </div>
    </div>
</template>

<script>
import WangEditor from "wangeditor";
export default {
    props:{
        defVal:{   // 默认内容
            type: String,
            default:''
        },
        show:{    // 是否显示
            type: Boolean,
            default: true
        },
        styles:{  // 位置
            type:String,
            default: 'top:0px;left:0px;'
        },
        height:{
        	type:Number,
        	default:120
        },
        // 功能选项
        option: {
            type:Array,
            default: () => {
                return [
                    'head',  // 标题
                    'bold',  // 粗体
                    'fontSize',  // 字号
                    'fontName',  // 字体
                    'italic',  // 斜体
                    'underline',  // 下划线
                    'strikeThrough',  // 删除线
                    'foreColor',  // 文字颜色
                    'backColor',  // 背景颜色
                    'link',  // 插入链接
                    'list',  // 列表
                    'justify',  // 对齐方式
                    'quote',  // 引用
                    'emoticon',  // 表情
                    'image',  // 插入图片
                    'table',  // 表格
                    // 'video',  // 插入视频
                    // 'code',  // 插入代码
                    // 'undo',  // 撤销
                    // 'redo'  // 重复
                ]
            }
        }
    },
    data() {
        return {
            prompt: '待添加',        // 默认提示内容
            editor: null
        }
    },
    mounted() {
      let _this = this;
      setTimeout(function(){
        _this.editorInit();
      },300)
    },
    methods: {
        // 编辑器初始化
        editorInit() {
        	let _this = this;
            this.editor = new WangEditor('#editor');
            this.editor.customConfig.menus = [...this.option];
            // 没有数据情况默认提示
            this.editor.customConfig.onfocus =  () => {
                console.log(this.editor.txt.html(),'Y(^o^)Y');
                if (this.defVal == '' && this.editor.txt.html() == this.prompt + '<p><br></p>') {
                    this.editor.txt.clear();
                }
            }
            this.editor.customConfig.zIndex = 100000
            this.editor.customConfig.onchange = function (html) {
		        // html 即变化之后的内容
		        //console.log(html)
		        //console.log(html.replace(/<[^>]+>/g,""))
		        let str = html.replace(/<[^>]+>/g,"")
		        if(str.length > 1000){
		        	_this.$notify({
			          	title: '警告',
			          	message: '备注字数不能超过1000字',
			          	type: 'warning'
			        });
		        	//console.log(str[str.length-3] + str[str.length-2] + str[str.length-1])
                    var filters = str.substr(0,1000);
                    _this.editor.txt.html(filters);
			        // _this.editor.txt.html(html.substr(0,html.lastIndexOf(str[str.length-3] + str[str.length-2] + str[str.length-1])))
					_this.editor.$textElem.attr('contenteditable', false)
		        }
		    }
            this.editor.create();
            this.editor.txt.html(this.defVal!='' ? this.defVal : this.prompt);
            this.$nextTick(()=>{
            	this.editor.$textContainerElem[0].style.height = this.height + 'px'
            })
        },
        save() {
            console.log(this.editor.txt.html(),'Y(^o^)Y');
            if(this.editor.txt.text() != ''){
                console.log(1)
            	this.$emit('save',this.editor.txt.html());
            }else{
                console.log(2)
            	this.$emit('save',this.prompt);
            }
            this.$emit('close')
        }
    }
};
</script>

<style scoped>
.buttonGroup {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    padding-right: 30px;
}
.buttonGroup .cancel {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-right: 30px;
    font-size: 14px;
    z-index: 15;
}
.buttonGroup .cancel:hover {
    color: #3da8f5;
}
</style>
