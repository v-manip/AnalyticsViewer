var analytics = {

	scatterPlot: function(arg){
		console.log("Scatter");
		/*###############################################################*/
		/*########################### D3JS Test #########################*/
		/*###############################################################*/

		//console.log(this.$el.width());
		var el = d3.select(arg.selector);
		$(arg.selector).empty();

		var margin = {top: 20, right: 20, bottom: 30, left: 40},
		    width = 960 - margin.left - margin.right,
		    height = 500 - margin.top - margin.bottom;

		
		var x = d3.scale.linear()
		    .range([0, width]);

		var y = d3.scale.linear()
		    .range([height, 0]);

		var color = d3.scale.category10();

		var xAxis = d3.svg.axis()
		    .scale(x)
		    .orient("bottom");

		var yAxis = d3.svg.axis()
		    .scale(y)
		    .orient("left");

		var svg = el.append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		  .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		d3.tsv("data.tsv", function(error, data) {
		  data.forEach(function(d) {
		    d.sepalLength = +d.sepalLength;
		    d.sepalWidth = +d.sepalWidth;
		  });

		  x.domain(d3.extent(data, function(d) { return d.sepalWidth; })).nice();
		  y.domain(d3.extent(data, function(d) { return d.sepalLength; })).nice();

		  svg.append("g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + height + ")")
		      .call(xAxis)
		    .append("text")
		      .attr("class", "label")
		      .attr("x", width)
		      .attr("y", -6)
		      .style("text-anchor", "end")
		      .text("Sepal Width (cm)");

		  svg.append("g")
		      .attr("class", "y axis")
		      .call(yAxis)
		    .append("text")
		      .attr("class", "label")
		      .attr("transform", "rotate(-90)")
		      .attr("y", 6)
		      .attr("dy", ".71em")
		      .style("text-anchor", "end")
		      .text("Sepal Length (cm)")

		  svg.selectAll(".dot")
		      .data(data)
		    .enter().append("circle")
		      .attr("class", "dot")
		      .attr("r", 3.5)
		      .attr("cx", function(d) { return x(d.sepalWidth); })
		      .attr("cy", function(d) { return y(d.sepalLength); })
		      .style("fill", function(d) { return color(d.species); });

		  var legend = svg.selectAll(".legend")
		      .data(color.domain())
		    .enter().append("g")
		      .attr("class", "legend")
		      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

		  legend.append("rect")
		      .attr("x", width - 18)
		      .attr("width", 18)
		      .attr("height", 18)
		      .style("fill", color);

		  legend.append("text")
		      .attr("x", width - 24)
		      .attr("y", 9)
		      .attr("dy", ".35em")
		      .style("text-anchor", "end")
		      .text(function(d) { return d; });

	      });
	},

	boxPlot: function(arg){
		console.log("boxPlot");
		var margin = {top: 10, right: 50, bottom: 20, left: 50},
		    width = 120 - margin.left - margin.right,
		    height = 500 - margin.top - margin.bottom;

		var min = Infinity,
		    max = -Infinity;

		var chart = d3.box()
		    .whiskers(iqr(1.5))
		    .width(width)
		    .height(height);

		d3.csv("FSC_filtered_new.csv", function(error, csv) {
		  var data = [];

		  csv.forEach(function(x) {
		    var e = Math.floor(x.Index - 1),
		        //r = Math.floor(x.Run - 1),
		        s = Math.floor(x.Value),
		        d = data[e];
		    if (!d) d = data[e] = [s];
		    else d.push(s);
		    if (s > max) max = s;
		    if (s < min) min = s;
		  });

		  chart.domain([min, max]);

		  var svg = d3.select("body").selectAll("svg")
		      .data(data)
		    .enter().append("svg")
		      .attr("class", "box")
		      .attr("width", width + margin.left + margin.right)
		      .attr("height", height + margin.bottom + margin.top)
		    .append("g")
		      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		      .call(chart);

		  //setInterval(function() {
		  //  svg.datum(randomize).call(chart.duration(1000));
		  //}, 2000);
		});

	},

	hovPlot: function(arg){
		console.log("hovPlot");
	},


	parallelsPlot: function(arg){
		console.log("parallelsPlot");
	},

}