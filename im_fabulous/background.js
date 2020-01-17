const API = (window.navigator.vendor=="Google Inc.")? chrome : browser;

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
	'bNewCommnetOrderBranch',
	'bHideSiteTitle',
	'bSimpleOnAir',
	'bNewComments'
];

API.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	
	for(let key in request) {
		if(aParamNames.indexOf(key)>-1 && request[key] != undefined) {
			var o = {};
			o[key] = request[key];
			API.storage.sync.set(o, function() {
			});
				 
			API.tabs.query({ currentWindow: true,active: true }, function(tabs){
				var oTab = tabs[0];
				var o = {};
				o.src = key;
				o.val = request[key];
				API.tabs.sendMessage(oTab.id, o);
				//API.runtime.sendMessage(o);
			})			
		}
	}
});