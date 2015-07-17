//this .js file runs page02.html and page04.html
//composes of the data in js variable and d3 code

//variables
var topSkills = [{
	id: 1,
	skill: 'Leadership skills',
	count: 34
}, {
	id: 2,
	skill: 'Interpersonal relations and working collaboratively',
	count: 32
}, {
	id: 3,
	skill: 'Networking and relationship building',
	count: 32
}, {
	id: 4,
	skill: 'Project management skills',
	count: 31
}, {
	id: 5,
	skill: 'Persuasive speaking',
	count: 28
}, {
	id: 6,
	skill: 'Creative thinking and problem solving',
	count: 26
}, {
	id: 7,
	skill: 'Critical thinking and analysis of arguments and information',
	count: 23
}, {
	id: 8,
	skill: 'Improved work based on feedback form others',
	count: 21
}, {
	id: 9,
	skill: 'Teaching skills',
	count: 18
}, {
	id: 10,
	skill: 'Financial and business management skills',
	count: 13
}];


var currentFields = [{
	id: 1, 
	field: 'Business and Finance',
	count: 20
}, {
	id: 2,
	field: 'Student',
	count: 12
}, {
	id: 3,
	field: 'Other',
	count: 8
}, {
	id: 4,
	field: 'Media and Communications',
	count: 5
}, {
	id: 5,
	field: 'Health and Medicine',
	count: 4
}, {
	id: 6,
	field: 'Services',
	count: 4
}, {
	id: 7,
	field: 'Engineering',
	count: 3
}, {
	id: 8,
	field: 'Education',
	count: 2
}, {
	id: 9,
	field: 'Legal and Law Enforcement',
	count: 1
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



//the top skills div using topSkills 
//draw a bar graph of top skills

console.log(topSkills);

var xScale;
var yScale;

//svg to work with 
var svgHeight = 100
var svgWidth = 400
var svgSkill = d3.select('#skill') // select div
    .append('svg') // append svg
    .attr('width', svgWidth) // assign width attr
    .attr('height', svgHeight) // assign height attr
    .style('background-color', 'gray');

//margin of the svg area
	var margin = {
		left:50, 
		bottom:100, 
		top:50, 
		right:50,
};

//setting the height and width of the graphable area
var height = svgHeight - margin.bottom - margin.top; 
var width = svgWidth - margin.left - margin.right;


var g = svgSkill
		.append('g')
        .attr('transform', 'translate(' +  margin.left + ',' + margin.top + ')') //translate the g
        .attr('height', height)
        .attr('width', width);

//set scales function for data set topSkills
var setScalesSkill = function() {
    var xMax =d3.max(topSkills, function(d){return d['count']});
    var xMin =d3.min(topSkills, function(d){return d['count']});
    var yMin =d3.min(topSkills, function(d){return d['count']});
    var yMax =d3.max(topSkills, function(d){return d['count']});
    xScale  = d3.scale.linear().range([0, width]).domain([xMin, xMax]);
    yScale = d3.scale.linear().range([height, 0]).domain([yMin, yMax]);
}

var barFunc = function(rect) {
	rect.attr('width', function(d){console.log(d['count']); return xScale(d['count'])})
		.attr('height',50)
		.attr('x', 50)
		.attr('y', function(d){return d['id']*30})
		.attr('fill', 'blue')
};

var drawSkillGraph = function() {
	setScalesSkill();
	var rects = g.selectAll('rect').data(topSkills)

	rects.enter().append('rect').call(barFunc);
	rects.exit().remove()
	// g.selectAll('rect').data(topSkills)
	// 	.exit().remove()
	g.selectAll('rect')
	 	.transition().duration(1500).call(barFunc) //transition and duration optional
};

drawSkillGraph();

// // Define x axis
// var xAxis = d3.svgSkill.axis().scale(xScale).orient('top')

// // Define y axis
// var yAxis = d3.svgSkill.axis().scale(yScale).orient('left')

// // Append x axis
// svgSkill.append('g')
// 	.attr('class', 'axis').call(xAxis)
//   	.attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')

// // Append y axis
// svgSkill.append('g')
// 	.attr('class', 'axis').call(yAxis)
//   	.attr('transform', 'translate(' + margin.left + ',' + (margin.top) + ')')





















// var drawFieldGraph = function(currentFields) {
// 	var field = d3.select('#field'); //select the div
// 	var pie = field.selectAll('circle');

// 	field // select div
// 	    .append('svg') // append svg
// 	    .attr('width', 100) // assign width attr
// 	    .attr('height', 200) // assign height attr
// 	    .style('border', 'none') // assign border style
// 	    .style('background-color', 'gray')

// }





