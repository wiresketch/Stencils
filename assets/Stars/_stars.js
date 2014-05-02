var svg, doc, container;
var filledColor = "white", emptyColor = "#CCC";

function onLoad(evt) {
	svg = evt.target;
	doc = svg.ownerDocument;
	container = doc.createElement("g");
	svg.appendChild(container);
}

function onResize(evt) {
	var width = parseInt(svg.getAttribute("width"));
	var height = parseInt(svg.getAttribute("height"));
	
	clearNode(container);
	
	var spacing = Math.round((width - height * 5) / 4);
	var value = Math.round($model.value * 5 / 100);
	
	for(var n = 1, x = 0; n <= 5; n++, x += height + spacing) {
		var star = doc.createElement("polygon");
		star.setAttribute("points", calculateStarPoints(x + height / 2, height / 2, 5, height / 2, height / 4.5));
		star.setAttribute("fill", n <= value ? filledColor : emptyColor);
		container.appendChild(star);
	}
}

function calculateStarPoints(centerX, centerY, arms, outerRadius, innerRadius) {
	var results = "";

	var angle = Math.PI / arms;

	for ( var i = 0; i < 2 * arms; i++) {
		var r = (i & 1) == 0 ? outerRadius : innerRadius;

		var currX = centerX + Math.sin(i * angle + Math.PI) * r;
		var currY = centerY + Math.cos(i * angle + Math.PI) * r;

		if (i == 0) {
			results = currX + "," + currY;
		} else {
			results += ", " + currX + "," + currY;
		}
	}

	return results;
}

function clearNode(node) {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
}
