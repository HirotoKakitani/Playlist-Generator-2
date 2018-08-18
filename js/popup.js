var inputTerm = null;
var playlistURL = "https://www.youtube.com/embed/";
var first = true;
var idList = [];
var vidID = null;
//TODO  chrome storage
/*
	1. when add is pressed, store the vidID in chrome storage area.
	2. when play is pressed, get every ID in chrome storage area and generate playlist URL
*/
$(document).ready(function(){
	//chrome.storage.sync.set();
	console.log("document loaded");
	$("#add").click(function(){
		console.log("Add button pressed");
		chrome.tabs.query({'active': true, 'currentWindow': true},function(tabs){ //look into lastFocusedWindow
			//parse tabs[0].url for video id, then push to idList
			vidID = tabs[0].url.split("https://www.youtube.com/watch?v=").pop();
			
			//check if the videoID was correctly parsed
			if (vidID == tabs[0].url){
				console.log("Cannot add this video");
			};
			idList.push(vidID);	//push current url to list
			console.log(tabs[0].url);
			console.log(vidID);
			console.log(idList);
            
            //TODO testing chrome.storage
            chrome.storage.sync.set({"testKey": vidID});
			
		});
	});
	$("#play").click(function(){
		console.log("play button pressed");
		$.each(idList, function(i, item){
			if (first){
				playlistURL = playlistURL.concat(item);
				playlistURL = playlistURL.concat("?playlist=");
				first = false;
			}
			else{
				playlistURL = playlistURL.concat(item);
				playlistURL = playlistURL.concat(",");
			}
		});
		console.log(playlistURL);
		
        //TODO testing chrome.storage
        chrome.storage.sync.get(null, function(items){
            var temp = Object.keys(items);
            alert(temp);
        });
	});
});
