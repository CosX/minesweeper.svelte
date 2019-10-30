<script>
	export let current;
    
    function click() {
		current.isOpen = true;
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
        {:else}
            🙂
        {/if}
    </td>
{/if}

