var svg = document.getElementById("svg");
var NS = "http://www.w3.org/2000/svg";

function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    var ret = [x,y];
    return ret;
}

var blop = function(e) {
    var c = document.createElementNS(NS, "circle");
    var line = document.createElementNS(NS, "line");
    
    var coor = getCursorPosition(svg, e);

    c.setAttribute("fill","white");
    c.setAttribute("cx", coor[0]);
    c.setAttribute("cy", coor[1]);
    c.setAttribute("r", 20);
    c.setAttribute("stroke","grey");
    c.setAttribute("stroke-width",1);

    svg.appendChild(c);
    console.log(c);
};

svg.addEventListener("click", blop);

var clearbtn = document.getElementById("clear");
clearbtn.addEventListener("click", function(e){
    while (svg.lastChild) {
	svg.removeChild(svg.lastChild);
    }
    console.log("clear");
});

var movebtn = document.getElementById("move");
movebtn.addEventListener("click", function(e){
    console.log("move: under construction");
}
);
