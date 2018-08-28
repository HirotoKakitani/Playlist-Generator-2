var idList = []
$(document).ready(function(){
	//gets most up to date list from storage
	chrome.storage.sync.get("list", function(result){
        if (result.list){
            idList = result.list;
        } 
		//TODO creates list of video IDs, need video titles
		$.each(idList, function(i, item){
			$("<li/>", {
				"text":item
			}).appendTo("div");
		});
    });
});