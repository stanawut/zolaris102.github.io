<script>
import {inertia} from '@inertiajs/svelte';
export let links;
</script>

<style>

</style>

<nav aria-label="Page navigation example">
	{#if links && links.length > 0}
		<ul class="pagination">
			{#each links as link}
				{#if link.url === null}
					<li class="page-item disable">
						<a use:inertia class="page-link" href="{link.url}">{@html link.label}</a>
					</li>
				{:else}
					<li class={link.active?"page-item active":"page-item"}>
						<a class="page-link" href="{link.url}">{@html link.label}</a>
					</li>
				{/if}
			{/each}
		</ul>
	{/if}
</nav>