
var aParamNames = [
	'bHideCommentPlus', 
	'bHideCommentMinus', 
	'bHideCommentNegative', 
	'bHideCommentResult', 
	'bHidePostMinus', 
	'bHidePostNegative', 
	'bHideCommentSidebar', 
	'bShowCommentsTree', 
	'bHideCommentLeftPadding', 
	'bCommentWidth', 
	'bOwnCarma',
	'bThemeReverse',
	'bNewCommnetOrderBranch'
];

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	
	for(let key in request) {
		if(aParamNames.indexOf(key)>-1 && request[key] != undefined) {
			var o = {};
			o[key] = request[key];
			chrome.storage.sync.set(o, function() {
			});
				 
			chrome.tabs.query({ active: true }, function(tabs){
				var oTab = tabs[0];
				chrome.tabs.sendMessage(oTab.id, {src: key, val: request[key]});
			})			
		}
	}
});