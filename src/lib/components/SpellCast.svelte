<script lang="ts">
	import dictionaryRaw from "$lib/assets/dictionary.txt?raw"
	import { findWordsDFS } from "$lib/utils/GridSearch"
	import { ExampleA } from "$lib/utils/ExampleData"

	const dictionary = dictionaryRaw.split("\n").filter((w) => w.length > 1)
	console.debug("dictionary length:", dictionary.length)

	// const grid = Array.from({ length: 5 }, () => Array(5).fill(""))
	const grid = ExampleA

	function getWeight(char) {
		const tmp = {
			"aeio": 1,
			"rtn": 2,
			"dgl": 3,
			"upm": 4,
			"cf": 5,
			"x": 7,
		}

		return tmp[Object.keys(tmp).find((key) => key.includes(char))]
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

	function onInput(x, y) {
		return (e) => {
			if (e.data.match(/[a-z]/i) !== null) {
				e.target.value = grid[y][x] = e.data.toLowerCase()
				focusNextSibling(e.target)
			} else {
				e.target.value = ""
			}
		}
	}

	function onFocus(e) {
		e.target.value = ""
	}

	function onBlur(cell) {
		return (e) => e.target.value = cell
	}

	function onClickFindWords() {
		console.time("findWords")
		let results = findWordsDFS(grid, dictionary)
		console.timeEnd("findWords")
		console.debug("results:", results)
	}

	$: {
		console.table(grid)
	}
</script>

<div class="game">
	{#each grid as row, y}
		<div class="row">
			{#each row as cell, x}
				<div class="cell">
					<input value={cell}
						   on:input={onInput(x, y)}
						   on:focus={onFocus}
						   on:blur={onBlur(cell)}
						   class="char"
					>
					<div class="weight">{getWeight(cell)}</div>
				</div>
			{/each}
		</div>
	{/each}

	<div class="actionWrapper">
		<div class="action" on:click={onClickFindWords}>
			Find Words
		</div>
	</div>
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
	}

	.char {
		width: 40px;
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
	}

	.action {
		background: #1cb0f6;
		border-bottom: solid 5px #137cad;
		color: white;
		border-radius: 15px;
		padding: 4px 16px;

		font-size: 32px;
		font-weight: 400;
		user-select: none;
		cursor: pointer;

		transition: all 0.2s ease-in-out;
	}

	.action:hover {
		filter: brightness(1.1);
	}

	.action:hover:active {
		filter: brightness(1.3);
	}

	.actionWrapper {
		display: flex;
		justify-content: center;
		margin-top: 16px;
	}
</style>
