var analytics = {

	margin : {top: 20, right: 20, bottom: 90, left: 70},
	

	scatterPlot: function(arg){
		console.log("Scatter");
		
  var chart = nv.models.scatterChart()
                .showDistX(true)
                .showDistY(true)
                .useVoronoi(true)
                .color(d3.scale.category10().range())
                .transitionDuration(300)
                ;

  chart.xAxis.tickFormat(d3.format('.02f'));
  chart.yAxis.tickFormat(d3.format('.02f'));
  chart.tooltipContent(function(key) {
      return '<h2>' + key + '</h2>';
  });

     var el = d3.select(arg.selector);
		var el = d3.select(arg.selector);
		$(arg.selector).empty();
		var width = $(arg.selector).width() - analytics.margin.left - analytics.margin.right,
			height = $(arg.selector).height() - analytics.margin.top - analytics.margin.bottom;

			var mine = d3.csv.parse(arg.data);
   el.append("svg")
			.attr("display", "block")
			.attr("width", width)
		    .attr("height", height)
	   .datum(convertData(mine, mine.length, 40))
       .call(chart);

  nv.utils.windowResize(chart.update);

  chart.dispatch.on('stateChange', function(e) { ('New State:', JSON.stringify(e)); });

function convertData(inputData) {
   var data = [];
   var uniqueArray = [];

	for (i = 0; i < inputData.length; i++) {
		if (uniqueArray.indexOf(inputData[i].id) == -1)
		{
			uniqueArray.push(inputData[i].id);
			data.push({
				key: inputData[i].id,
				values: []
			});
		}
	}
	 
	for (j = 0; j < uniqueArray.length; j++) {
		for (k = 0; k < inputData.length; k++)
		{
			if (inputData[k].id == uniqueArray[j])
			{
				data[j].values.push({
				  x: inputData[k].val1
				, y: inputData[k].val2
				, size: inputData[k].val3
				});
			}
		}	   
	}
	return data;
}

	},

	boxPlot: function(arg){
		console.log("boxPlot");
		
		var el = d3.select(arg.selector);
		$(arg.selector).empty();

    	var width = $(arg.selector).width() -analytics.margin.left - analytics.margin.right,
		    height = $(arg.selector).height() -analytics.margin.top - analytics.margin.bottom;

		var box_separation = 40;
		
		var min = Infinity,
		    max = -Infinity;

		
		var mine = d3.csv.parse(arg.data);
		var data = convertData(mine);
		
	  	var chart = d3.box()
		    .whiskers(iqr(1.5))
		    .width(width/data.length - box_separation*2)
		    .height(height - analytics.margin.top - analytics.margin.bottom);

		chart.domain([min, max]);

		var svg = el.selectAll("svg")  
		    .append("g")
		      .data(data)
		    .enter().append("svg")
		      .attr("class", "box")
		      .attr("width", width/data.length)
		      .attr("height", height + analytics.margin.bottom + analytics.margin.top)
		    .append("g")
		      .attr("transform", "translate(" + box_separation + "," + analytics.margin.top + ")")
		      .call(chart);




function convertData(inputData) {
	var data = [];
	var uniqueArray = [];

	for (i = 0; i < inputData.length; i++) {
		if (uniqueArray.indexOf(inputData[i].id) == -1)
		{
			uniqueArray.push(inputData[i].id);
		}
	}
	 
	for (j = 0; j < uniqueArray.length; j++) {
		for (k = 0; k < inputData.length; k++)
		{
			if (inputData[k].id != uniqueArray[j]) continue;
		    var e = j,
		        s = parseFloat(inputData[k].val1),
		        d = data[e];
		    if (!d) d = data[e] = [s];
		    else d.push(s);
		    if (s > max) max = s;
		    if (s < min) min = s;
		}	   
	}
	return data;
}
		
		
		
	},

	hovPlot: function(arg){
		console.log("hovPlot");
	},


	parallelsPlot: function(arg){
		console.log("parallelsPlot");
		var el = d3.select(arg.selector);
		$(arg.selector).empty();

	   var traits = [];
	   var uniqueArray = [];



		var mine = d3.csv.parse(arg.data);	
		for (i = 0; i < mine.length; i++) {
			if (uniqueArray.indexOf(mine[i].id) == -1)
			{
				uniqueArray.push(mine[i].id);
			}
		}

		var L = mine.length;
		var firstId = 0;
		//for (var i = 0; i < L; i++) {
			//var obj = mine[i];
			var obj = mine[0];
			for (var j in obj) {
			    if (firstId != 0)
				{
					traits.push(j);//alert(j);
				}
				else
				{
					firstId = 1;
				}
			}
		//}		
		
		var species = uniqueArray;//["setosa", "versicolor", "virginica"],
		//traits = ["sepal length", "petal length", "sepal width", "petal width"];

    	var	width = $(arg.selector).width() - analytics.margin.left - analytics.margin.right,
			height = $(arg.selector).height() - analytics.margin.top - analytics.margin.bottom;

		console.log(width,height);

		var x = d3.scale.ordinal().domain(traits).rangePoints([0, width]),
		    y = {};

		var line = d3.svg.line(),
		    axis = d3.svg.axis().orient("left"),
		    foreground;

		var svg = el.append("svg:svg")
			.attr("class", "svg")
			.attr("display", "block")
			.attr("width", "100%")
		    .attr("height", "100%")
		  .append("svg:g")
		    .attr("transform", "translate(" + analytics.margin.left + "," + analytics.margin.top + ")");


		  // Create a scale and brush for each trait.
		  traits.forEach(function(d) {
		    y[d] = d3.scale.linear()
		        .domain(d3.extent(mine, function(p) { return p[d]; }))
		        .range([height, 0]);

		    y[d].brush = d3.svg.brush()
		        .y(y[d])
		        .on("brush", brush);
		 });

		 
		  // Add a legend.
		  var legend = svg.selectAll("g.legend")
		      .data(species)
		    .enter().append("svg:g")
		      .attr("class", "legend")
		      .attr("transform", function(d, i) { return "translate(0," + (i * 20 + 584) + ")"; });

		  legend.append("svg:line")
		      .attr("class", String)
		      .attr("x2", 8);

		  legend.append("svg:text")
		      .attr("x", 12)
		      .attr("dy", ".31em")
		      .text(function(d) { return "Item " + d; });

		  // Add foreground lines.
		  foreground = svg.append("svg:g")
		      .attr("class", "foreground")
		    .selectAll("path")
		      .data(mine)
		    .enter().append("svg:path")
		      .attr("d", path)
		      .attr("class", function(d) { return d.id; });

		  // Add a group element for each trait.
		  var g = svg.selectAll(".trait")
		      .data(traits)
		    .enter().append("svg:g")
		      .attr("class", "trait")
		      .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
		     /* .call(d3.behavior.drag()
		      .origin(function(d) { return {x: x(d)}; })
		      .on("dragstart", dragstart)
		      .on("drag", drag)
		      .on("dragend", dragend))*/;

			  
		  // Add an axis and title.
		  g.append("svg:g")
		      .attr("class", "axis")
		      .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
		    .append("svg:text")
		      .attr("text-anchor", "middle")
		      .attr("y", -9)
		      .text(String);

		  // Add a brush for each axis.
		  g.append("svg:g")
		      .attr("class", "brush")
		      .each(function(d) { d3.select(this).call(y[d].brush); })
		    .selectAll("rect")
		      .attr("x", -8)
		      .attr("width", 16);

		  /*function dragstart(d) {
		    i = traits.indexOf(d);
		  }

		  function drag(d) {
		    x.range()[i] = d3.event.x;
		    traits.sort(function(a, b) { return x(a) - x(b); });
		    g.attr("transform", function(d) { return "translate(" + x(d) + ")"; });
		    foreground.attr("d", path);
		  }

		  function dragend(d) {
		    x.domain(traits).rangePoints([0, w]);
		    var t = d3.transition().duration(500);
		    t.selectAll(".trait").att*r("transform", function(d) { return "translate(" + x(d) + ")"; });
		    t.selectAll(".foreground path").attr("d", path);
		  }*/
		//});

		// Returns the path for a given data point.
		function path(d) {
		  return line(traits.map(function(p) { return [x(p), y[p](d[p])]; }));
		}

		// Handles a brush event, toggling the display of foreground lines.
		function brush() {
		  var actives = traits.filter(function(p) { return !y[p].brush.empty(); }),
		      extents = actives.map(function(p) { return y[p].brush.extent(); });
		  foreground.classed("fade", function(d) {
		    return !actives.every(function(p, i) {
		      return extents[i][0] <= d[p] && d[p] <= extents[i][1];
		    });
		  });
		}

	},

}