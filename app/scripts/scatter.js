




function scatterPlot(args, callback) {

	this.margin = {top: 20, right: 20, bottom: 90, left: 70};
	this.data = args.data;
	this.headerNames = null;
	this.selector = args.selector;
	this.colors = args.colors;
	this.col_date = [] ;
	this.col_vec = [] ;
	this.sel_x = "";
	this.sel_y = "";
	this.identifiers = [];

	
	var format_date = "%d/%m/%Y" ;
	var exp_date = /^(\d){4}-(\d){2}-(\d){2}/
	var value;
	var self = this;

	d3.csv("data/swarmdata.csv", function(error, values) {


		self.data = values;
		// Extract the list of dimensions
	    // For each dimension, guess if numeric value or not and create vert scales
	    all_dims = d3.keys(self.data[0]) ;
	    // Filter hidden dimensions
	    dimensions = d3.keys(self.data[0]).filter(function(key) {
	    	// Check if column is a date
	    	if(exp_date.test(self.data[1][key])){
	    		self.data.forEach (function(p) {p[key] = new Date(p[key]);}) ; 
	    		self.col_date.push(key);
	    	// Column is vector data
	    	}else if(self.data[1][key].charAt(0)=="{"){
	    		self.data.forEach (function(p) {
	    			var val = p[key].substring(1, p[key].length-1);
	    			var vector = val.split(";");
	    			for (var i = vector.length - 1; i >= 0; i--) {
	    				vector[i] = parseFloat(vector[i]);
	    			};
	    			p[key] = vector;
	    			self.col_vec.push(key);
	    		}) ;
	    	// Check if column is a float value
	    	}else if (value = parseFloat(self.data[1][key])){
	    		self.data.forEach (function(p) {p[key] = parseFloat(p[key]);}) ;
	    	}
		});

		self.headerNames = d3.keys(self.data[0]);
		self.headerNames.sort();
		self.identifiers = d3.set(self.data.map(function(d){return d.id;})).values();

		if(self.colors)
			self.colors = arg.colors;
		else
			self.colors = d3.scale.ordinal().domain(self.identifiers).range(d3.scale.category10().range());
			

			// Remove id element
			var index = self.headerNames.indexOf("id");
			if (index > -1) {
			self.headerNames.splice(index, 1);
		}

		// self.sel_x = self.headerNames[0];
		// self.sel_y = self.headerNames[1];

		self.sel_x = "Latitude";
		self.sel_y = "F";



    	self.render();

    	callback();

  	});

}

