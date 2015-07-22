//this .js file creates the graphs for
//leadership.html and business-skills.html
//composes of the data in js variable using D3 and Chartist.js

//Create a bar chart using D3.js
var drawSkillGraph = function() {
	var xScale;
	var yScale;
	var svgHeight = 500;
	var svgWidth = 800;

	var topSkills = [
		{skill: 'Leadership skills', count: 34}, 
		{skill: 'Interpersonal relations and working collaboratively', count: 32}, 
		{skill: 'Networking and relationship building', count: 32}, 
		{skill: 'Project management skills', count: 31}, 
		{skill: 'Persuasive speaking', count: 28}, 
		{skill: 'Creative thinking and problem solving', count: 26}, 
		{skill: 'Critical thinking, Analysis of arguments and information', count: 23}, 
		{skill: 'Improve work based on feedback form others', count: 21}, 
		{skill: 'Teaching skills', count: 18}, 
		{skill: 'Financial and business management skills', count: 13}
	];

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


//Using Chartist.js to create a pie chart
var drawPieChart = function() {
	var data = { 
	  labels: ['Business and Finance', 'Legal and Law Enforcement', 'Student', 'Education', 'Other', 'Engineering', 'Media and Communications', 'Health and Medicine', 'Services'],
	  series: [20,1, 12, 2, 8, 3, 5, 4, 4]
	};
	var options = {
	  labelInterpolationFnc: function(value) {return value[0]},
	  width: '650px',
	  height: '400px',
	};

	//setting different properties to support mobile friendliness
	var responsiveOptions = [
	  ['screen and (max-width: 640px)', {
	  	labelOffset: 90,
	    chartPadding: 20
	    
	  }],
	  ['screen and (min-width: 641px)', {
	    chartPadding: 60,
	    labelOffset: 80,
	    labelDirection: 'explode',
	    labelInterpolationFnc: function(value) {
	      return value;
	    }
	  }]
	];

	//create a chart and bind it to the div in leadership.html
	new Chartist.Pie('.piechart', data, options, responsiveOptions);
}

