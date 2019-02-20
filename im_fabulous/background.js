chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	//alert("got message");
	if(request.bHideCommentPlus != undefined) {		
		chrome.storage.sync.set({'bHideCommentPlus': request.bHideCommentPlus}, function() {
    });
			 
		chrome.tabs.query({ active: true }, function(tabs){
			var oTab = tabs[0];
			chrome.tabs.sendMessage(oTab.id, {src: "bHideCommentPlus", val: request.bHideCommentPlus});
		})			
	}
	if(request.bHideCommentResult != undefined) {		
		chrome.storage.sync.set({'bHideCommentResult': request.bHideCommentResult}, function() {
      //alert(request.bHideCommentResult);
    });
			 
		chrome.tabs.query({ active: true }, function(tabs){
			var oTab = tabs[0];
			chrome.tabs.sendMessage(oTab.id, {src: "bHideCommentResult", val: request.bHideCommentResult});
		})	
	}
});

var s=false;
if(s==true){
	chrome.runtime.requestUpdateCheck(function (status, details) {
		debugger;
	});
}

chrome.runtime.onUpdateAvailable.addListener(function (request, sender, sendResponse) {
	debugger;
});