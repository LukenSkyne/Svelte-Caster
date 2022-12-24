<script lang="ts">
	import type { RatedResult } from "$lib/utils/Types"
	import { cubicInOut } from "svelte/easing"
	import { scale } from "svelte/transition"

	export let ratedResults: RatedResult[]
</script>

<div class="resultContainer">
	{#if ratedResults.length === 0}
		<div class="result">No Results Yet</div>
	{:else}
		{#each ratedResults.slice(0, 10) as res, index}
			<div class="result" transition:scale={{ duration: 200, easing: cubicInOut }}>
				<div class="score">
					{res.score}
				</div>
				<div>
					{res.word.toUpperCase()}
				</div>
			</div>
		{/each}
	{/if}
</div>

<style>
	.resultContainer {
		flex: 1 1 0;
		height: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.result {
		font-size: 32px;
		color: #fff;

		display: flex;
	}

	.score {
		width: 60px;
	}
</style>
