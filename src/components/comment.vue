<template>
	<div class="comment">
		<div class="commentBox">
			<div>
				<input @keyup.enter="addComment" type="textarea" v-model="comment_content" placeholder="@提及他人，按enter快速发布" />
			</div>
			<div>
				<div style="position: relative;">
					<i class="iconfont icon-xiaolian-line" style="color: #c7c7c7;cursor: pointer;" @click="showEmotion($event)"></i>
					<emotion :flag="showEmj" @emotion="emoji"></emotion>
				</div>
				<div>
					<div class="send" @click="addComment">
						发布
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import emoji from '../assets/js/emotions.js'
	import emotion from './emotion';
	export default {
		components: {
			emotion
		},
		data() {
			return {
				comment_content: '',
				emj: {},
				showEmj: false
			}
		},
		methods: {
			showEmotion(ev) {
				this.showEmj = !this.showEmj
			},
			addComment() {
				if(this.comment_content.trim() != '') {
					let str = this.comment_content
//					let reg = /\[[\u4e00-\u9fa5]+\]/g
//					let reg2 = /\[[\u4e00-\u9fa5]+\]/
//					let emojiArr = str.match(reg)
//					let htmls = ''
//					if(emojiArr == null){
//						
//					}else if(emojiArr.length !== 0) {
//						for(let i = 0; i < emojiArr.length; i++) {
//							for(let k = 0; k < emoji.length; k++) {
//								if(emojiArr[i] == emoji[k].phrase) {
//									htmls = `<img src="${emoji[k].url}">`
//									str = str.replace(reg2, htmls)
//									break;
//								}
//							}
//						}
//					}
					console.log('111111111111',str)
					this.$emit('sendComment', str)
					this.comment_content = ''
				}
			},
			emoji(data) {
				this.comment_content += data.phrase
			}
		}
	}
</script>

<style scoped>
	.comment {
		width: 100%;
		height: 156px;
		background: #E5E5E5;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.commentBox {
		width: 96%;
		height: 116px;
		background: white;
		border-radius: 6px;
		border: 1px solid #d2d2d2;
	}
	
	.commentBox>div:nth-child(1) {
		border-bottom: 1px solid #d2d2d2;
	}
	
	.commentBox input {
		width: 97%;
		border-radius: 6px;
		height: 58px;
		font-size: 12px;
		padding: 0 15px;
		box-sizing: border-box;
	}
	
	.commentBox input::-moz-placeholder {
		font-size: 12px;
		color: #c7c7c7;
	}
	
	.commentBox input::-webkit-input-placeholder {
		font-size: 12px;
		color: #c7c7c7;
	}
	
	.commentBox>div:nth-child(2) {
		height: 58px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 15px;
	}
	
	.commentBox .send {
		display: flex;
		width: 70px;
		height: 28px;
		background: #0a7ee9;
		color: white;
		border-radius: 4px;
		cursor: pointer;
		justify-content: center;
		align-items: center;
	}
</style>