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

{#if !current.isOpen}
    <td on:click={click}>
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

