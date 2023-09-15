<script lang="ts">
	import { Button } from '$components';
	import logo from '$assets/logo-no-background.png';
	import googleLogo from '$assets/google-icon.png';
	import loginData from '$assets/loginData.json';

	let headerRandomPhrase = loginData.h1[Math.floor(Math.random() * loginData.h1.length)];
	let paragraphRandomPhrase = loginData.p[Math.floor(Math.random() * loginData.p.length)];

	let loginImages: string[] = [];
	let loginImage: string;

	loginData.images.forEach((image) => {
		loginImages.push(image.loc);
	});

	loginImage = loginImages[Math.floor(Math.random() * loginImages.length)];	
</script>

<div class="wrapper">
	<div class="content">
		<img src={logo} class="logo" alt="The Recipe" />
		<h1>{headerRandomPhrase}</h1>
		<p>{paragraphRandomPhrase}</p>
		<div class="logins">
			<div class="logins-google">
				<div class="login-title">
					<img src={googleLogo} class="google-logo" alt="Google Login" />
					<p>Login through Google</p>
				</div>
				<Button element="a" varient="filled" href="/api/auth/login">Login</Button>
			</div>
		</div>
	</div>
	<div class="cover">
		<div class="carousel">
			<img src={loginImage} alt="login page food picture" />
		</div>
	</div>
</div>

<style lang="scss">
	:global(body) {
		background-image: linear-gradient(230deg, var(--bg-gradient-color), var(--bg-color));
		height: 100vh;
		
	}
	.wrapper {
		display: flex;
		width: 100%;
		max-width: 1200px;
		padding-top: 80px;
		margin: 80px auto 0;
		align-items: center;
		flex-direction: column;
		@include breakpoint.up('md') {
			flex-direction: row;
		}
	}
	.cover {
		flex: 1;
		margin-top: 40px;
		@include breakpoint.up('md') {
			margin-top: 0;
			margin-left: 20px;
		}
		img {
			max-width: 100%;
		}
	}
	.content {
		flex: 1.8;
		h1 {
			font-size: functions.toRem(40);
		}
		p {
			font-size: functions.toRem(20);
		}
		.logins {
			// display:flex;
			margin-top: 40px;
			:global(.button) {
				margin-right: 10px;
				font-size: functions.toRem(21);
				padding: 10px 30px;
				border-radius: 25px;
				text-transform: uppercase;
			}
			.logins-google {
				text-align: center;
				.login-title {
					display: flex;
					justify-content: center;
					align-items: center;
					.google-logo {
						width: 25px;
						height: 25px;
						margin-right: 10px;
					}
					p {
						font-size: functions.toRem(18);
						font-weight: 400;
					}
				}
			}
		}
		.logo {
			width: 200px;
			max-width: 100%;
			margin-bottom: 30px;
		}
	}
</style>
