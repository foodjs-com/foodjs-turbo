<script lang="ts">
	import { Theme } from "./themeSettingsStore";
	let { theme, setTheme: untypedSetTheme } = $props();
	let setTheme = untypedSetTheme as (theme: Theme) => void;
	let list: Theme[] = [Theme.Dark, Theme.Light, Theme.Default];
</script>

<div class="mb-10">
	<div>
		{#each list as selectedTheme}
			<button
				type="button"
				class="btn capitalize"
				class:btn-outline={selectedTheme === theme}
				on:click={() => setTheme(selectedTheme)}
			>
				{#if selectedTheme === Theme.Dark}
					<i class="fa-solid fa-moon" />
				{:else if selectedTheme === Theme.Light}
					<i class="fa-solid fa-sun" />
				{:else}
					<i class="fa-solid fa-desktop" />
				{/if}
				{selectedTheme}
			</button>
		{/each}
	</div>
</div>
