var oLocalSettings = {
	bHideCommentPlus: {
		val: true,
		css: ".comment-wrapper .vote-up{display: none !important;}"
	},
	
	bHideCommentResult: {
		val: true,
		css: ".comment-wrapper .vote-count{display: none !important;}"
	}	,
	
	bHideCommentSidebar: {
		val: false,
		css: ".sideTransition{transition: all 0.5s;} #content.sideHidden{margin-right: 0}"
	}	
};
	
	
function implementSettings(oSettings){
	var aStyle = [];

	for(var key in oSettings) {
		oLocalSettings[key].val = oSettings[key].val || false;
	}
	for(var key in oLocalSettings) {
		if(oLocalSettings[key].val && oLocalSettings[key].css) {
			aStyle.push(oLocalSettings[key].css);
		}
	}
	/**/
	setGlobalCss(aStyle.join(" "));
	
	if(oLocalSettings.bHideCommentSidebar.val) {
		startStalkScroll();
	}
}	
implementSettings();
var oSettingsPropmise = new Promise (function(resolve, reject){
	chrome.storage.sync.get([
		'bHideCommentPlus', 
		'bHideCommentResult', 
		'bHideCommentSidebar'
	], function(result) {
		console.log('settings: ');
		console.dir(result);
		oLocalSettings.bHideCommentPlus.val = result.bHideCommentPlus || false;
		oLocalSettings.bHideCommentResult.val = result.bHideCommentResult || false;
		oLocalSettings.bHideCommentSidebar.val = result.bHideCommentSidebar || false;
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
			case "bHideCommentSidebar":
				implementSettings({bHideCommentSidebar: {val: request.val}});
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


var isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top <= window.innerHeight-200
    );
};

function startStalkScroll() {
	var oComments = document.getElementById("comments");
	var oSidebar = document.getElementById("sidebar");
	var oContent = document.getElementById("content");
	oContent.classList.add("sideTransition");
	window.onscroll = function() {
		if(isInViewport(oComments)) {
			oSidebar.style.display = "none";
			//oContent.style.marginRight = "0";
			oContent.classList.add("sideHidden");
		} else {
			oSidebar.style.display = "block";	
			//oContent.style.marginRight = "";	
			oContent.classList.remove("sideHidden");	
		}
	}
}

//alert(2);
