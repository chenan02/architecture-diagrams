var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 400 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));



function graph(div, data) {
	var svg = d3.select(div).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom + 50)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	type(data);
  x.domain(data.map(function(d) { return d.name; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Value");
//var k = 0;
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("class", function(n, k) { if(k < 8) { return "heating-system";} else { return "cooling-system";}})
      .attr("x", function(d) { return x(d.name); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });
	
  svg.append("g")
	  .attr("class", "heating-system")
	  .attr("transform", "translate(0, 190)")
	  .append("rect")
	  .attr("width", 66)
	  .attr("height", 8)

	svg.append("g")
      .append("text")
      .attr("style", "font-size: 12px")
      .attr("transform", "translate(80, 198)")
      .text("Energy Conversion Heating");

  svg.append("g")
	  .attr("class", "cooling-system")
	  .attr("transform", "translate(0, 205)")
	  .append("rect")
	  .attr("width", 66)
	  .attr("height", 8)
	
  svg.append("g")
  	  .append("text")
  	  .attr("style", "font-size: 12px")
  	  .attr("transform", "translate(80, 213)")
  	  .text("Energy Conversion Cooling");
	
};


function type(d) {
  d.value = +d.value;
  return d;
};

graph("#separatedChart1", dataArray1);
graph("#separatedChart2", dataArray2);



function setInputFields()
{
  var input = document.getElementsByName("EnergyHeating")[0];
  input.innerHTML = dEnegyHeat;
  var input = document.getElementsByName("EnergyCooling")[0];
  input.innerHTML = dEnegyCool;
}; /* setInputFields */

/*----------------------------------------------------------------------
Initializes construction.xhtml
 ---------------------------------------------------------------------*/
function onLoad()
{
  setMessage();
  setProjectFields();
  setInputFields();
  var body = document.getElementsByTagName("body")[0];
  body.style.display="block";
//  var select = document.getElementsByName("energyConversion")[0];
//  select.focus();
}; /* onLoad */

/*----------------------------------------------------------------------
selects a construction value
----------------------------------------------------------------------*/
function selectEC(button,index)
{
  var aInput = document.getElementsByTagName("label")[0];
  document.getElementsByName("EnergyHeating1")[0].value = index;
  aInput.innerHTML = index;
  var aInput = document.getElementsByTagName("label")[1];
  document.getElementsByName("EnergyCooling1")[0].value = dEnegyCool;
  aInput.innerHTML = dEnegyCool;
  var form = document.getElementsByTagName("form")[0];
  var ainput = form.getElementsByTagName("input");
  var inputSubmit = null;
  for (i = 0; i < ainput.length; i++)
  {
	    var input = ainput[i];
	    var sType = input.getAttribute("type");
	    if (sType == "text")
	      input.value = dValue.toFixed(2);
	    else if (sType == "submit")
	      inputSubmit = input;
  }
  inputSubmit.click();
//  alert("yeah");
}; /* select */

function selectEC1(button,index)
{
//  var parent = button.parentNode;
  var aInput = document.getElementsByTagName("label")[0];
  document.getElementsByName("EnergyCooling")[0].value = index;
  aInput.innerHTML = index;
  //var aInput = parent.getElementsByTagName("label")[1];
  //document.getElementsByName("EnergyCooling")[1].value = index;
  //aInput.innerHTML = index;
  var form = document.getElementsByTagName("form")[0];
  var ainput = form.getElementsByTagName("input");
  var inputSubmit = null;
  for (i = 0; i < ainput.length; i++)
  {
	    var input = ainput[i];
	    var sType = input.getAttribute("type");
	    if (sType == "text")
	      input.value = dValue.toFixed(2);
	    else if (sType == "submit")
	      inputSubmit = input;
  }
  inputSubmit.click();
//  alert("yeah");
}; /* select */