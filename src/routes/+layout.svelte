<script lang="ts">
	import 'modern-normalize/modern-normalize.css';
	import '../styles/main.scss';
	import type { LayoutData } from './$types';
	import { LogoutForm, Button } from '$components';
	import  logoNoBackground from '$assets/logo-no-background.png'


	export let data: LayoutData;

	$: user = data.user;
</script>
<img src="{logoNoBackground}" alt="The Recipe">

{#if user}
	<p>Hello, {data.user.given_name}</p>
	<LogoutForm />
{/if}

<Button element='button'>Button</Button>
<Button element='button' disabled>Button</Button>
<Button element='button' varient='outline'>Button</Button>
<Button element='button' varient='danger'>Button</Button>


<slot />
