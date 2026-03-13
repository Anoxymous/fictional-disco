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
				console.log("Done loading scripts, starting app.");
				start_app();
			}
		}
		script_link.src = script_src;
		document.head.appendChild(script_link);
	}
}

function import_CSS(style_src)
{
	console.log("Loading stylesheet " + style_src);
	const styles_link = document.createElement("link");
	styles_link.rel = "stylesheet";
	styles_link.href = style_src;
	document.head.appendChild(styles_link);
}

function init_main()
{
	app_area = document.createElement("div");
	app_area.id = "appArea";
	app_area.style.display = 'none';
	document.body.appendChild(app_area);
	
	import_JS("main.js");
}

function start_app()
{
	document.title = APP_TITLE;
	
	app_area = document.getElementById("appArea");

	document.body.replaceChildren(app_area);
	app_area.style.display = 'block';
	
	console.log("Ready. Calling main().");
	main(app_area);
}

