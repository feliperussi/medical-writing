<script>
	import { getMetrics } from '../services/writing.js';
	import Chart from './Chart.svelte';

	let text = 'Hello World!';
	let metrics;
	let selected;
	let answer = '';


</script>

<!-- <input bind:value={text} />
<button on:click={async () => (metrics = await getMetrics(text))}>Get Metrics</button>
<p>{text}</p> -->

<!-- {#if metrics}
	<p>Metrics: {JSON.stringify(metrics)}</p>
{/if} -->
<!-- Make 2x1 division and 30-->
<main>
	<div class="grid md:grid-cols-7 sm:grid-cols-1">
		<section class="entry-form form col-span-3" id="entry-form">
			<div class="grid grids-rows-3 form-group ml-8 my-4">
				<!-- Centered text -->
				<label for="exampleFormControlTextarea1" class="text-center text-2xl font-bold my-3">Enter your text here</label>
				<textarea bind:value={text} class="form-control resize-none p-2 border-3 mb-4" id="exampleFormControlTextarea1" rows="14" cols="30"></textarea>
				<!-- <button on:click={async () => (metrics = await getMetrics(text))}>Get Metrics</button> -->
				<button
						disabled={!text}
						type="submit"
						class="mx-20 bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded"
					>
						Get Metrics
					</button>
			  </div>
			  <p>{text}</p>

		</section>
		<!-- Margin -->
		<section class="form m-10 col-span-4">
			<Chart text={text} />
		</section>
	</div>
</main>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
