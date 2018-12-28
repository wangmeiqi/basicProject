<template>
    <!--上传图片-->
    <div>
        <label class="btn" for="uploads" @click="start"><slot></slot></label>
        <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
        <el-dialog :lock-scroll="lockScroll" :append-to-body="toBody" :title="title" :visible.sync="uploadBol" width="400px" center>
            <span class="cropperBox">
                <vueCropper :style="size" ref="cropper"
                :img="option.img"
                :outputSize="option.size"
                :outputType="option.outputType"
                :into="option.into"
                :canScale="option.canScale"
                :autoCrop="option.autoCrop"
                :fixedNumber="option.fixedNumber"
                :fixedBox="option.fixedBox"
                :canMove="option.canMove"
                :canMoveBox="option.canMoveBox"
                :original="option.original"></vueCropper>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="uploadBol = false">取 消</el-button>
                <el-button type="primary" @click="upload">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>
    import API from 'api/http'
    import VueCropper from 'vue-cropper'
    import img from 'assets/images/cover-media.jpg'
    export default {
        props: {
            size: {
                default: "width:325px;height:176px"
            },
            title: {
            	default: '上传图片'
            }
        },
        components: {
            VueCropper,
        },
        methods: {
            start() {
                this.option.img = ''
            },
            end() {
                this.$refs.cropper.stopCrop()
            },
            clear() {
                this.$refs.cropper.clearCrop()
            },
            upload() {
                let _this = this;
                this.$refs.cropper.getCropData((data) => {
                    this.$emit('sendBase64',data);
                    this.uploadBol = false
                })
            },
            uploadImg(e, num) {
                // 上传图片
                // this.option.img
                var file = e.target.files[0]
                this.uploadBol = true
                if(!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
                    return false
                }
                var reader = new FileReader()
                reader.onload = (e) => {
                    let data
                    if(typeof e.target.result === 'object') {
                        // 把Array Buffer转化为blob 如果是base64不需要
                        data = window.URL.createObjectURL(new Blob([e.target.result]))
                    } else {
                        data = e.target.result
                    }
                    if(num === 1) {
                        this.option.img = data
                    } else if(num === 2) {
                        this.example2.img = data
                    }
                }
                // 转化为base64
                // reader.readAsDataURL(file)
                // 转化为blob
                reader.readAsArrayBuffer(file)
            }
        },
        data() {
            return {
                lockScroll:true,
                toBody:true,
                urls: '',
                uploadBol: false,
                option: {
                    //图片地址
                    img: '',
                    //生成图片的质量
                    size: 1,
                    //传入图片的格式    可选jpeg || png || webp
                    outputType: 'jpg',
                    //剪裁框大小的信息
                    into: false,
                    //是否允许滚动轮缩放
                    canScale : true,
                    //是否默认生成截图框
                    autoCrop:true,
                    //截图框的宽高比例
                    fixedNumber: [1,1],
                    //固定截图框大小 不允许改变
                    fixedBox:true,
                    //上传图片是否可以移动
                    canMove:true,
                    //截图框能否拖动
                    canMoveBox:true,
                    //图片地址
                    dataImageurl:'',
                }
            }
        }
    }
</script>

<style scoped>
    .cropperBox{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .btn{
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #077ce7;
        color: #077ce7;
        -webkit-appearance: none;
        text-align: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        -webkit-transition: .1s;
        transition: .1s;
        font-weight: 500;
        padding: 6px 10px;
        font-size: 12px;
        border-radius: 4px;
    }
    .btn:hover{
        color: #fff;
        border-color: #077ce7;
        background-color: #077ce7
    }
</style>
