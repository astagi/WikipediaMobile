var currentHistoryIndex = -1;

var pageHistory = [];

function init() {
	document.addEventListener("deviceready", function() {chrome.initialize(); }, true);
}

function homePage() {
	app.navigateToPage(app.baseURL);
}

function aboutPage() {
	$('#content').hide();
	chrome.hideOverlays();
	$("#about-page-overlay").localize().show();
	$("#aboutclose").unbind('click');
	$("#aboutclose").bind('click', function(){
		$("#about-page-overlay").hide();
		$('#content').show();
		appSettings.showSettings();
	});
	chrome.doFocusHack();
}
