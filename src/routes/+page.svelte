<script>
	import { getMetrics } from '../services/writing.js';
	import Chart from './Chart.svelte';
	import data_pls from '../data/stopwords_prop_pls.json';
	import data_abs from '../data/stopwords_prop_abs.json';

	let text = 'Hello World!';
	let metrics;

	let bins = [];
	let densities_pls = [];
	let densities_abs = [];
	console.log(data_pls);
	for (let i = 0; i < data_pls.length; i++) {
		bins.push(data_pls[i].bin.toFixed(3).toString() + '%');
		densities_pls.push(data_pls[i].density);
		densities_abs.push(data_abs[i].density);
	}

	var options = {
		chart: {
			height: 300,

			type: 'area'
		},
		dataLabels: {
			enabled: false
		},
		series: [
			{
				name: 'Plain Language',
				data: densities_pls
			},
			{
				name: 'Non-Plain Language',
				data: densities_abs
			}
		],
		fill: {
			type: 'gradient',
			gradient: {
				shadeIntensity: 1,
				opacityFrom: 0.7,
				opacityTo: 1,
				stops: [0, 100, 100]
			}
		},
		xaxis: {
			categories: bins,
			tickAmount: 5,
			labels: {
				rotate: 0,
				rotateAlways: true,
				hideOverlappingLabels: true,
				showDuplicates: false,
				minHeight: undefined,
				maxHeight: 120
			},
			title: {
				text: 'Stopword Density',
				offsetX: 0,
				offsetY: 0,
				style: {
					color: undefined,
					fontSize: '12px',
					fontFamily: 'Helvetica, Arial, sans-serif',
					fontWeight: 600,
					cssClass: 'apexcharts-xaxis-title'
				}
			}
		},
		yaxis: {
			labels: {
				formatter: function (val) {
					return val.toFixed(3);
				},
				title: {
					text: 'Density',
					offsetX: 0,
					offsetY: 0,
					style: {
						color: undefined,
						fontSize: '12px',
						fontFamily: 'Helvetica, Arial, sans-serif',
						fontWeight: 600,
						cssClass: 'apexcharts-xaxis-title'
					}
				}
			}
		}
	};
</script>

<input bind:value={text} />
<button on:click={async () => (metrics = await getMetrics(text))}>Get Metrics</button>
<p>{text}</p>

<!-- {#if metrics}
    <p>Metrics: {JSON.stringify(metrics)}</p>
{/if} -->
<Chart {options} />

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
