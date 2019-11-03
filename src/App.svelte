<script>
	import Slot from './Slot.svelte';
	import { createMinesweeperBoard, crawlOpenSlots } from './game';

	export let board = createMinesweeperBoard();

	function slotClicked(event) {
		const slotClicked = event.detail;
		if (slotClicked.isOpen && !slotClicked.isNearbyBomb && !slotClicked.isBomb){
			board = crawlOpenSlots(board, slotClicked.ri, slotClicked.si);
		}
	}
</script>

<style>
</style>

<table>
	<tbody>
	{#each board as row, ri}
		<tr>
			{#each row as slot, si}
				<Slot current={slot} ri={ri} si={si} on:slotClicked="{slotClicked}" />
			{/each}
		</tr>
	{/each}
	</tbody>
	
</table>
