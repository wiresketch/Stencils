/**
 * Reusable script for custom ButtonBar widgets.
 */
var svg, doc;
var container, bar, backgroundLeft, backgroundSingle, backgroundMiddle, backgroundRight, separator;
var hPadding = 10, vPadding = 6;
var selectionColor = "#CCC";

function onLoad(evt) {
    svg = evt.target;
    doc = svg.ownerDocument;
    container = doc.getElementById("container");
    bar = doc.getElementById("bar");
    backgroundLeft = doc.getElementById("background-left");
    backgroundSingle = doc.getElementById("background-single");
    backgroundMiddle = doc.getElementById("background-middle");
    backgroundRight = doc.getElementById("background-right");
    separator = doc.getElementById("separator");

    prepareTemplate(backgroundLeft);
    prepareTemplate(backgroundSingle);
    prepareTemplate(backgroundMiddle);
    prepareTemplate(backgroundRight);
    prepareTemplate(separator);
    
	container.removeAttribute('fill');
    
    clearNode(container);
}

function prepareTemplate(template) {
	template.removeAttribute('transform');
	template.removeAttribute('fill');
	template.parentNode.removeChild(template);
}

function onResize(evt) {
    var width = parseInt(svg.getAttribute("width"));
    var height = parseInt(svg.getAttribute("height"));
    var itemWidth = Math.round(width / $items.length);
    var lastItemWidth = width - itemWidth * ($items.length - 1);
    var selectionIndex = ($model.selection === null || $model.selection === "") ? -1 : Number($model.selection);
	if(!(selectionIndex >= -1 && selectionIndex < $items.length))
		selectionIndex = -1;

    clearNode(container);

	resizeBar(bar, width, height);

    for (var i = 0, n = $items.length, x = 1, y = 1; i < n; i++, x += itemWidth) {
        var item = $items[i];
        var iItemWidth = i == n - 1 ? lastItemWidth : itemWidth;
        var iFill = i == selectionIndex ? selectionColor : "white";
        var bgTemplate;

        if (n == 1) {
        	bgTemplate = backgroundSingle;
        } else if (i == 0) {
        	bgTemplate = backgroundLeft;
        } else if (i == n - 1) {
        	bgTemplate = backgroundRight;
        } else {
        	bgTemplate = backgroundMiddle;
        }

        var bg = bgTemplate.cloneNode(false);
		resizeBackground(bgTemplate, bg, x, y, iItemWidth, height);
        bg.setAttribute("fill", iFill);
        container.appendChild(bg);

        var text = doc.createElement("foreignObject");
        text.setAttribute("id", "item" + i);
        text.setAttribute("x", x - 1);
        text.setAttribute("y", y - 1)
        text.setAttribute("width", iItemWidth);
        text.setAttribute("height", height);
        text.setAttribute("fill", iFill);
        container.appendChild(text);
    }

    for (var i = 0, n = $items.length - 1, x = itemWidth; i < n; i++, x += itemWidth) {
        var sep = separator.cloneNode(false);
        sep.setAttribute("d", "M" + x + ",2," + x + "," + (height - 2));
        container.appendChild(sep);
    }
}

function resizeBar(element, width, height) {
    element.setAttribute("width", width - 2);
    element.setAttribute("height", height - 2);
}
	

function clearNode(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function getPreferredSize() {
    var maxWidth = 0,
        maxHeight = 0;

    for (var i = 0, n = $items.length; i < n; i++) {
        var item = $items[i];
        maxWidth = Math.max(maxWidth, item.width);
        maxHeight = Math.max(maxHeight, item.height);
    }

    maxWidth += hPadding * 2;
    maxHeight += vPadding * 2;

    return {
        width: maxWidth * $items.length,
        height: maxHeight
    };
}
