<script>
	import highcharts from '../services/graph.js';
	import data_abs from '../data/stopwords_prop_abs.json';
	import data_pls from '../data/stopwords_prop_pls.json';

	let features = [
		{
			id: 1,
			text: `Stopwords`
		},
		{
			id: 2,
			text: `Times`
		},
        {
            id: 3,
            text: `active_to_passive`
        }
	];

	let bins = [];
	let densities_pls = [];
	let densities_abs = [];

	for (let i = 0; i < data_pls.length; i++) {
		bins.push(data_pls[i].bin);
		densities_pls.push(data_pls[i].density);
		densities_abs.push(data_abs[i].density);
	}

	let title = 'Distribution of Stopword Proportions';
	let feature = 'stopwords';
	var config = {
		chart: {
			type: 'area',
			zoomType: 'x',
			panning: true,
			panKey: 'shift'
		},

		title: {
			text: title
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
			valueSuffix: ' of density',
			shared: true
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


</script>

<figure class="highcharts-figure">
	<div id="container">
		<div class="chart" use:highcharts={config} />
	</div>
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
