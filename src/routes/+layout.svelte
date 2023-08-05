<script lang="ts">
	import 'modern-normalize/modern-normalize.css';
	import '../styles/main.scss';
	import type { LayoutData } from './$types';
	import { LogoutForm } from '$components';
	import  logoNoBackground from '$assets/logo-no-background.png'

	export let data: LayoutData;

	$: user = data.user;
</script>
<img src="{logoNoBackground}" alt="The Recipe">

{#if user}
	<p>Hello, {data.user.given_name}</p>
	<LogoutForm />
{/if}

<slot />
