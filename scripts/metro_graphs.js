// Native
var pBrowser = document.querySelector("p");
pBrowser.innerText = "Hello world";

// D3
var pD3 = d3.select("p");
var pD3All = d3.selectAll("p");


console.log(pBrowser);
console.log(pD3);
console.log(pD3All);


var span = pD3.append("span")
console.log("span: " + span);

var p = d3.selectAll("p");
var color = p.style("color", "blue");
// var attr = p.attr("class", "foo");

var text = p.text();

p.classed("foo", true);
p.classed("bar", true);
p.classed("bar", false);

p.style("border", "1px solid black");