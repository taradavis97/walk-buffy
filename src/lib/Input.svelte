<script>
import { browser } from '$app/environment';

let name = $state(browser ? localStorage.getItem('walkerName') ?? '' : '');
 


$effect(() => {
    if (browser) localStorage.setItem('walkerName', name); 
});
</script>

<input class=input type="text" name="walkerName" placeholder="Enter your name..." bind:value={name}/>


<style>
   .input {
    border: solid darkgrey 2px;
    border-radius: 8px;
    padding-inline: 1rem;
    color: black;
    text-transform: capitalize;
   }

</style>