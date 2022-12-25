<script lang="ts">
	import { Empty, ExampleA } from "$lib/utils/ExampleData"
	import { grid, selectedPath } from "$lib/utils/Store"
	import Cell from "$lib/components/Cell.svelte"
	import type { Line, Point } from "$lib/utils/Types"

	$grid = Empty

	let svgCanvas: SVGElement | undefined
	let lines: Line[] = []

	function getCellCenter(point: Point, cells, rect: DOMRect): Point {
		const cellIndex = (point.y * $grid.length) + point.x
		const cellRect = cells[cellIndex].getBoundingClientRect()

		return {
			x: (cellRect.x - rect.x + cellRect.width * 0.5),
			y: (cellRect.y - rect.y + cellRect.height * 0.5),
		}
	}

	$: if ($selectedPath !== undefined && svgCanvas !== undefined) {
		const cells = document.querySelectorAll(".cell")
		const svgRect = svgCanvas?.getBoundingClientRect()
		lines = []

		for (let i = 0; ++i < $selectedPath.length;) {
			const a = $selectedPath[i - 1]
			const b = $selectedPath[i]
			const centerA = getCellCenter(a, cells, svgRect)
			const centerB = getCellCenter(b, cells, svgRect)

			lines.push({
				a: centerA,
				b: centerB,
			})
		}
	}

	$: {
		console.table($grid)
	}
</script>

<div class="gameContainer">
	<svg bind:this={svgCanvas} class="selectedPath">
		{#each lines as li}
			<line x1={li.a.x} y1={li.a.y} x2={li.b.x} y2={li.b.y} stroke="#00ffff" stroke-width="10" />
		{/each}
	</svg>
	<div class="game">
		{#each $grid as row, y}
			<div class="row">
				{#each row as cell, x}
					<Cell {cell} {x} {y} />
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.gameContainer {
		position: relative;
		background: #000b19;
		border-radius: 12px;
		padding: 26px;
		box-shadow: 0 0 0 8px #004f82, 0 0 0 16px #00c1db;
	}

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

	.selectedPath {
		position: absolute;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
</style>
