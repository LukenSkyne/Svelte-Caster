<script lang="ts">
	import SpellCast from "$lib/components/SpellCast.svelte"
</script>

<svelte:head>
	<title>SpellCaster</title>
</svelte:head>

<div class="container">
	<SpellCast />
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
	}
</style>
