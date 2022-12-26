<script lang="ts">
	import type { RatedResult, Result } from "$lib/utils/Types"
	import { cubicInOut } from "svelte/easing"
	import { scale } from "svelte/transition"
	import { selectedPath } from "$lib/utils/Store"

	export let ratedResults: RatedResult[]
	let selected = 0

	$: if (ratedResults.length > 0) {
		$selectedPath = ratedResults[0].path
		selected = 0
	} else {
		$selectedPath = undefined
	}

	function onClickResult(res: Result, index: number) {
		return () => {
			selected = index
			$selectedPath = res.path
		}
	}
</script>

<div class="resultContainer">
	{#if ratedResults.length === 0}
		<div class="result" transition:scale={{ duration: 200, easing: cubicInOut }}>No Results Yet</div>
	{:else}
		{#each ratedResults.slice(0, 10) as res, index}
			<div class="result"
				 class:selected={selected === index}
				 on:click={onClickResult(res, index)}
				 on:keypress
				 transition:scale={{ duration: 200, easing: cubicInOut }}>
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
		height: 50%;
		width: 300px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.result {
		font-size: 32px;
		color: #fff;

		display: flex;
		user-select: none;

		transition: all 0.2s ease-out;
	}

	.selected, .result:hover {
		color: #00ffff;
		cursor: pointer;
	}

	.score {
		width: 60px;
	}
</style>
