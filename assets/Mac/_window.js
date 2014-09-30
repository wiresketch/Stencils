var svg, doc;
var closeButton, minimizeButton, maximizeButton;
var window, title, titlebar, scrollbar;
var titleHeight;

function onload(evt) {
	svg = evt.target;
	doc = svg.ownerDocument;
	closeButton = doc.getElementById("close-button");
	minimizeButton = doc.getElementById("minimize-button");
	maximizeButton = doc.getElementById("maximize-button");
	window = doc.getElementById("window");
	title = doc.getElementById("item0");
	titlebar = doc.getElementById("titlebar");
	scrollbar = doc.getElementById("scrollbar");
	
	titleHeight = parseInt(titlebar.getAttribute("height")) + 1;
}

function onresize(evt) {
	var width = parseInt(svg.getAttribute("width"));
	var height = parseInt(svg.getAttribute("height"));

	toggleDisplay(closeButton, model.closeButton);
	toggleDisplay(minimizeButton, model.minimizeButton);
	toggleDisplay(maximizeButton, model.maximizeButton);

	title.setAttribute("x", (width - items[0].width) / 2);
	title.setAttribute("width", items[0].width + 5);

	titlebar.setAttribute("width", width - 2);
	titlebar.setAttribute("height", titleHeight - 1);
	
	window.setAttribute("d", "M" + (width - 1) + "," + (titleHeight - 1) + ","
			+ (width - 1) + "," + (height - 1) + "," + 1 + "," + (height - 1)
			+ "," + 1 + "," + (titleHeight - 1));

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
