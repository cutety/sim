<template>
	<div class="container">
		<div class="login">
			<el-form class="loginForm">
				<el-form-item>
					<el-input v-model="form.user_id" placeholder="学号工号">
						<i slot="prefix" class="el-icon-user"></i>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-input type="password" v-model="form.password" placeholder="密码" show-password>
						<i slot="prefix" class="el-icon-key"></i>
					</el-input>
				</el-form-item>
				<el-form-item class="loginButton">
					<el-button type="primary">登录</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user_id: '',
        password: '',
      },
    };
  },
};
</script>

<style scoped>
.container {
	height: 100%;
	background-color: #116597;
}
.login {
	width:450px;
	height:300px;
	background-color: #ffffff;
	position: absolute;
	top:50%;
	left:50%;
	transform:translate(-50%, -50%);
	border-radius:15px;
}

.loginForm {
	width:100%;
	position:absolute;
	bottom: 10%;
	padding: 0 20px;
	box-sizing: border-box;
}

.loginButton {
	display: flex;
	justify-content: flex-end;
}
</style>
