var idList = []
$(document).ready(function(){
	//gets most up to date list from storage
	chrome.storage.sync.get("list", function(result){
        if (result.list){
            idList = result.list;
        } 
    });
	alert(idList);
	//TODO go through videos in list, grab their titles, and list them all
	//TODO create functionality for removing a video, as well as moving the video up/down the list
	$("div").append("<li>item</li>");
	$("div").append("<li>item2</li>");
});