<svelte:options runes={true} />

<script lang="ts">
	// let modal: HTMLDialogElement = $props();
	let { modal } = $props();
</script>

<dialog bind:this={modal} on:close class="modal">
	<div class="modal-box">
		<!-- <h3 class="font-bold text-lg">Hello!</h3>
		<p class="py-4">Press ESC key or click outside to close</p> -->
		<slot />
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
