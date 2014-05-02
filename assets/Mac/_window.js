var svg, doc;
var closeButton, minimizeButton, maximizeButton;
var window, title, separator, scrollbar;
var titleHeight;

function onload(evt) {
	svg = evt.target;
	doc = svg.ownerDocument;
	closeButton = doc.getElementById("close-button");
	minimizeButton = doc.getElementById("minimize-button");
	maximizeButton = doc.getElementById("maximize-button");
	window = doc.getElementById("window");
	title = doc.getElementById("item0");
	separator = doc.getElementById("separator");
	scrollbar = doc.getElementById("scrollbar");
	
	titleHeight = parseInt(separator.getAttribute("d").split(",")[1]);
}

function onresize(evt) {
	var width = parseInt(svg.getAttribute("width"));
	var height = parseInt(svg.getAttribute("height"));

	toggleDisplay(closeButton, model.closeButton);
	toggleDisplay(minimizeButton, model.minimizeButton);
	toggleDisplay(maximizeButton, model.maximizeButton);

	title.setAttribute("x", (width - items[0].width) / 2);
	title.setAttribute("width", items[0].width + 5);

	window.setAttribute("width", width - 2);
	window.setAttribute("height", height - 2);

	separator.setAttribute("d", "M2," + (titleHeight) + "," + (width - 2) + "," + (titleHeight));

	toggleDisplay(scrollbar, model.verticalScrollbar);

	var scrollbarHeight = height / 10;
	scrollbar.setAttribute("height", scrollbarHeight);
	scrollbar.setAttribute("x", width - 8 - 4);
	scrollbar.setAttribute("y", titleHeight + 3 + (height - scrollbarHeight - titleHeight - 3 - 4)
			* model.value / 100);
}

function toggleDisplay(element, on) {
	element.setAttribute("display", on ? "inline" : "none");
}
