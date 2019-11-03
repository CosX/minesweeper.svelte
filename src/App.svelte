<script>
	import Slot from './Slot.svelte';
	import { 
		createMinesweeperBoard,
		crawlOpenSlots,
		reveal
	} from './game';
	import settings from './settings';

	export let board = createMinesweeperBoard();
	export let gameOver = false;
	export let suspense = false;
	export let flagsPlaced = 0;

	const slotClicked = event => {
		const slotClicked = event.detail;
		suspense = false;
		if (slotClicked.isOpen && !slotClicked.isNearbyBomb && !slotClicked.isBomb){
			board = crawlOpenSlots(board, slotClicked.ri, slotClicked.si);
		}
		if (slotClicked.isBomb){
			board = reveal(board);
			gameOver = true;
		}
	}

	const slotRightClicked = () => {
		suspense = false;
		flagsPlaced++;
	}

	const slotDown = () => {
		suspense = true;
	}

	const resetGame = () => {
		board = createMinesweeperBoard();
		gameOver = false;
		flagsPlaced = 0;
	}
</script>

<style>
	.middle {
		text-align: center;
		margin-left:auto; 
		margin-right:auto;
	}

	.emo {
		font-size: 2em;
	}
</style>

<div class="middle">
	<h1>Sveltesweeper / Minesvelter</h1>
	<div class="emo">
		{#if gameOver}
			😵
		{:else if suspense}
			😮
		{:else}
			😊
		{/if}
	</div>
	<div>{flagsPlaced}/{settings.bombs} 🚩</div>

	<table class="middle">
		<tbody>
		{#each board as row, ri}
			<tr>
				{#each row as slot, si}
					<Slot current={slot} ri={ri} si={si} on:slotClicked="{slotClicked}" on:slotRightClicked={slotRightClicked} on:slotDown="{slotDown}" />
				{/each}
			</tr>
		{/each}
		</tbody>
		
	</table>

	<button on:click={resetGame}>Reset game</button>
 </div>
