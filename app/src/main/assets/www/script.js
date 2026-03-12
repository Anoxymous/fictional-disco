window.addEventListener("load", function() { init_main() } );

var ss_imported_scripts = [];
var ss_importCount = 0;
var ss_loadCount = 0;

function import_JS(script_src)
{
	if(ss_imported_scripts.includes(script_src))
	{
		console.log(script_src + " is already defined.");
	}
	else
	{
		ss_imported_scripts.push(script_src);
		
		console.log("Loading script " + script_src);
		ss_importCount ++;
		const script_link = document.createElement("script");
		script_link.type = "text/javascript";
		script_link.async = false;
		script_link.onload = function ()
		{
			ss_loadCount++;
			if (ss_loadCount === ss_importCount)
			{
				console.log("Done loading scripts, calling main().");
				main();
			}
		}
		script_link.src = script_src;
		document.head.appendChild(script_link);
	}
}

function import_CSS(style_src)
{
	console.log("Loading stylesheet " + script_src);
	const styles_link = document.createElement("link");
	styles_link.rel = "stylesheet";
	styles_link.href = style_src;
	document.head.appendChild(styles_link);
}

function init_main()
{
	import_JS("main.js");
}