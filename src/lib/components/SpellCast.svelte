<script lang="ts">
	import { Empty, ExampleA } from "$lib/utils/ExampleData"
	import { grid, x2multiplier, doubleLetter, tripleLetter } from "$lib/utils/Store"
	import Cell from "$lib/components/Cell.svelte"

	$grid = Empty

	$: {
		console.log("$x2multiplier", $x2multiplier)
		console.log("doubleLetter", $doubleLetter)
		console.log("tripleLetter", $tripleLetter)
	}

	$: {
		console.table($grid)
	}
</script>

<div class="game">
	{#each $grid as row, y}
		<div class="row">
			{#each row as cell, x}
				<Cell {cell} {x} {y} />
			{/each}
		</div>
	{/each}
</div>

<style>
	.game {
		display: flex;
		flex-direction: column;
		gap: 19px;
	}

	.row {
		display: flex;
		flex-direction: row;
		gap: 19px;
	}
</style>
