var inputTerm = null;
var playlistURL = "https://www.youtube.com/embed/";
var first = true;
$(document).ready(function(){
    console.log("page ready");
    $("#submit").click(function(){
        console.log("pressed");
        inputTerm = document.getElementById("keyword").value;
        $.get(
            "https://www.googleapis.com/youtube/v3/search",
            {
            part: "snippet",
            maxResults: "15",
            q: inputTerm,
            type: "video",
            key: ""},
            function (data){
                $.each(data.items, function(i, item){   //look into why we need an i for responses to show
                    console.log(item.snippet.title);
                    console.log(item.id.videoId);   //TODO "https://www.youtube.com/embed/ID_FIRST?playlist=ID_SECOND,ID_THIRD
                    if (first){
                        playlistURL = playlistURL.concat(item.id.videoId);
                        playlistURL = playlistURL.concat("?playlist=");   
                        first = false;
                    }
                    else{
                        playlistURL = playlistURL.concat(item.id.videoId);
                        playlistURL = playlistURL.concat(",");
                    }
                });
                console.log(playlistURL);
            });

    });
});

