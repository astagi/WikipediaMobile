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
	getFile("CREDITS", writeCredits);
	$("#aboutclose").bind('click', function(){
		$("#about-page-overlay").hide();
		appSettings.showSettings();
	});
	chrome.doFocusHack();
}

function writeCredits(data) {
	data = data.split("== Developers == ");
	data = data[1].split("== Included external works ==");
	data[0] = data[0].replace(/[\r\n]+/, "")
	$("#about-contributors").html(data[0].replace(/[\r\n]+/g, ", "));
	data[1] = data[1].replace(/[\r\n]+/g, "<br>")
	$("#about-software").html(data[1]);
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
