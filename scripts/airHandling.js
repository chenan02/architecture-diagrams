var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 500 - margin.left - margin.right,
    height = 260 - margin.top - margin.bottom;
 
var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1);
 
var x1 = d3.scale.ordinal();
 
var y = d3.scale.linear()
    .range([height, 0]);
 
var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");
 
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));
 
var color = d3.scale.ordinal()
    .range(["#BA202A", "#DE8585", "#0080C8", "#95C9FC"]);
 
var svg = d3.select("#stackedGroupedChart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + 100 + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
var yBegin;
 
var innerColumns = {
  "column1" : ["Heating","Humidification"],
  "column2" : ["Cooling", "Dehumidification"]
}
 
function graph(data) {
  console.log(data);
  var columnHeaders = d3.keys(data[0]).filter(function(key) { return key !== "name"; });
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "name"; }));
  data.forEach(function(d) {
    var yColumn = new Array();
    d.columnDetails = columnHeaders.map(function(name) {
      for (ic in innerColumns) {
        if($.inArray(name, innerColumns[ic]) >= 0){
          if (!yColumn[ic]){
            yColumn[ic] = 0;
          }
          yBegin = yColumn[ic];
          yColumn[ic] += +d[name];
          return {name: name, column: ic, yBegin: yBegin, yEnd: +d[name] + yBegin,};
        }
      }
    });
    d.total = d3.max(d.columnDetails, function(d) { 
      return d.yEnd; 
    });
  });
 
  x0.domain(data.map(function(d) { return d.name; }));
  x1.domain(d3.keys(innerColumns)).rangeRoundBands([0, x0.rangeBand()]);
 
  y.domain([0, d3.max(data, function(d) { 
    return d.total; 
  })]);
 
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
      .attr("dy", ".7em")
      .style("text-anchor", "end")
      .text("");
 
   var project_stackedbar = svg.selectAll(".project_stackedbar")
      .data(data)
    .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + x0(d.name) + ",0)"; });
 
  project_stackedbar.selectAll("rect")
      .data(function(d) { return d.columnDetails; })
    .enter().append("rect")
      .attr("width", x1.rangeBand())
      .attr("x", function(d) { 
        return x1(d.column);
         })
      .attr("y", function(d) { 
        return y(d.yEnd); 
      })
      .attr("height", function(d) { 
        return y(d.yBegin) - y(d.yEnd); 
      })
      .style("fill", function(d) { return color(d.name); });
 
  var legend = svg.selectAll(".legend")
	//var legend = d3.select("#legend").append("svg")
      .data(columnHeaders.slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });	
	
  legend.append("rect")
      .attr("x", width - 200)
  	  .attr("y", 250)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);
	
  legend.append("text")
      .attr("x", width - 205)
      .attr("y", 257)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });
 
};
graph(dataArray);

function setInputFields()
{
  var input = document.getElementsByName("airhandling")[0];
  input.innerHTML = dAirhandling;
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
  var select = document.getElementsByName("airhandling")[0];
  select.focus();
}; /* onLoad */

/*----------------------------------------------------------------------
selects a construction value
----------------------------------------------------------------------*/
function selectAH(button,index)
{
  var parent = button.parentNode;
  var aInput = parent.getElementsByTagName("label")[0];
  document.getElementsByName("airhandling1")[0].value = index;
  aInput.innerHTML = index;
  var form = parent.getElementsByTagName("form")[0];
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
}; /* select */