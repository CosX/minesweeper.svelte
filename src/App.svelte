<script>
	import Slot from './Slot.svelte';
	import { createMinesweeperBoard } from './generator';

	export let board = createMinesweeperBoard();
</script>

<style>
	h1 {
		color: #DDD;
	}
</style>

<table>
	<tbody>
	{#each board as row}
		<tr>
			{#each row as slot}
				<Slot current={slot} />
			{/each}
		</tr>
	{/each}
	</tbody>
	
</table>
