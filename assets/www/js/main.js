var currentHistoryIndex = -1;

var pageHistory = [];

function init() {
	document.addEventListener("deviceready", function() {chrome.initialize(); }, true);
}

function homePage() {
	app.navigateToPage(app.baseURL);
}

function aboutPage() {
	chrome.hideOverlays();
	$("#about-page-overlay").localize().show();
	$("#aboutclose").unbind('click');
	$("#about-license").html(urlifyText($("#about-license").html()));
	getFile("CREDITS", writeCredits);
	$("#aboutclose").bind('click', function(){
		$("#about-page-overlay").hide();
		appSettings.showSettings();
	});
	chrome.doFocusHack();
}

function writeCredits(data) {
	data = urlifyText(data);
	data = data.split("== Developers == ");
	data = data[1].split("== Included external works ==");
	data[0] = data[0].replace(/[\r\n]+/, "");
	data[0] = data[0].replace(/[\r\n]+/g, ", ");
	data[0] = data[0].substr(0, data[0].length - 2);
	data[1] = data[1].substr(data[1].search(/\*/));
	data[1] = data[1].replace(/\*/g, "");
	data[1] = data[1].replace(/[\r\n]+/g, "<br>")
	$("#about-contributors").html(data[0]);
	$("#about-software").html(data[1]);
}

function urlifyText(text)
{
    var matches = text.match(/http(s)?:\/\/[A-Za-z0-9\-\+&@#\/%?=~_|!:,\.;]+/g);
    for(var i = 0 ; i < matches.length ; i++)
        text = text.replace(matches[i], "<a href='" + matches[i] + "'>" + matches[i] + "</a>" );
    return text;
}

function getFile(filepath, success_cb) {
	   
	var doRequest = function() {
		network.makeRequest({
   			type: 'GET',
			url: 'file:///android_asset/www/' + filepath,
			success: function(data) {
				success_cb(data);
			},
			error: function(err) {
				console.log("ERROR!" + JSON.stringify(err));
			}
		});
	};
	
	doRequest();
}
