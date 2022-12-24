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

		background: #000b19;
		border-radius: 12px;
		padding: 26px;
		box-shadow: 0 0 0 8px #004f82, 0 0 0 16px #00c1db;
	}

	.row {
		display: flex;
		flex-direction: row;
		gap: 19px;
	}
</style>
