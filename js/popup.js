var inputTerm = null;
var playlistURL = "https://www.youtube.com/embed/";
var first = true;
var idList = [];
$(document).ready(function(){
	console.log("document loaded");
	$("#add").click(function(){
		console.log("Add button pressed");
		chrome.tabs.query({'active': true, 'currentWindow': true},function(tabs){ //look into lastFocusedWindow
			//TODO parse tabs[0].url for video id, then push to idList
			idList.push(tabs[0].url);	//push current url to list
			console.log(idList);
		});
		
	});
	$("#play").click(function(){
		console.log("play button pressed");
	});
});

