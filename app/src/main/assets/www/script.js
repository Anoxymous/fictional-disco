window.addEventListener("load", function() { import_resources() } );

const import_ss_libs = ["./ui/controls.js"];
const import_ss_styl = [];

var ss_importCount = 0;
var ss_loadCount = 0;

function loadJS(script_src, script_load_function)
{
	const script_link = document.createElement("script");
	script_link.type = "text/javascript";
	script_link.onload = script_load_function;
	script_link.src = script_src;
	document.head.appendChild(script_link);
}

function import_JS(script_src)
{
	ss_importCount ++;
	const script_link = document.createElement("script");
	script_link.type = "text/javascript";
	script_link.onload = function ()
	{
		ss_loadCount++;
		if (ss_loadCount === ss_importCount)
		{
			main();
		}
	}
	script_link.src = script_src;
	document.head.appendChild(script_link);
}

function import_CSS(style_src)
{
	const styles_link = document.createElement("link");
	styles_link.rel = "stylesheet";
	styles_link.href = style_src;
	document.head.appendChild(styles_link);
}

function import_resources()
{
	loadJS("main.js", null)
	
	// Load consts here
	
	import_ss_libs.forEach(function(script_name) {
		import_JS(script_name)
	});
	
	import_ss_styl.forEach(function(script_name) {
		import_CSS(script_name)
	});
}