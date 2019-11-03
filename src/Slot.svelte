<script>
    import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
    export let current;
    export let ri;
    export let si;
    
    function click() {
        current.isOpen = true;
        dispatch('slotClicked', {...current, ri, si});
    }
</script>
<style>
    td {
        font-size: 2em;
    }

    td:hover,
	td:focus {
		cursor: pointer;
	}
</style>
{#if !current.isOpen}
    <td on:mouseup={click} on:mousedown={() => dispatch('slotDown')}>
        🤔
    </td>
{:else}
    <td>
        {#if current.isBomb}
            💣
        {:else if current.isFlagged}
            🚩
        {:else if current.isNearbyBomb}
            {current.numberOfBombsNearby}
        {/if}
    </td>
{/if}

