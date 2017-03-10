var svg = document.getElementById("svg");
var w = svg.getAttribute("width");
var h = svg.getAttribute("height");
var NS = "http://www.w3.org/2000/svg";
var move_circles = false;
var r = 60; //radius

function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    var ret = [x,y];
    return ret;
};

var DEATH = function(e) {
//    e.stopPropagation();
    svg.removeChild(this);
    console.log("ANOTHER ONE BITES THE DUST");
    var x = Math.floor(Math.random()*w);
    var y = Math.floor(Math.random()*h);
    var new_circ = make_circ(x, y);
    svg.appendChild(new_circ);
    var xdirection = false;
    var ydirection = false;
    var randx = Math.random() * 2 + 1;
    var randy = Math.random() * 2 + 1;
    var move_circle1 = function() {
        if(move_circles) {
            new_circ.setAttribute("cx", x);
            new_circ.setAttribute("cy", y);
            if (xdirection) {
                x -= randx / 2.5;
            }
            else {
                x += randx / 2.5;
            }
            if (ydirection) {
                y -= randy;
            }
            else {
                y += randy;
            }
            if (x <= r) {
                xdirection = false;
            }
            if (x >= (640 - r)) {
                xdirection = true;
            }
            if (y <= r) {
                ydirection = false;
            }
            if (y >= (480 - r)) {
                ydirection = true;
            }
	    if (x == 320) {
		console.log("I'M AT THE MIDDLE!");
	    }
	    console.log(x + " " + y);
        }
        window.requestAnimationFrame(move_circle1);
        new_circ.addEventListener("click", click_circ);
    };
    move_circle1();

    console.log("BIRTH");
};

var click_circ = function(e) {
    e.stopPropagation();
    this.setAttribute("fill","pink");
    this.addEventListener("click", DEATH);
    console.log("IRRITATED");
};

var draw_circ = function(e) {
    var coor = getCursorPosition(svg, e);
    var new_circ = make_circ(coor[0], coor[1]);
    svg.appendChild(new_circ);
    console.log("DRAW");
    var x = coor[0];
    var y = coor[1];
    var xdirection = false;
    var ydirection = false;
    var randx = Math.random() * 2 + 1;
    var randy = Math.random() * 2 + 1;
    var move_circle = function() {
        if(move_circles) {
            new_circ.setAttribute("cx", x);
            new_circ.setAttribute("cy", y);
            if (xdirection) {
                x -= randx / 2.5;
            }
            else {
                x += randx / 2.5;
            }
            if (ydirection) {
                y -= randy;
            }
            else {
                y += randy;
            }
            if (x <= r) {
                xdirection = false;
            }
            if (x >= (640 - r)) {
                xdirection = true;
            }
            if (y <= r) {
                ydirection = false;
            }
            if (y >= (480 - r)) {
                ydirection = true;
            }
	    if (Math.round(x) == w/2 ) {
		console.log("I'M AT THE MIDDLE!");
	    }
        }
        window.requestAnimationFrame(move_circle)
        new_circ.addEventListener("click", click_circ);
    };
    move_circle();
};

var make_circ = function(x,y) {
    var c = document.createElementNS(NS, "circle");
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
    c.setAttribute("fill","white");
    c.setAttribute("r", r);
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
    move_circles = false;
});

var get_jiggy_with_it = function(e) {
    move_circles = true;
};

var movebtn = document.getElementById("move");
movebtn.addEventListener("click", get_jiggy_with_it);
