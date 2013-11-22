


function onscatterPlot(){
	var plotdata = null;
	var args = {
		selector: "#canvas",
		data: plotdata
	};

	analytics.scatterPlot(args);
}

function onboxPlot(){
	analytics.boxPlot();
}

function onhovPlot(){
	analytics.hovPlot();
}


function onparallelsPlot(){
	analytics.parallelsPlot();
}