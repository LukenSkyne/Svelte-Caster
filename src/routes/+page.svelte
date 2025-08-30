<script lang="ts">
	import SpellCast from "$lib/components/SpellCast.svelte"

	import { doubleLetter, grid, tripleLetter, x2multiplier } from "$lib/utils/Store"
	import { getWeightEx, pointEquals } from "$lib/utils/GameLogic"
	import { findWordsDFS } from "$lib/utils/GridSearch"
	import ResultDrawer from "$lib/components/ResultDrawer.svelte"
	import dictionaryRaw from "$lib/assets/dictionary.txt?raw"
	import type { RatedResult, Result } from "$lib/utils/Types"

	let results: Result[]
	let ratedResults: RatedResult[] = []

	const dictionary = dictionaryRaw.split(/\r\n?/g).filter((w) => w.length > 1)
	console.debug("dictionary length:", dictionary.length)

	$: {
		console.table($grid)
	}

	$: {
		console.time("findWords")
		results = findWordsDFS($grid, dictionary)
		console.timeEnd("findWords")
	}

	$: {
		$x2multiplier
		$doubleLetter
		$tripleLetter

		ratedResults = results.map((result) => {
			let score = result.path
					.map((p) => getWeightEx(p))
					.reduce((prev, current) => prev + current)

			if (result.path.findIndex((p) => pointEquals(p, $x2multiplier)) !== -1) {
				score *= 2
			}

			if (result.word.length > 5) {
				score += 10
			}

			return {
				word: result.word,
				path: result.path,
				score,
			}
		}).sort((a, b) => b.score - a.score)

		console.debug("ratedResults:", ratedResults)
	}
</script>

<svelte:head>
	<title>SvelteCaster</title>
</svelte:head>

<div class="container">
	<div class="gameWrapper">
		<SpellCast />
	</div>
	<ResultDrawer {ratedResults} />
</div>

<style>
	@font-face {
		font-family: Satoshi;
		src: url(/fonts/Satoshi-Regular.otf);
		font-weight: 400;
	}

	@font-face {
		font-family: Satoshi;
		src: url(/fonts/Satoshi-Bold.otf);
		font-weight: 700;
	}

	@font-face {
		font-family: Satoshi;
		src: url(/fonts/Satoshi-Black.otf);
		font-weight: 900;
	}

	:global(body) {
		margin: 0;
		background: #000b19;

		font-family: Satoshi, serif;
	}

	.container {
		height: 100vh;
		overflow: hidden;

		display: flex;
		align-items: center;
		justify-content: center;

		gap: 64px;
	}

	.gameWrapper {
		display: grid;
		place-content: center;
	}
</style>
