var svg, doc, container;
var hPadding = 8, vPadding = 8;
var fillColor = "white", selectionColor = "#CCC";

function onLoad(evt) {
	svg = evt.target;
	doc = svg.ownerDocument;

	container = doc.createElement("g");
	svg.appendChild(container);
}

function onResize(evt) {
	var width = parseInt(svg.getAttribute("width"));
	var height = parseInt(svg.getAttribute("height"));

	var arrowWidth = Math.round(height / 3);
	var itemWidth = Math.max(0, Math.round((width - arrowWidth - 1)
			/ $items.length));
	var lastItemWidth = Math.max(0, width - arrowWidth - 1
			- ($items.length - 1) * itemWidth);

	var selectionIndex = ($model.selection === null || $model.selection === "") ? -1
			: Number($model.selection);

	clearNode(container);

	for ( var i = 0, n = $items.length, x = 0; i < n; i++) {
		var item = $items[i];
		var iItemWidth = i == n - 1 ? lastItemWidth : itemWidth;
		var iFill = i == selectionIndex ? selectionColor : fillColor;

		var background = doc.createElement("path");
		background.setAttribute("d", "M" + (x + 1) + ",1,"
				+ (x + iItemWidth + 1) + ",1," + (x + iItemWidth + arrowWidth)
				+ "," + (height / 2) + "," + (x + iItemWidth + 1) + ","
				+ (height - 1) + "," + (x + 1) + "," + (height - 1) + ","
				+ (x + arrowWidth) + "," + (height / 2) + "z");
		background.setAttribute("fill", iFill);
		background.setAttribute("stroke", "none");
		container.appendChild(background);

		var text = doc.createElement("foreignObject");
		text.setAttribute("id", "item" + i);
		text.setAttribute("fill", iFill);
		text.setAttribute("x", x + arrowWidth + hPadding);
		text.setAttribute("y", 0);
		text.setAttribute("width", iItemWidth - arrowWidth - hPadding * 2);
		text.setAttribute("height", height);
		container.appendChild(text);

		var link = doc.createElement("foreignObject");
		link.setAttribute("id", "link" + i);
		link.setAttribute("x", x + arrowWidth);
		link.setAttribute("y", 0);
		link.setAttribute("width", iItemWidth - arrowWidth);
		link.setAttribute("height", height);
		container.appendChild(link);

		x += iItemWidth;
	}

	for ( var i = 0, n = $items.length - 1, x = itemWidth; i < n; i++) {
		var separator = doc.createElement("path");
		separator.setAttribute("d", "M" + (x + 1) + ",1," + (x + arrowWidth)
				+ "," + (height / 2) + "," + (x + 1) + "," + (height - 1));
		separator.setAttribute("stroke", "black");
		separator.setAttribute("fill", "none");
		separator.setAttribute("stroke-width", 2);
		separator.setAttribute("stroke-linejoin", "round");
		container.appendChild(separator);

		x += itemWidth;
	}

	var outline = doc.createElement("path");
	outline.setAttribute("d", "M1,1," + (width - arrowWidth) + ",1,"
			+ (width - 1) + "," + (height / 2) + "," + (width - arrowWidth)
			+ "," + (height - 1) + ",1," + (height - 1) + "," + (arrowWidth)
			+ "," + (height / 2) + "z");
	outline.setAttribute("stroke", "black");
	outline.setAttribute("fill", "none");
	outline.setAttribute("stroke-width", 2);
	outline.setAttribute("stroke-linejoin", "round");
	container.appendChild(outline);
}

function clearNode(node) {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
}

function getPreferredSize() {
	var maxWidth = 0, maxHeight = 0;

	for ( var i = 0, n = $items.length; i < n; i++) {
		var item = $items[i];
		maxWidth = Math.max(maxWidth, item.width);
		maxHeight = Math.max(maxHeight, item.height);
	}

	maxHeight += vPadding * 2;
	var arrowWidth = Math.round(maxHeight / 3);

	var itemWidth = maxWidth + hPadding * 2 + arrowWidth;
	var width = $items.length * itemWidth + arrowWidth + 1;

	return {
		width : width,
		height : maxHeight
	};
}
