<template>
	<div>
		<!--详细资料-->
		<div class="detailsBox">
			<div class="details">姓名<br /><span>{{details.name | empty}}</span></div>
			<div class="details">年龄<br /><span>{{details.age | empty}}</span></div>
			<div class="details">职位<br /><span>{{details.position | empty}}</span></div>
		</div>
		<div class="detailsBox">
			<div class="details">员工类型<br /><span>{{details.emptype | empty}}</span></div>
			<div class="details">办公地点<br /><span>{{details.officeSpace | empty}}</span></div>
			<div class="details">电子邮箱<br /><span>{{details.email | empty}}</span></div>
		</div>
		<div class="detailsBox">
			<div class="details">电话<br /><span>{{details.tel | empty}}</span></div>
			<div class="details">生日<br /><span>{{details.birthday | empty}}</span></div>
			<div class="details">部门<br /><span>{{details.department | empty}}</span></div>
		</div>
		<div class="detailsBox">
			<div class="details">上级<br /><span>{{details.higherUp | empty}}</span></div>
		</div>
	</div>
</template>

<script>
	import API from 'api/http'
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				details: {
					name: '',
					age: 0,
					//职位
					position: ' ',
					//员工类型
					emptype: '',
					//办公类型
					officeSpace: '',
					//电子邮箱
					email: '',
					//电话
					tel: '',
					//生日
					birthday: '',
					//部门
					department: '',
					//上级领导
					higherUp: ''
				}
			}
		},
		filters: {
			empty(val) {
				if(val === '') {
					return '--';
				} else {
					return val;
				}
			}
		},
		methods:{
			getUserInfo(){
				API.get('/user/showMessage', {
					id: sessionStorage.getItem('memberId')
				}).then(res => {
	//				console.log(res)
					this.details.name = res.data.data.name
					this.details.email = res.data.data.email
					this.details.tel = res.data.data.phone.split('-')[1]
					this.details.position = res.data.data.position
					this.details.officeSpace = res.data.data.province + '-' + res.data.data.city
					this.details.emptype = res.data.data.employee_type
					this.details.age = Math.floor((new Date() - res.data.data.birthday)/1000/60/60/24/365)
					let birthday = new Date(res.data.data.birthday);
					this.details.birthday = birthday.getFullYear() + '-' + (birthday.getMonth() + 1) + '-' + birthday.getDate()
				})
			}
		},
		created() {
			this.getUserInfo()
		},
		watch:{
			getMemberMessageFlag(){
				this.getUserInfo()
			}
		},
		computed: {
			...mapGetters({
				getMemberMessageFlag: 'GET_MEMBERMESSAGEFLAG'
			})
		}
	}
</script>

<style scoped>
	.detailsBox {
		padding: 0px 48px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 854px;
		height: 106px;
		border-bottom: 1px solid #ebebeb;
	}
	
	.details {
		flex: 1;
		color: #888;
		font-size: 12px;
	}
	
	.details span {
		color: #333;
		font-size: 16px;
	}
</style>