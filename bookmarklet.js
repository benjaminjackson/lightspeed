(function(){

	var v = "1.8.1";
    var api_url = "http://www.diffbot.com/api/article";
    var token = "c18e3a38cc8d02843975ae738beb668f";

	if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
		var done = false;
		var script = document.createElement("script");
		script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
		script.onload = script.onreadystatechange = function(){
			if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
				done = true;
				initBookmarklet();
			}
		};
		document.getElementsByTagName("head")[0].appendChild(script);
	} else {
		initBookmarklet();
	}
    
    function initBookmarklet() {
        $.getJSON(api_url + "?token=" + token + "&url=" + encodeURIComponent(window.location) + "&callback=?", function(response) {
            parseText(response.text);
        });
    };
	
	function parseText(text) {
		(window.lightspeed = function() {
            var interval;
            var words;
			if ($("#lightspeed").length == 0) {
				if (text == "") {
					alert("An error occurred parsing this page.");
				}
				if ((text != "") && (text != null)) {
					$("body").append("\
					<div id='lightspeed'>\
                        <div id='lightspeed-text'>\
                        Loading...\
                        </div>\
						<style type='text/css'>\
                        div#lightspeed {\
                            position: fixed;\
                            top: 0;\
                            z-index: 100000000000000000000;\
                            left: 0;\
                            width: 100%;\
                            height: 100%;\
                            background: #fee;\
                        }\
                        div#lightspeed-text {\
                            position:absolute;\
                            font-size: 96px;\
                            font-family: Georgia;\
                            width: 100%;\
                            height:156px;\
                            top:50%;\
                            margin-top:-120px;\
                            text-align: center;\
                        }\
						</style>\
					</div>");
					$("#lightspeed").fadeIn(750);
                    words = [];
                    var regex = /([^\s]+)\s+/g;
                    var matched = null;
                    while (matched = regex.exec(text)) {
                      words.push(matched[1]);
                    }                    
				}
			} else {
				$("#lightspeed").fadeOut(750);
				setTimeout("$('#lightspeed').remove()", 750);
			}
			$("#lightspeed").click(function(event){
                if (interval) {
                    clearInterval(interval);
                    interval = null;
                }
                else {
                    interval = setInterval(function() {
                        $('div#lightspeed-text').text(words.shift());
                    }, 60000/200);
                }
            });
			$("#lightspeed").dblclick(function(event){
				$("#lightspeed").fadeOut(750);
				setTimeout("$('#lightspeed').remove()", 750);
			});
		})();
	}

})();