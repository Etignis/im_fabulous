chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	// hide Plus button
	if(request.bHideCommentPlus != undefined) {		
		chrome.storage.sync.set({'bHideCommentPlus': request.bHideCommentPlus}, function() {
    });
			 
		chrome.tabs.query({ active: true }, function(tabs){
			var oTab = tabs[0];
			chrome.tabs.sendMessage(oTab.id, {src: "bHideCommentPlus", val: request.bHideCommentPlus});
		})			
	}
	
	// hide Minus button
	if(request.bHideCommentMinus != undefined) {		
		chrome.storage.sync.set({'bHideCommentMinus': request.bHideCommentMinus}, function() {
    });
			 
		chrome.tabs.query({ active: true }, function(tabs){
			var oTab = tabs[0];
			chrome.tabs.sendMessage(oTab.id, {src: "bHideCommentMinus", val: request.bHideCommentMinus});
		})			
	}
	
	// hide Minus post
	if(request.bHidePostMinus != undefined) {		
		chrome.storage.sync.set({'bHidePostMinus': request.bHidePostMinus}, function() {
    });
			 
		chrome.tabs.query({ active: true }, function(tabs){
			var oTab = tabs[0];
			chrome.tabs.sendMessage(oTab.id, {src: "bHidePostMinus", val: request.bHidePostMinus});
		})			
	}
	
	// hide Negative
	if(request.bHideCommentNegative != undefined) {		
		chrome.storage.sync.set({'bHideCommentNegative': request.bHideCommentNegative}, function() {
    });
			 
		chrome.tabs.query({ active: true }, function(tabs){
			var oTab = tabs[0];
			chrome.tabs.sendMessage(oTab.id, {src: "bHideCommentNegative", val: request.bHideCommentNegative});
		})			
	}
	// hide Negative Posts
	if(request.bHidePostNegative != undefined) {		
		chrome.storage.sync.set({'bHidePostNegative': request.bHidePostNegative}, function() {
    });
			 
		chrome.tabs.query({ active: true }, function(tabs){
			var oTab = tabs[0];
			chrome.tabs.sendMessage(oTab.id, {src: "bHidePostNegative", val: request.bHidePostNegative});
		})			
	}
	
	// hide Result
	if(request.bHideCommentResult != undefined) {		
		chrome.storage.sync.set({'bHideCommentResult': request.bHideCommentResult}, function() {
      //alert(request.bHideCommentResult);
    });
			 
		chrome.tabs.query({ active: true }, function(tabs){
			var oTab = tabs[0];
			chrome.tabs.sendMessage(oTab.id, {src: "bHideCommentResult", val: request.bHideCommentResult});
		})	
	}
	
	// hie Sidebar
	if(request.bHideCommentSidebar != undefined) {		
		chrome.storage.sync.set({'bHideCommentSidebar': request.bHideCommentSidebar}, function() {
      //alert(request.bHideCommentResult);
    });
			 
		chrome.tabs.query({ active: true }, function(tabs){
			var oTab = tabs[0];
			chrome.tabs.sendMessage(oTab.id, {src: "bHideCommentSidebar", val: request.bHideCommentSidebar});
		})	
	}
	
	// show Tree
	if(request.bShowCommentsTree != undefined) {		
		chrome.storage.sync.set({'bShowCommentsTree': request.bShowCommentsTree}, function() {
      //alert(request.bHideCommentResult);
    });
			 
		chrome.tabs.query({ active: true }, function(tabs){
			var oTab = tabs[0];
			chrome.tabs.sendMessage(oTab.id, {src: "bShowCommentsTree", val: request.bShowCommentsTree});
		})	
	}
	
	// hide padding Left
	if(request.bHideCommentLeftPadding != undefined) {		
		chrome.storage.sync.set({'bHideCommentLeftPadding': request.bHideCommentLeftPadding}, function() {
      //alert(request.bHideCommentResult);
    });
			 
		chrome.tabs.query({ active: true }, function(tabs){
			var oTab = tabs[0];
			chrome.tabs.sendMessage(oTab.id, {src: "bHideCommentLeftPadding", val: request.bHideCommentLeftPadding});
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