scatterPlot.prototype.render = function(){

	var self = this;
	var width = $(this.selector).width() - analytics.margin.left - analytics.margin.right,
	height = $(this.selector).height() - analytics.margin.top - analytics.margin.bottom;

	$(this.selector).empty()

	var x_select = d3.select(this.selector)
			.insert("div")
			.attr("style", "position: absolute; z-index: 100;"+
				"right:"+(analytics.margin.right)+
				"px; bottom:"+(analytics.margin.bottom + 28)+"px;")
			.append("select")
			.attr("style", "width: 20px;");


	x_select.on("change", function(d) {
			self.sel_x = d3.select(this).property("value");
			self.render();
		}
	);

	x_select.selectAll("option")
		.data(this.headerNames)
		.enter()
		.append("option")
		.text(function (d) { 
			if(self.sel_x == d)
				d3.select(this).attr("selected","selected");
			return d; 
	});

	var y_select = d3.select(this.selector)
			.insert("div")
			.attr("style", "position: absolute; z-index: 100;"+
				"margin-left:"+(analytics.margin.left)+
				"px; margin-top:"+(analytics.margin.top-25)+"px;")
			.append("select")
			.attr("style", "width: 20px;");

	y_select.on("change", function(d) {
			self.sel_y = d3.select(this).property("value");
			self.render();
		}
	);

	y_select.selectAll("option")
		.data(this.headerNames)
		.enter()
		.append("option")
		.text(function (d) { 
			if(self.sel_y==d)
				d3.select(this).attr("selected","selected");
			return d; 
	});

	var format_x, format_y;

	var xScale, yScale;


	if (this.col_date.indexOf(this.sel_x) != -1){
		xScale = d3.time.scale().range([0, width]);
		format_x = d3.time.format('%x');
	}else{
		xScale = d3.scale.linear().range([0, width]);
		format_x = d3.format('s');
	}

	if (this.col_date.indexOf(this.sel_y) != -1){
		yScale = d3.time.scale().range([height, 0]);
		format_y = d3.time.format('%x');
	}else{
		yScale = d3.scale.linear().range([height, 0]);
		format_y = d3.format('s');
	}


	
	var color = d3.scale.category10();

	var xAxis = d3.svg.axis()
	    .scale(xScale)
	    .orient("bottom")
	    .tickFormat(format_x);

	var yAxis = d3.svg.axis()
	    .scale(yScale)
	    .orient("left")
	    .tickFormat(format_y);

	var svg = d3.select(this.selector).append("svg")
	    .attr("width", width)
	    .attr("height", height)
	  	.append("g")
	    .attr("transform", "translate(" + analytics.margin.left + "," + analytics.margin.top + ")");

	if(this.col_vec.indexOf(this.sel_x) != -1){
		var length_array = [];
		this.data.forEach(function(d) {
			var vec_length = 0;
			for (var i = d[self.sel_x].length - 1; i >= 0; i--) {
				vec_length += Math.exp(d[self.sel_x][i]);
			};
			vec_length = Math.sqrt(vec_length);
			length_array.push(vec_length);
		});

		xScale.domain(d3.extent(length_array, function(d) { 
		 	return d;
		})).nice();

	}else{
		xScale.domain(d3.extent(this.data, function(d) { 
		 	return d[self.sel_x];
		})).nice();
	}

	if(this.col_vec.indexOf(this.sel_y) != -1){
		var length_array = [];
		this.data.forEach(function(d) {
			var vec_length = 0;
			for (var i = d[self.sel_y].length - 1; i >= 0; i--) {
				vec_length += Math.exp(d[self.sel_y][i]);
			};
			vec_length = Math.sqrt(vec_length);
			length_array.push(vec_length);
		});

		yScale.domain(d3.extent(length_array, function(d) { 
		 	return d;
		})).nice();

	}else{
		yScale.domain(d3.extent(this.data, function(d) { 
			return d[self.sel_y];
		})).nice();
	}


	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		.append("text")
		.attr("class", "label")
		.attr("x", width)
		.attr("y", -6)
		.style("text-anchor", "end")
		.text(this.sel_x);

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text(this.sel_y);

	
	svg.selectAll(".dot")
		.data(this.data)
		.enter().append("circle")
		.attr("class", "dot")
		.attr("r", 3.5)
		.attr("cx", function(d) { 
			if (d[self.sel_x] instanceof Array) {
				var vec_length = 0;
				for (var i = d[self.sel_x].length - 1; i >= 0; i--) {
					vec_length += Math.exp(d[self.sel_x][i]);
				};
				vec_length = Math.sqrt(vec_length);
				return xScale(vec_length);
			}else{
				return xScale(d[self.sel_x]); 
			}
		})
		.attr("cy", function(d) { 
			if (d[self.sel_y] instanceof Array) {
				var vec_length = 0;
				for (var i = d[self.sel_y].length - 1; i >= 0; i--) {
					vec_length += Math.exp(d[self.sel_y][i]);
				};
				vec_length = Math.sqrt(vec_length);
				return yScale(vec_length);
			}else{
				return yScale(d[self.sel_y]); 
			}
		 })
		.style("fill", function(d) { return self.colors(d.id); });

	var legend = svg.selectAll(".legend")
		.data(this.identifiers)
		.enter().append("g")
		.attr("class", "legend")
		.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

	legend.append("rect")
		.attr("x", width - 18)
		.attr("width", 18)
		.attr("height", 18)
		.style("fill", function(d) { 
			return self.colors(d); 
		});

	legend.append("text")
		.attr("x", width - 24)
		.attr("y", 9)
		.attr("dy", ".35em")
		.style("text-anchor", "end")
		.text(function(d) {return d;});


	function resize() {
	    var width = $(self.selector).width() - analytics.margin.left - analytics.margin.right,
	 		height = $(self.selector).height() - analytics.margin.top - analytics.margin.bottom;

	    // Update the range of the scale with new width/height
	    xScale.range([0, width]);
	    yScale.range([height, 0]);

	    legend.select("rect")
			.attr("x", width - 18)
		
		legend.select("text")
			.attr("x", width - 24)

	    // update x axis label position
	    svg.select('.x.axis')
	    	.select('.label')
	    	.attr("x", width);

	    // Update the axis with the new scale
	    svg.select('.x.axis')
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);


	    // Update 

	    
	    svg.select('.y.axis')
	      .call(yAxis);

	    /* Force D3 to recalculate and update the dots */
	    svg.selectAll(".dot")
			.attr("cx", function(d) { return xScale(d[self.sel_x]); })
			.attr("cy", function(d) { return yScale(d[self.sel_y]); });
	}

	d3.select(window).on('resize', resize); 

}



scatterPlot.prototype.substractComponents = function substractComponents (a, b, parameter){
	this.data.forEach (function(p) {
		p[(a+"-"+b)] = p[a]-p[b];
	}) ;
	this.render();
};

scatterPlot.prototype.absolute = function absolute (productid, parameter){
	this.data.forEach (function(p) {
		if(p["id"] == productid){
			p[parameter] = Math.abs(p[parameter]);
		}
	}) ;
	this.render();
};

scatterPlot.prototype.colatitude = function colatitude (productid){
	this.data.forEach (function(p) {
		//if(p["id"] == productid){
			if(p["Latitude"]<0)
				p["Latitude"] = 90 - p["Latitude"];
		//}
	}) ;
	this.render();
};
