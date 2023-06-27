import Highcharts from 'highcharts';

export default (node, config) => {
	const redraw = true;
	const oneToOne = true;
	const chart = Highcharts.chart(node, config);

	const resizeObserver = new ResizeObserver(() => {
		chart.reflow();
	});

	resizeObserver.observe(node);

	return {
		update: (config) => {
			chart.update(config, redraw, oneToOne);
		},
		destroy: () => {
			resizeObserver.disconnect();
			chart.destroy();
		}
	};
};
