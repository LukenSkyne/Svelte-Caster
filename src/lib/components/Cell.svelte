<script lang="ts">
	import { grid, x2multiplier, doubleLetter, tripleLetter, selectedPath } from "$lib/utils/Store"
	import { getWeight, pointEquals } from "$lib/utils/GameLogic"
	import { cubicInOut } from "svelte/easing"
	import { scale } from "svelte/transition"

	export let cell: string
	export let x: number
	export let y: number

	$: isX2 = pointEquals({ x, y }, $x2multiplier)
	$: isDoubleLetter = pointEquals({ x, y }, $doubleLetter)
	$: isTripleLetter = pointEquals({ x, y }, $tripleLetter)
	$: letterMultiplier = isTripleLetter ? 3 : isDoubleLetter ? 2 : 1
	$: weight = getWeight(cell) * letterMultiplier
	let isSelected = false

	$: if ($selectedPath !== undefined) {
		isSelected = $selectedPath.some((p) => {
			return pointEquals(p, { x, y })
		})
	}

	function focusNextSibling(element) {
		const n = element.parentElement.nextElementSibling
		const m = element.parentElement.parentElement.nextElementSibling

		if (n !== null) {
			n.firstElementChild.focus()
		} else if (m !== null) {
			m.firstElementChild.firstElementChild.focus()
		} else {
			element.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.focus()
		}
	}

	function onInput(e) {
		const t1 = e.data === "1"
		const t2 = e.data === "2"
		const t3 = e.data === "3"

		if (t1 || t2 || t3) {
			$x2multiplier = isX2 ? undefined : (!t1 ? $x2multiplier : { x, y })
			$doubleLetter = isDoubleLetter ? undefined : (!t2 ? $doubleLetter : { x, y })
			$tripleLetter = isTripleLetter ? undefined : (!t3 ? $tripleLetter : { x, y })
		}

		if (e.data.match(/[a-z]/i) !== null) {
			e.target.value = $grid[y][x] = e.data.toLowerCase()
			focusNextSibling(e.target)
		} else {
			e.target.value = ""
		}
	}

	function onFocus(e) {
		e.target.value = ""
	}

	function onBlur(cell) {
		return (e) => e.target.value = cell
	}
</script>

<div class="cell" class:x2={isX2} class:selected={isSelected}>
	<input value={cell}
		   on:input={onInput}
		   on:focus={onFocus}
		   on:blur={onBlur(cell)}
		   class="char"
	>
	{#if weight !== 0}
		<div class="weight">
			{weight}
		</div>
	{/if}
	{#if isX2}
		<div class="multiLetter x2multiplier" transition:scale={{ duration: 200, easing: cubicInOut }}>
			2X
		</div>
	{:else if isTripleLetter}
		<div class="multiLetter tripleLetter" transition:scale={{ duration: 200, easing: cubicInOut }}>
			TL
		</div>
	{:else if isDoubleLetter}
		<div class="multiLetter doubleLetter" transition:scale={{ duration: 200, easing: cubicInOut }}>
			DL
		</div>
	{/if}
</div>

<style>
	.cell {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;

		width: 74px;
		aspect-ratio: 1;
		border-radius: 20px;
		border: double 6px transparent;
		--bg-color: hsl(0, 100%, 100%);
		--slope-color: hsl(30, 100%, 95%);
		--slope-color-dark: hsl(23, 100%, 89%);
		--edge-color: hsl(22, 12%, 50%, 70%);
		background-image: linear-gradient(var(--bg-color), var(--bg-color)), linear-gradient(135deg, var(--slope-color) 50%, var(--slope-color-dark) 50%);
		background-origin: border-box;
		background-clip: content-box, border-box;
		box-shadow: inset 0 calc(-1px / 4) 0 calc(1px / 4) var(--edge-color);

		transition: all 0.2s ease-out;
		transition-property: scale, box-shadow;
	}

	.x2 {
		box-shadow: inset 0 calc(-1px / 4) 0 calc(1px / 4) var(--edge-color), 0 0 0 5px #ff23eb;
	}

	.selected {
		--selected-border: #004ea2;
		--selected-border-hl: #0079db;
		--selected-bg: #00b5de;
		--selected-bg-hl: #00d6e4;

		scale: 0.9;
		color: #fff;
		background-image: linear-gradient(
				130deg,
				var(--selected-bg) 40%,
				var(--selected-bg-hl) 40%,
				var(--selected-bg-hl) 62%,
				var(--selected-bg) 62%
		),
		linear-gradient(
				130deg,
				var(--selected-border) 40%,
				var(--selected-border-hl) 40%,
				var(--selected-border-hl) 62%,
				var(--selected-border) 62%
		);
	}

	.char {
		width: 42px;
		aspect-ratio: 1;

		background: none;
		color: currentColor;

		border: none;
		outline: none;
		font-size: 40px;
		font-weight: 900;
		text-align: center;
		font-family: inherit;
		text-transform: uppercase;
	}

	.weight {
		position: absolute;
		right: 6px;
		bottom: 1px;
		pointer-events: none;
		user-select: none;
	}

	.multiLetter {
		position: absolute;
		top: -12px;
		left: -12px;
		width: 32px;
		aspect-ratio: 1;

		display: grid;
		place-content: center;
		pointer-events: none;
		font-weight: 900;

		color: white;
		background: black;
		border-radius: 100%;
	}

	.doubleLetter {
		box-shadow: 0 0 0 3px #fcf5a3;
	}

	.tripleLetter {
		box-shadow: 0 0 0 3px #d67040;
	}

	.x2multiplier {
		box-shadow: 0 0 0 3px #ff23eb;
		left: unset;
		right: -12px;
	}
</style>
