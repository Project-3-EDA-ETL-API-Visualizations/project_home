const myChart = {
	labels: ['Historical Land Area', 'Federal Land Area'],
	datasets: [{
	  label: 'Area Change (divided by 1 million)',
	  data: [409888280793.65576/1000000000, 4208629635.777346/1000000000],
	  backgroundColor: [
		'rgba(0, 100, 0, 1)',
		'rgba(139, 69, 19, 1)',
	  ],
	}]
  };
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
	type: 'bar',
	data: myChart,
	options: {
	  scales: {
		y: {
		  beginAtZero: true
		}
	},
	plugins: {
	title: {
	  display: true,
	  text: 'Historical Land Area vs Federally Recognized Land Area',
	  font: {
		size: 20,
		weight: 'bold'
	  },
	  color: 'black'
	}
}
}
});