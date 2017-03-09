var svg = document.getElementById("svg");
var NS = "http://www.w3.org/2000/svg";

function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    var ret = [x,y];
    return ret;
}

var DEATH = function(e) {
//    e.stopPropagation();
    svg.removeChild(this);
    console.log("ANOTHER ONE BITES THE DUST");
    x = Math.floor(Math.random()*svg.getBoundingClientRect().width);
    y = Math.floor(Math.random()*svg.getBoundingClientRect().height);
    svg.appendChild(make_circ(x,y));
    console.log("BIRTH");
}

var click_circ = function(e) {
    e.stopPropagation();
    this.setAttribute("fill","pink");
    this.addEventListener("click", DEATH);
    console.log("IRRITATED");
}

var draw_circ = function(e) {
    var coor = getCursorPosition(svg, e);
    svg.appendChild(make_circ(coor[0],coor[1]));
    console.log("DRAW");
}

var make_circ = function(x,y) {
    var c = document.createElementNS(NS, "circle");
    var line = document.createElementNS(NS, "line");    
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
    c.setAttribute("fill","white");
    c.setAttribute("r", 20);
    c.setAttribute("stroke","grey");
    c.setAttribute("stroke-width",1);
    c.addEventListener("click", click_circ);
    return c;
};

svg.addEventListener("click", draw_circ);

var clearbtn = document.getElementById("clear");
clearbtn.addEventListener("click", function(e){
    while (svg.lastChild) {
	svg.removeChild(svg.lastChild);
    }
    console.log("ERADICATION");
});

var move_circles = function(e) {
    var listOfCircles = document.getElementsByTagName('circle');
    for (i = 0; i < listOfCircles.length; i++){
	console.log(listOfCircles[i]);
    }
};

var movebtn = document.getElementById("move");
movebtn.addEventListener("click", move_circles);
