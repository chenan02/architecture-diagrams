var margin = {top: 30, right: 10, bottom: 10, left: 20},
    width = 500 - margin.left - margin.right,
    height = dataArray.length*40;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.ordinal()
    .rangeRoundBands([0, height-100], .2);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("top");

var svg = d3.select("#horizontalchart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "graphcontainer")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("id", "graph")

var yArray = [];
function graph(data) {
    //console.log(data);
x.domain(d3.extent(data, function(d) { 
    //console.log(data);
    return d.value; })).nice();
  y.domain(data.map(function(d) { return d.name; }));

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", function(d) { return d.value < 0 ? "bar negative" : "bar positive"; })
      .attr("x", function(d) { return x(Math.min(0, d.value)); })
      .attr("y", function(d) { yArray.push(y(d.name));
                              return y(d.name); })
      .attr("width", function(d) { return Math.abs(x(d.value) - x(0)); })
      .attr("height", y.rangeBand());

  svg.append("g")
      .attr("class", "x axis")
      .call(xAxis);
    

  svg.append("g")
      .attr("class", "y axis")
    .append("line")
      .attr("x1", x(0))
      .attr("x2", x(0))
      .attr("y2", height-100);
};      
function legend(dataArray, squareArray) {
    var g = document.createElement("table");
    g.setAttribute("id", "legend");
    g.style.width = "100px";
    var trheader = document.createElement("tr");
    var thName = document.createElement("th");
    thName.innerHTML = "Parameter";
    thName.style.fontSize = "13px";
    trheader.appendChild(thName);
    var thBox = document.createElement("th");
    thBox.innerHTML = "";
    trheader.appendChild(thBox);
    trheader.style.height = "30px";
    g.appendChild(trheader);
    for(item in dataArray) {
        var tr = document.createElement("tr");
        tr.style.position = "absolute";
        tr.style.marginTop = yArray[item] + "px";
        console.log(tr.style.top);
        var td1 = document.createElement("td");
        td1.style.width = "500px";
    td1.style.fontSize = "11px";
        var text = document.createElement("text");
        text.innerHTML = dataArray[item].name;
        td1.appendChild(text);
        var td2 = document.createElement("td");
        td2.style.width = "50px";
        var rect = document.createElement("rect");
        rect.style.width = "18px";
        rect.style.height = "18px";
        rect.style.display = "inline-block";
    rect.style.border = "1px solid black";
        if(squareArray[item] == 0) {
            rect.style.background = "rgb(255,255,255)";
        }
        else {
            rect.style.background = "rgb(34,139,34)";
        }
        td2.appendChild(rect);
        tr.appendChild(td1);
        tr.appendChild(td2);
        g.appendChild(tr);
    }
    document.getElementById("horizontalchart").appendChild(g);
};
function type(d) {
  d.value = +d.value;
  return d;
}

graph(dataArray);
legend(dataArray, squareArray);