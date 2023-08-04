<script lang="ts">
	import { invalidateAll } from '$app/navigation';
</script>

<form
	method="POST"
	action="/api/auth/logout"
	on:submit|preventDefault={async () => {
		const res = await fetch('/api/auth/logout', {
			method: 'POST',
			headers: {
				accept: 'application/json'
			}
		});
		if (res.ok) {
			invalidateAll();
		}
	}}
>
	<button type="submit">logout</button>
</form>
