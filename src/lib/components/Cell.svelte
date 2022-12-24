<script lang="ts">
	import { grid, x2multiplier, doubleLetter, tripleLetter } from "$lib/utils/Store"
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
		if (e.data === "1") {
			if (!isX2) {
				$x2multiplier = { x, y }
			} else {
				$x2multiplier = undefined
			}
		} else if (e.data === "2") {
			if (!isDoubleLetter) {
				$doubleLetter = { x, y }
			} else {
				$doubleLetter = undefined
			}
		} else if (e.data === "3") {
			if (!isTripleLetter) {
				$tripleLetter = { x, y }
			} else {
				$tripleLetter = undefined
			}
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

<div class="cell" class:x2={isX2}>
	<input value={cell}
		   on:input={onInput}
		   on:focus={onFocus}
		   on:blur={onBlur(cell)}
		   class="char"
	>
	<div class="weight">{weight}</div>
	{#if isX2}
		<div transition:scale={{ duration: 200, easing: cubicInOut }} class="multiLetter x2multiplier">
			2X
		</div>
	{:else if isTripleLetter}
		<div transition:scale={{ duration: 200, easing: cubicInOut }} class="multiLetter tripleLetter">
			TL
		</div>
	{:else if isDoubleLetter}
		<div transition:scale={{ duration: 200, easing: cubicInOut }} class="multiLetter doubleLetter">
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

		transition: box-shadow 0.2s ease-out;
	}

	.x2 {
		box-shadow: inset 0 calc(-1px / 4) 0 calc(1px / 4) var(--edge-color), 0 0 0 5px #ff23eb;
	}

	.char {
		width: 42px;
		aspect-ratio: 1;

		border: none;
		outline: none;
		font-size: 40px;
		text-align: center;
		font-family: inherit;
		font-weight: 900;
		text-transform: uppercase;
	}

	.weight {
		position: absolute;
		right: 6px;
		bottom: 1px;
		pointer-events: none;
		user-select: none;
	}

	.x2multiplier {
		position: absolute;
		top: 6px;
		right: 1px;
		pointer-events: none;
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
