<script>
	import highcharts from '../services/graph.js';
	import stopwords_abs from '../data/stopwords_prop_abs.json';
	import stopwords_pls from '../data/stopwords_prop_pls.json';
	import nouns_abs from '../data/nouns_prop_abs.json';
	import nouns_pls from '../data/nouns_prop_pls.json';
	import passive_voice_abs from '../data/passive_voice_prop_abs.json';
	import passive_voice_pls from '../data/passive_voice_prop_pls.json';
	import adjectives_abs from '../data/adjectives_prop_abs.json';
	import adjectives_pls from '../data/adjectives_prop_pls.json';
	import verbs_abs from '../data/verbs_prop_abs.json';
	import verbs_pls from '../data/verbs_prop_pls.json';

	let selected;
	export let text;
	let features = [
		{
			id: 1,
			text: `Stopwords`
		},
		{
			id: 2,
			text: `Nouns`
		},
		{
			id: 3,
			text: `Passive voice`
		},
		{
			id: 4,
			text: `Adjectives`
		},
		{
			id: 5,
			text: `verbs`
		}
	];

	let data_abs = verbs_abs;
	let data_pls = verbs_pls;

	let bins = [];
	let densities_pls = [];
	let densities_abs = [];
	let title;
	let feature;
	var config = {};

	function handleSubmit() {
		// alert(
		// 	`answered question ${selected.id} (${selected.text}) with "${text}"`
		// );
		if (selected.id == 1) {
			data_abs = stopwords_abs;
			data_pls = stopwords_pls;
			feature = 'stopwords';
			title = 'Distribution of Stopword Proportion';
		} else if (selected.id == 2) {
			data_abs = nouns_abs;
			data_pls = nouns_pls;
			feature = 'nouns';
			title = 'Distribution of Noun Proportion';
		} else if (selected.id == 3) {
			data_abs = passive_voice_abs;
			data_pls = passive_voice_pls;
			feature = 'passive voice';
			title = 'Distribution of Passive Voice Proportion';
		} else if (selected.id == 4) {
			data_abs = adjectives_abs;
			data_pls = adjectives_pls;
			feature = 'adjectives';
			title = 'Distribution of Adjective Proportion';
		} else if (selected.id == 5) {
			data_abs = verbs_abs;
			data_pls = verbs_pls;
			feature = 'verbs';
			title = 'Distribution of Verb Proportion';
		}

		bins = [];
		densities_pls = [];
		densities_abs = [];

		for (let i = 0; i < data_pls.length; i++) {
			bins.push(data_pls[i].bin);
			densities_pls.push(data_pls[i].density);
			densities_abs.push(data_abs[i].density);
		}

		config = {
			chart: {
				type: 'area',
				zoomType: 'x',
				panning: true,
				panKey: 'shift'
			},

			title: {
				text: title,
				style: {
					fontSize: '23px',
					fontWeight: 'bold'
				}
			},
			subtitle: {
				text: 'Source: <a href="https://www.cochranelibrary.com/" ' + 'target="_blank">CDSR</a>'
			},
			responsive: {
				rules: [
					{
						condition: {
							maxWidth: 500
						},
						chartOptions: {
							legend: {
								align: 'center',
								verticalAlign: 'bottom',
								borderWidth: 0,
								layout: 'horizontal'
							},
							yAxis: {
								labels: {
									align: 'left',
									x: 0,
									y: -5
								},
								title: {
									text: null
								}
							},
							xAxis: {
								tickInterval: 40, // SET THIS
								tickPixelInterval: 50,
								tickmarkPlacement: 'off'
							},
							subtitle: {
								text: null
							},
							credits: {
								enabled: false
							}
						}
					}
				]
			},
			xAxis: {
				allowDecimals: true,
				categories: bins,
				labels: {
					rotation: 0,
					formatter: function () {
						return this.value.toFixed(3) + '%';
					}
				},
				title: {
					text: 'Proportion of ' + feature
				},
				plotLines: [
					{
						color: '#FF0000', // Red
						width: 2,
						value: 5.5,
						dashStyle: 'dash'
					}
				],
				tickInterval: 20, // SET THIS
				tickPixelInterval: 80,
				tickmarkPlacement: 'on'
			},
			yAxis: {
				title: {
					text: 'Density'
				}
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.y:,.3f}</b><br/>',
				valueSuffix: ' of density'
				// shared: true
			},
			exporting: {
				enabled: true
			},
			plotOptions: {
				area: {
					pointStart: 0,
					marker: {
						enabled: false,
						symbol: 'circle',
						radius: 2,
						states: {
							hover: {
								enabled: true
							}
						}
					}
				}
			},
			series: [
				{
					name: 'Plain Language Summaries',
					data: densities_pls
				},
				{
					name: 'Non-Plain Language Summaries',
					data: densities_abs
				}
			]
		};
	}
</script>

<figure class="highcharts-figure">
	{#if feature}
		<div id="container">
			<div class="chart" use:highcharts={config} />
		</div>
	{:else}
		<!-- Big text occuping the same space as the chart -->
		<div id="container" class="text-center text-2xl font-bold">
			Select a feature to see its distribution
		</div>
	{/if}

	<form on:submit|preventDefault={handleSubmit}>
		<div class="grid grid-cols-2 gap-0">
			<select
				class="form-select w-full mr-5 sm:col-span-1"
				aria-label="Default select example"
				bind:value={selected}
				on:change={() => (text = '')}
			>
				{#each features as question}
					<option value={question}>
						{question.text}
					</option>
				{/each}
			</select>
			<!-- <input bind:value={answer} /> -->
			<button
				disabled={!selected}
				type="submit"
				class="ml-5 bg-blue-500 hover:bg-indigo-500 text-white py-2 px-4 rounded"
			>
				Submit
			</button>
		</div>
	</form>
</figure>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
	.highcharts-figure,
	.highcharts-data-table table {
		min-width: 310px;
		max-width: 800px;
		margin: 1em auto;
	}

	.highcharts-data-table table {
		font-family: Verdana, sans-serif;
		border-collapse: collapse;
		border: 1px solid #ebebeb;
		margin: 10px auto;
		text-align: center;
		width: 100%;
		max-width: 500px;
	}

	.highcharts-data-table caption {
		padding: 1em 0;
		font-size: 1.2em;
		color: #555;
	}

	.highcharts-data-table th {
		font-weight: 600;
		padding: 0.5em;
	}

	.highcharts-data-table td,
	.highcharts-data-table th,
	.highcharts-data-table caption {
		padding: 0.5em;
	}

	.highcharts-data-table thead tr,
	.highcharts-data-table tr:nth-child(even) {
		background: #f8f8f8;
	}

	.highcharts-data-table tr:hover {
		background: #f1f7ff;
	}

	#button-bar {
		min-width: 310px;
		max-width: 800px;
		margin: 0 auto;
	}
</style>
