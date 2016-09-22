var margin = {top: 30, right: 10, bottom: 10, left: 10},
    width = 500 - margin.left - margin.right,
   // height = 500 - margin.top - margin.bottom;
    height = dataArray.length*40;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.ordinal()
///////////////////////////////////////////////////////
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
//      .attr("id", function(d) { return y(d.name); })
      .attr("height", y.rangeBand());

  svg.append("g")
      .attr("class", "x axis")
      .call(xAxis);
    

  svg.append("g")
      .attr("class", "y axis")
    .append("line")
      .attr("x1", x(0))
      .attr("x2", x(0))
  /////////////////////////////////////////////////////
      .attr("y2", height-100);
};      
function legend(dataArray, squareArray) {
    var g = document.createElement("table");
    g.setAttribute("id", "legend");
    g.style.width = "50px";
   // g.setAttribute("display", "block");
    //g.style.transform = "translate(0,30)";
    var trheader = document.createElement("tr");
    var thName = document.createElement("th");
    thName.innerHTML = "Parameter";
    //thName.style.width = "150px";
    trheader.appendChild(thName);
    var thBox = document.createElement("th");
    thBox.innerHTML = "";
    //thBox.style.width = "150px";
    trheader.appendChild(thBox);
    trheader.style.height = "30px";
    g.appendChild(trheader);
    for(item in dataArray) {
        var tr = document.createElement("tr");
        tr.style.position = "absolute";
        //tr.style.width = "200px";
        //tr.style.marginTop = "200px";
       // var temp = yArray[item];
       // console.log("'" + temp + "px'");
    //    tr.style.display = "block";
        //tr.style.height = height/68 + "px";
      //  tr.style.marginTop = "2px";
        tr.style.marginTop = yArray[item] + "px";
        console.log(tr.style.top);
        var td1 = document.createElement("td");
        //td1.setAttribute("width", "2000px");
        td1.style.width = "500px";
        var text = document.createElement("text");
        text.innerHTML = dataArray[item].name;
        td1.appendChild(text);
        var td2 = document.createElement("td");
        td2.style.width = "50px";
        //td2.setAttribute("height", "50");
        var rect = document.createElement("rect");
        rect.style.width = "18px";
        //console.log(rect.style.width);
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
        //tr.style.height = "5px";
        tr.appendChild(td1);
        tr.appendChild(td2);
        g.appendChild(tr);
    }
   // d3.select("#container").append(g);
    document.getElementById("horizontalchart").appendChild(g);
    //document.body.appendChild(svg);
};
function type(d) {
  d.value = +d.value;
  return d;
}

graph(dataArray);
legend(dataArray, squareArray);