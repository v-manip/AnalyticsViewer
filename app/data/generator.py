

import csv, random, time


def strTimeProp(start, end, format, prop):

    stime = time.mktime(time.strptime(start, format))
    etime = time.mktime(time.strptime(end, format))

    ptime = stime + prop * (etime - stime)

    return time.strftime(format, time.localtime(ptime))


def randomDate(start, end, prop):
    return strTimeProp(start, end, '%Y-%m-%dT%H:%M:%SZ', prop)

product_amount = 5;
cnt = 40000;


with open('tmp.csv', 'wb') as csvfile:
    writer = csv.writer(csvfile, delimiter=',',
                            quotechar='"', quoting=csv.QUOTE_ALL)

    writer.writerow(["id","Value","Height (m)","Size","Latitude","Longitude","F","Time"])

    for i in range(0,cnt):
	    writer.writerow([
	    	'id%s'%random.randint(1,product_amount),
	    	'%s'%random.uniform(100,500),
	    	'%s'%random.uniform(1000,5000),
	    	'%s'%random.randint(0,20),
	    	'%s'%random.uniform(-90,90),
	    	'%s'%random.uniform(-180,180),
	    	'%s'%random.uniform(10000,15000),
	    	randomDate("2005-01-01T00:00:00Z", "2014-12-01T00:00:00Z", random.random())
	    ])