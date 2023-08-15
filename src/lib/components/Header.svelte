<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { Navigation, ToggleSwitch } from '$components';
	import { User2, ChevronDown } from 'lucide-svelte';
	import { tippy } from '$actions';
	import LogoutForm from './LogoutForm.svelte';
	import { tick } from 'svelte';

	$: user = $page.data.user;

	async function themeToggle () {
		let bodyElement = document.body;
		bodyElement.classList.toggle('light-theme');
		await tick();
	}

</script>

<div class="content">
	<div class="left">
		<!-- if this app running in the browser (T/F) -->
		<!-- optimize SEO, without if, there will be two Navigation exist -->
		{#if browser}
			<Navigation isDesktop={false} />
		{/if}
	</div>
	<div class="right">
		<ToggleSwitch on:click={themeToggle} >Light Mode</ToggleSwitch>
		<div id="profile-button">
			<button
				class="profile-button"
				use:tippy={{
					content: document.getElementById('profile-menu') || undefined,
					onMount: () => {
						const userMenuTemplate = document.getElementById('profile-menu');
						if (userMenuTemplate) {
							userMenuTemplate.style.display = 'block';
						}
					},
					trigger: 'click',
					placement: 'bottom-end',
					interactive: true,
					// this is the part tippy theme change
					theme: `userMenuDark`
				}
				}
			>
				{#if user?.picture}
					<img src={user.picture} alt="" />
				{:else}
					<div class="no-picture"><User2 /></div>
				{/if}
				{user?.given_name}
				<span class="visually-hidden">Profile menu</span>
				<ChevronDown class="profile-arrow" size={22} />
			</button>
		</div>

		<!-- tippy menu contents template -->
		<div id="profile-menu" style="display: none;">
			<div class="profile-menu-content">
				<ul>
					<li>
						<a href="/profile">User Profile</a>
					</li>
					<li>
						<LogoutForm />
					</li>
				</ul>
			</div>
		</div>
		<!-- tippy menu contents template -->
	</div>
</div>

<style lang="scss">
	.content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		.right {
			display: flex;
		}
	}
	.profile-button {
		background: none;
		border: 1px solid var(--border);
		padding: 5px;
		border-radius: 25px;
		display: flex;
		align-items: center;
		color: var(--text-color);
		cursor: pointer;
		:global(.profile-arrow) {
			margin-left: 3px;
		}
		img {
			width: 28px;
			height: 28px;
			border-radius: 100%;
			margin-right: 10px;
		}
		.no-picture {
			background-color: var(--sidebar-color);
			color: var(--accent-color);
			width: 28px;
			height: 28px;
			border-radius: 100%;
			margin-right: 10px;
		}
		&:hover {
			background-color: var(--accent-color);
		}
	}
	.profile-menu-content {
		padding: 5px 0;
		ul {
			padding: 0;
			margin: 0;
			list-style: none;
			li {
				&:hover {
					background-image: linear-gradient(rgba(255, 255, 255, 0.07) 0 0);
				}
				a,
				:global(button) {
					display: inline-block;
					padding: 10px 15px;
					background: none;
					border: none;
					text-decoration: none;
					cursor: pointer;
					color: var(--text-color);
					width: 100%;
					text-align: left;
					font-size: functions.toRem(14);
					border-radius: 0;
					font-weight: 400;
					&:hover {
						background-image: none;
					}
				}
			}
		}
	}
</style>
