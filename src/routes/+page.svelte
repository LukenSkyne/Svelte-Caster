<script lang="ts">
	import SpellCast from "$lib/components/SpellCast.svelte"
	import Button from "$lib/components/Button.svelte"

	import { doubleLetter, grid, tripleLetter, x2multiplier } from "$lib/utils/Store"
	import { getWeight, getWeightEx, pointEquals } from "$lib/utils/GameLogic"
	import { findWordsDFS } from "$lib/utils/GridSearch"
	import type { RatedResult } from "$lib/utils/Types"

	import dictionaryRaw from "$lib/assets/dictionary.txt?raw"
	import ResultDrawer from "$lib/components/ResultDrawer.svelte"

	const dictionary = dictionaryRaw.split("\n").filter((w) => w.length > 1)
	console.debug("dictionary length:", dictionary.length)

	let ratedResults: RatedResult[] = []

	function onClickFindWords() {
		if ($grid === undefined) {
			return
		}

		console.time("findWords")
		const results = findWordsDFS($grid, dictionary)
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
		console.timeEnd("findWords")

		console.debug("ratedResults:", ratedResults)
	}

	$: {
		$x2multiplier
		$doubleLetter
		$tripleLetter
		onClickFindWords()
	}
</script>

<svelte:head>
	<title>SvelteCaster</title>
</svelte:head>

<div class="container">
	<!--	<div class="actionWrapper">-->
	<!--		<Button text="Find Words" action={onClickFindWords} />-->
	<!--	</div>-->

	<div class="gameWrapper">
		<SpellCast />
	</div>
	<ResultDrawer {ratedResults} />
</div>

<style>
	@font-face {
		font-family: Satoshi;
		src: url(fonts/Satoshi-Regular.otf);
		font-weight: 400;
	}

	@font-face {
		font-family: Satoshi;
		src: url(fonts/Satoshi-Bold.otf);
		font-weight: 700;
	}

	@font-face {
		font-family: Satoshi;
		src: url(fonts/Satoshi-Black.otf);
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

	.actionWrapper {
		position: absolute;
		top: 16px;
		left: 16px;
	}

	.gameWrapper {
		display: grid;
		place-content: center;
	}
</style>
