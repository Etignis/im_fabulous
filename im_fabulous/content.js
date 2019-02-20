var oLocalSettings = {
	bHideCommentPlus: {
		val: true,
		css: ".comment-wrapper .vote-up{display: none !important;}"
	},
	
	bHideCommentResult: {
		val: true,
		css: ".comment-wrapper .vote-count{display: none !important;}"
	}	
};
	
	
function implementSettings(oSettings){
	var aStyle = [];

	for(var key in oSettings) {
		oLocalSettings[key].val = oSettings[key].val || false;
	}
	for(var key in oLocalSettings) {
		if(oLocalSettings[key].val) {
			aStyle.push(oLocalSettings[key].css);
		}
	}
	/**/
	setGlobalCss(aStyle.join(" "));
}	
implementSettings();
var oSettingsPropmise = new Promise (function(resolve, reject){
	chrome.storage.sync.get([
		'bHideCommentPlus', 
		'bHideCommentResult'
	], function(result) {
		console.log('settings: ');
		console.dir(result);
		oLocalSettings.bHideCommentPlus.val = result.bHideCommentPlus || false;
		oLocalSettings.bHideCommentResult.val = result.bHideCommentResult || false;
		resolve(oLocalSettings);
	})
}) 

oSettingsPropmise.then(implementSettings);

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.src) {
		switch(request.src) {
			case "bHideCommentPlus":
				implementSettings({bHideCommentPlus: {val: request.val}});
				break;
			case "bHideCommentResult":
				implementSettings({bHideCommentResult: {val: request.val}});
				break;
		}
	}
});


function setGlobalCss(sStyle) {
	var aStyles = document.querySelectorAll('head style[data-ext=IMF]');
	var oCustomStyle;
	if(aStyles[0]) {
		oCustomStyle = aStyles[0];		
		//var sCss = oCustomStyle.innerHTML;
		oCustomStyle.innerHTML = sStyle;
	} else {
		var sNewCss = document.createElement("style");
		sNewCss.setAttribute("data-ext", "IMF");
		sNewCss.appendChild(document.createTextNode(sStyle));
		document.head.appendChild(sNewCss);
	}
}

//alert(2);
