

//Example Data

//var plotdata = "";



/*var plotdata = "descr,r,g,b,a\n"+
"TEST_SAR,0.761541370537,0.768791864189,0.0666862170552,0.557654142818\n"+
"TEST_SAR,0.536185570583,0.344579369451,0.836246768063,0.0797144795387\n"+
"TEST_SAR,0.949489934255,0.0610118253394,0.129181108269,0.62434675067\n"+
"TEST_SAR,0.188981709233,0.763255424047,0.398275608919,0.259770382284\n"+
"TEST_SAR,0.803680811363,0.157337957053,0.0828667750986,0.129449528982";*/




/*var plotdata = "id,val1,val2\n"+
"id0,0.761541370537,0.768791864189\n"+
"id0,0.536185570583,0.344579369451\n"+
"id0,0.949489934255,0.0610118253394\n"+
"id1,0.188981709233,0.763255424047\n"+
"id1,0.761541370537,0.768791864189\n"+
"id1,0.54634563464,0.12343465434\n"+
"id2,0.34527145,0.1344362\n"+
"id2,0.2134721345,0.26415\n"+
"id2,0.803680811363,0.157337957053";*/



/*
var plotdata = "id,val1\n"+
"id0,0.761541370537\n"+
"id0,0.536185570583\n"+
"id0,0.949489934255\n"+
"id1,0.188981709233\n"+
"id1,0.803680811363";
*/

/*
var plotdata = "id,r,g,b,a\n"+
"TEST_SAR,99.0,99.0,1000.0,255.0\n"+
"TEST_SAR,110.0,110.0,1.0,255.0\n"+
"TEST_SAR,125.0,125.0,1.0,255.0\n";
*/

var plotdata = "id,time,val\n"+
"ts1,2003-03-12T00:00,27.3847880968\n"+
"ts1,2003-03-13T15:23,28.231231";
//+
/*"ts1, 1154318400000, 32\n"+
"ts1, 1174318400000, 15\n"+
"ts1, 1194318400000, 29\n"+
"ts1, 1214318400000, 11\n"+
"ts2, 1138683600000, 1.3847880968\n"+
"ts2, 1154318400000, 20\n"+
"ts2, 1174318400000, 6\n"+
"ts2, 1194318400000, 9\n"+
"ts2, 1214318400000, 15\n"+
"ts3, 1138683600000, 9.3847880968\n"+
"ts3, 1154318400000, 11\n"+
"ts3, 1174318400000, 15\n"+
"ts3, 1194318400000, 19\n"+
"ts3, 1214318400000, 23\n";*/


/*var plotdata = "id,r,g,b,a\n"+
	"asd,0.1536185570583,0.17536185570583,0.6536185570583,0.100\n"+
	"asd,0.2536185570583,0.23536185570583,0.2536185570583,0.536185570583\n"+
	"asd,0.3536185570583,0.37536185570583,0.6536185570583,0.100\n"+
	"as,0.4536185570583,0.43536185570583,0.2536185570583,0.536185570583\n"+
	"as,0.5536185570583,0.51536185570583,0.0536185570583,0.536185570583\n"+
	"as,100.6536185570583,0.67536185570583,0.6536185570583,0.100\n"+
	"yx,0.7536185570583,0.73536185570583,0.2536185570583,0.536185570583\n"+
	"yx,0.8536185570583,0.81536185570583,0.0536185570583,0.536185570583";*/


/*
var plotdata = "id,val1,val2,val3,val4,val5\n"+
"id0,'2010-07-22T01:38:40Z',0.768791864189,0.0666862170552,0.557654142818,0.840223998953\n"+
"id1,'2010-07-22T02:38:40Z',0.344579369451,0.836246768063,0.0797144795387,0.0777813168074\n"+
"id2,'2010-07-22T03:38:40Z',0.0610118253394,0.129181108269,0.62434675067,0.698046540216\n"+
"id3,'2010-07-22T04:38:40Z',0.763255424047,0.398275608919,0.259770382284,0.924085735394\n"+
"id4,'2010-07-22T05:38:40Z',0.157337957053,0.0828667750986,0.129449528982,0.969509351777\n";
*/

function onscatterPlot(){

	var args = {
		selector: "#canvas",
		data: plotdata
	};

	analytics.scatterPlot(args);
}

function onboxPlot(){

	var args = {
		selector: "#canvas",
		data: plotdata
	};
	analytics.boxPlot(args);
}

function onstackedPlot(){

	var args = {
		selector: "#canvas",
		data: plotdata
	};

	analytics.stackedPlot(args);
}


function onparallelsPlot(){

	var args = {
		selector: "#canvas",
		data: plotdata
	};
	analytics.parallelsPlot(args);
}