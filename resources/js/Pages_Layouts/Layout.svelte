<script>
 import Header from '@/Pages_Elements/Header.svelte';
 import Footer from '@/Pages_Elements/Footer.svelte';
</script>

<style>

</style>

<Header/>

<div class="container">
	<slot></slot>
</div>

<br>
<Footer/>