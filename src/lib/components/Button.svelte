<script lang="ts">
	export let text: string
	export let action: () => void
</script>

<div class="action" on:click={action} on:keypress={action}>
	{text}
</div>

<style>
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
</style>
