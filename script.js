var svg = document.getElementById("svg");
var w = svg.getAttribute("width");
var h = svg.getAttribute("height");
var NS = "http://www.w3.org/2000/svg";
var move_circles = false;
var R = 40; //radius
var rid;

function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    var ret = [x,y];
    return ret;
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var DEATH = function(e) {
    e.stopPropagation();
    svg.removeChild(this);
    console.log("ANOTHER ONE BITES THE DUST");
    var x = getRandomInt(R + 1, w - R);
    var y = getRandomInt(R + 1, h - R);
    var new_circ = make_circ(x, y, 1, 1, R);
    svg.appendChild(new_circ);
    console.log("REBIRTH: "+x+" "+y);
};

var click_circ = function(e) {
    e.stopPropagation();
    this.setAttribute("fill","pink");
    this.addEventListener("click", DEATH);
    console.log("IRRITATED");
};

var draw_circ = function(e) {
    var coor = getCursorPosition(svg, e);
    // could change v args to rand
    var new_circ = make_circ(coor[0], coor[1], 1, 1, R);
    svg.appendChild(new_circ);
    console.log("DRAW");
};

var make_circ = function(x, y, vx, vy, r) {
    var c = document.createElementNS(NS, "circle");
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
    c.setAttribute("vx", vx);
    c.setAttribute("vy", vy);
    c.setAttribute("fill", "white");
    c.setAttribute("r", r);
    c.setAttribute("stroke","grey");
    c.setAttribute("stroke-width",1);
    c.addEventListener("click", click_circ);
    return c;
};

var move = function(){    
    window.cancelAnimationFrame(rid);

    var boiz = document.getElementsByTagName("circle");
    var move_all = function() {

	for (var i = 0; i < boiz.length; i++) {
	    var boi = boiz[i];

	    var x = parseInt(boi.getAttribute("cx"));
	    var y = parseInt(boi.getAttribute("cy"));
	    var r = parseInt(boi.getAttribute("r"));
	    if (r <= 1){
		svg.removeChild(boi);
		console.log("MICRODEATH");
	    }
	    var vx = parseInt(boi.getAttribute("vx"));
	    var vy = parseInt(boi.getAttribute("vy"));
		
	    if (x-r < 0 || x > (w-r)) {
		boi.setAttribute("vx", -1 * vx);
	    }
	    if (y-r < 0 || y > (h-r)) {
		boi.setAttribute("vy", -1 * vy);
	    }
	    boi.setAttribute("cx", x + parseInt(boi.getAttribute("vx")));
	    boi.setAttribute("cy", y + parseInt(boi.getAttribute("vy")));

	    if (boi.getAttribute("cx") == w / 2) {
		boi.setAttribute("r", r / 2);
		svg.appendChild(
		    make_circ(parseInt(boi.getAttribute("cx")),
				parseInt(boi.getAttribute("cy")),
				parseInt(boi.getAttribute("vx") * -1),
				parseInt(boi.getAttribute("vy") * -1),
				parseInt(boi.getAttribute("r"))
			     ));
		console.log("M I T O S I S");
	    }
	}   
	rid = window.requestAnimationFrame(move);
    };
    move_all();
}

svg.addEventListener("click", draw_circ);

var clearbtn = document.getElementById("clear");
clearbtn.addEventListener("click", function(e){
    window.cancelAnimationFrame(rid);
    while (svg.lastChild) {
	svg.removeChild(svg.lastChild);
    }

    console.log("ERADICATION");
});

var movebtn = document.getElementById("move");
movebtn.addEventListener("click", move);
