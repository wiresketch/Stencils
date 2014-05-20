 var doc, svg, selection, buttons;
 var spacing = 5, hpadding = 6, vpadding = 3;
 
 function onLoad(evt) {
	svg = evt.target;
	doc = svg.ownerDocument;
	selection = doc.getElementById("selection");
	buttons = doc.createElement("g");
	svg.appendChild(buttons);
 }
 
 function onResize(evt) {
 	var width = parseInt(svg.getAttribute("width"));
 	var height = parseInt(svg.getAttribute("height"));
    var selectionIndex = ($model.selection === null || $model.selection === "") ? -1 : Number($model.selection);
	if(!(selectionIndex >= -1 && selectionIndex < $items.length))
		selectionIndex = -1;
 	var allSpacing = ($items.length - 1) * spacing;
 	var preferredWidth = getPreferredSize().width - allSpacing;
 	var availableWidth = width - allSpacing;
 	clearNode(buttons);
 	selection.setAttribute("display", selectionIndex >= 0 && selectionIndex < items.length ? "inline" : "none");
 	
 	for(var i = 0, x = 0; i < $items.length; i ++) {
 		var itemWidth;
 		
 		if(i == $items.length - 1) {
 			itemWidth = width - x;
 		} else {
 			itemWidth = $items[i].width + hpadding * 2;
 			itemWidth = Math.round(itemWidth * availableWidth / preferredWidth);
 		}
 		
 		var text = doc.createElement("foreignObject");
 		text.setAttribute("id", "item" + i);
 		text.setAttribute("fill", selectionIndex == i ? "red" : "white");
 		text.setAttribute("x", x);
 		text.setAttribute("y", 0);
 		text.setAttribute("width", itemWidth);
 		text.setAttribute("height", height);
		buttons.appendChild(text);
		 		
 		if(selectionIndex == i) {
 			selection.setAttribute("x", x);
 			resizeSelection(selection, itemWidth, height);
 		}
 		
 		x += itemWidth + spacing;
 	}
 }
 
 function resizeSelection(element, width, height) {
	element.setAttribute("width", width);
	element.setAttribute("height", height);
 }
 
 function getPreferredSize() {
 	var width = 0, height = 0;
 	
 	for(var i = 0; i < $items.length; i++) {
 		width += $items[i].width;
 		height = Math.max(height, $items[i].height);
 	}
 	
 	width += $items.length * hpadding * 2;
 	width += ($items.length - 1) * spacing;
 	height += vpadding * 2;
 	
 	return { width: width, height: height };
 }
 
 function clearNode(node) {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
 } 
