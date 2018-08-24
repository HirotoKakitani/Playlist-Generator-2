var inputTerm = null;
var playlistURL = "https://www.youtube.com/embed/";
var first = true;
var idList = [];
var vidID = null;
/*
	1. when add is pressed, store the vidID in chrome storage area.
	2. when play is pressed, get every ID in chrome storage area and generate playlist URL
*/
$(document).ready(function(){
	console.log("document loaded");

    //get from storage, update idList
    chrome.storage.sync.get("list", function(result){
        //gets most up to date list from storage
        if (result.list){
            idList = result.list;
        } 
    });

	$("#add").click(function(){
		console.log("Add button pressed");
		chrome.tabs.query({'active': true, 'currentWindow': true},function(tabs){
			//parse tabs[0].url for video id, then push to idList
			vidID = tabs[0].url.split("https://www.youtube.com/watch?v=").pop();
			
			//check if the videoID was correctly parsed
			if (vidID == tabs[0].url){
				console.log("Cannot add this video");
			};
			idList.push(vidID);	//push current url to list
            
            // updates the list in storage
			chrome.storage.sync.set({"list":idList});
		});
	});

	$("#play").click(function(){
		console.log("play button pressed");
        // get current version of list 
        chrome.storage.sync.get(null, function(items){
            idList = items.list;
			if (!idList){
				idList = [];
			}
        });
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
		chrome.tabs.create({url:playlistURL});	//create new tab for video
		console.log(playlistURL);	
	});
	
	$("#del").click(function(){
		if (confirm("Clear Playlist?")){
			chrome.storage.sync.clear(function(){
				idList = [];
				console.log("removed");	
			});		
		}
	});
	/*
	$("#edit").click(function(){
		console.log("editing playlist");
	
	});*/
});
