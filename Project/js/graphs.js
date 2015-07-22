//this .js file runs page02.html and page04.html
//composes of the data in js variable and d3 code


var drawSkillGraph = function() {
	var xScale;
	var yScale;
	var svgHeight = 500;
	var svgWidth = 800;

	var svgSkill = d3.select('#skill') // select div
	    .append('svg') // append svg
	    .attr('width', svgWidth) // assign width attr
	    .attr('height', svgHeight) // assign height attr
	    .style('background-color', 'white');

	//margin of the svg area
	var margin = {
		left:50, 
		bottom:30, 
		top:30, 
		right:300
	};

	//setting the height and width of the graphable area
	var height = svgHeight - margin.bottom - margin.top; 
	var width = svgWidth - margin.left - margin.right;

	var g = svgSkill
			.append('g')
	        .attr('transform', 'translate(' +  0 + ',' + margin.top + ')') //translate the g
	        .attr('height', height)
	        .attr('width', width)

	//set scales function for data set topSkills
	var setScalesSkill = function() {
	    var xMax =d3.max(topSkills, function(d){return d['count']});
	    var xMin =d3.min(topSkills, function(d){return d['count']});
	    xScale  = d3.scale.linear().domain([0, xMax]).range([0, width]);
	    yScale  = d3.scale.linear().domain([0, topSkills.length]).range([0, height]);
	}

	var color = d3.scale.linear()
	    .domain([10,20,30,40])
	    .range(["#333399", "#0066CC", "#33CCFF", "#00CC00"]);

	var barFunc = function(rect) {
		rect.attr('width', function(d){return xScale(d['count'])})
			.attr('height', height/(topSkills.length*1.5))
			.attr('x', 50)
			.attr('y', function(d, i) {return yScale(i)})
			.attr('fill', function(d) {return color(d['count'])})
	};

	var barLabel = function(text) {
		text.attr('font-family', 'Helvetica')
			.attr('font-size', '18px')
			.attr('x', function(d){return 60 + xScale(d['count'])})
			.attr('y', function(d, i) {return yScale(i)+20})
			.attr('fill', 'black')
			.text(function(d) {return d['skill']})
			.style('font-weight', 'bold')
	};

	var rankLabel = function(text) {
		text.attr('font-family', 'Helvetica')
			.attr('font-size', '16px')
			.attr('x', 15)
			.attr('y', function(d, i) {return yScale(i)+20})
			.attr('fill', 'black')
			.text(function(d, i) {return '#'+(i+1)})
			.style('font-weight', 'bold')
	};

	var drawGraphForSkill = function(dat) {
		setScalesSkill();
		var rects = g.selectAll('rect').data(dat);

		rects.enter().append('rect').call(barFunc);

		g.selectAll('text.label').data(dat).enter().append('text').attr("class", "label").call(barLabel);
		g.selectAll('text.rank').data(dat).enter().append('text').attr("class", "rank").call(rankLabel);
		
		rects.exit().remove();

		g.selectAll('rect')
		 	.transition().duration(1500).call(barFunc) //transition and duration optional
	};

	drawGraphForSkill(topSkills);
	//no axes
}





var pieChartField = function() {
	var size = 600;
	var radius = 200;

	var margin = {
		left:200, 
		bottom:100, 
		top:100, 
		right:200
	};

	var height = size - margin.bottom - margin.top; 
	var width = size - margin.left - margin.right;

	var svg = d3.select('#field')
				.append('svg')
				.attr('width', size)
				.attr('height', size)
				
	var g = svg
			.append('g')
			.attr('transform', 'translate(' + (margin.left + radius) +  ',' + (margin.top + radius) + ')')
	        .attr('height', height)
	        .attr('width', width)

	var arc = d3.svg.arc().outerRadius(radius);

	var pie = d3.layout.pie()
			  .value(function(d) {return d['count']})
			  .sort(null);

	var drawPie = function() {
		var arcs = g.selectAll('path')
		  .data(pie(currentFields))
		  .enter()
		  .append('path')
		  .attr('d', arc)
		  .attr('fill', function(d, i) {return currentFields[i].color});

		var labelr = radius + 30;

		// g.selectAll('text').data(pie(currentFields)).enter().append('text')
		    arcs.append('svg:text').attr("transform", function(d) {
		        var c = arc.centroid(d),
		            x = c[0],
		            y = c[1],
		            // pythagorean theorem for hypotenuse
		            h = Math.sqrt(x*x + y*y);
		            console.log(d)
		        return "translate(" + (x/h * labelr) +  ',' + (y/h * labelr) +  ")"})
		    .attr("dy", ".35em")
		    // are we past the center?
		    .attr("text-anchor", function(d) {return (d.endAngle + d.startAngle)/2 > Math.PI ? "end" : "start"})
		    .text(function(d, i) {return currentFields[i].field});
	}
	drawPie();
}








//variables
var topSkills = [{
	skill: 'Leadership skills',
	count: 34
}, {
	skill: 'Interpersonal relations and working collaboratively',
	count: 32
}, {
	skill: 'Networking and relationship building',
	count: 32
}, {
	skill: 'Project management skills',
	count: 31
}, {
	skill: 'Persuasive speaking',
	count: 28
}, {
	skill: 'Creative thinking and problem solving',
	count: 26
}, {
	skill: 'Critical thinking, Analysis of arguments and information',
	count: 23
}, {
	skill: 'Improve work based on feedback form others',
	count: 21
}, {
	skill: 'Teaching skills',
	count: 18
}, {
	skill: 'Financial and business management skills',
	count: 13
}];


var currentFields = [{
	field: 'Business and Finance',
	count: 20,
	color: '#A60F2B'
}, {
	field: 'Student',
	count: 12,
	color: '#648C85'
}, {
	field: 'Other',
	count: 8,
	color: '#B3F2C9'
}, {
	field: 'Media and Communications',
	count: 5,
	color: '#528C18'
}, {
	field: 'Health and Medicine',
	count: 4,
	color: '#C3F25C'
}, {
	field: 'Services',
	count: 4,
	color: '#660066'
}, {
	field: 'Engineering',
	count: 3,
	color: '#FFFF66'
}, {
	field: 'Education',
	count: 2,
	color: '#339966'
}, {
	field: 'Legal and Law Enforcement',
	count: 1,
	color: '#003366'
}];


//we can use angular to display information here
//can add some kind of icon or image
var majors = [{
	field: 'Social Science',
	majors: ['Psychology', 'Economics', 'Communications', 'Geography', 'Linguistics', 'Public Health', 
			'Political Science', 'Spanish', 'English', 'Education']
}, {
	field: 'Business',
	majors: ['Marketing', 'Information Systems', ' Finance']
}, {
	field: 'Engineering',
	majors: ['Bioengineering', 'Material Science and Engineering']
}, {
	field: 'Science',
	majors: ['Neurobiology', 'Microbiology', 'Chemistry', 'Speech and Hearing Sciences']
}, {
	field: 'Technology and Computing',
	majors: ['Informatics', 'Computer Science', 'ACMS', 'Statistics']
}];

